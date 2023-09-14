import { Component, EventEmitter, OnDestroy, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { NgxImageCompressService } from "ngx-image-compress";
import { switchMap } from "rxjs";
import { User } from "src/app/core/interfaces/user";
import { AuthService } from "src/app/core/services/auth.service";
import { FileUploadService } from "src/app/core/services/file-upload.service";
import { UserService } from "src/app/core/services/user.service";
import { authUser } from "src/app/store/auth/auth.selectors";

export interface editRequest {
  currentUserId: string;
  file?: File;
  firstName?: string;
  lastName?: string;
  oldPassword?: string;
  newPassword?: string;
}

@Component({
  selector: "app-profile-popup",
  templateUrl: "./profile-popup.component.html",
  styleUrls: ["./profile-popup.component.scss"],
})
export class ProfilePopupComponent implements OnDestroy {
  @Output() popupClose = new EventEmitter();
  authUser$ = this.store.select(authUser);
  authUser?: User;
  authUserSubscription = this.authUser$.subscribe((authUser) => {
    if (authUser) this.authUser = authUser;
  });
  fileResultAfterCompression?: File;
  imgResultAfterCompression = "";
  progress = 0;
  errorMessage = "";
  isEditMode = false;
  isChanged = false;

  editForm: FormGroup = new FormGroup({
    firstName: new FormControl(this.authUser?.firstName, [Validators.required]),
    lastName: new FormControl(this.authUser?.lastName, [Validators.required]),
    oldPassword: new FormControl(""),
    newPassword: new FormControl(""),
  });

  constructor(
    private uploadService: FileUploadService,
    private userService: UserService,
    private authService: AuthService,
    private store: Store,
    private imageCompress: NgxImageCompressService,
  ) {}

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
  }

  editProfile() {
    const firstName = this.editForm.controls["firstName"].value;
    const lastName = this.editForm.controls["lastName"].value;
    const oldPassword = this.editForm.controls["oldPassword"].value;
    const newPassword = this.editForm.controls["newPassword"].value;

    const currentUserId = this.authUser?.email as string;
    const request: editRequest = {
      currentUserId,
      firstName,
      lastName,
      oldPassword,
      newPassword,
    };

    if (this.fileResultAfterCompression) {
      this.uploadService
        .upload(this.fileResultAfterCompression, currentUserId)
        ?.pipe(switchMap(() => this.userService.editProfile(request)))
        .subscribe((token) => {
          this.authService.handleAuth(token.token), this.closeEditMode();
        });
      return;
    }

    this.userService.editProfile(request).subscribe({
      next: (token) => {
        this.authService.handleAuth(token.token), this.closeEditMode();
      },
      error: (err) => (this.errorMessage = err.error.text),
    });
  }

  onClose() {
    this.popupClose.emit();
    this.imgResultAfterCompression = "";
  }

  closeEditMode() {
    this.errorMessage = "";
    this.isEditMode = !this.isEditMode;
    this.imgResultAfterCompression = "";
  }

  compressFile() {
    this.isChanged = true;
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imageCompress.compressFile(image, orientation, 50, 50, 200).then((compressedImage) => {
        this.imgResultAfterCompression = compressedImage;
        fetch(compressedImage)
          .then((res) => res.blob())
          .then((blob) => {
            this.fileResultAfterCompression = new File([blob], "File name", { type: "image/png" });
          });
      });
    });
  }
}
