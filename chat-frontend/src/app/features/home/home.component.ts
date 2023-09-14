import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AuthService } from "src/app/core/services/auth.service";
import { lineStretchAniamtion } from "src/app/shared/animation";
import { loginFailure, loginStart} from "src/app/store/auth/auth.actions";
import { errorMessage } from "src/app/store/auth/auth.selectors";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    lineStretchAniamtion
   ],
})
export class HomeComponent implements OnInit, OnDestroy {

  errorMessage = this.store.select(errorMessage)
  
  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin()
  }

  loginForm: FormGroup = new FormGroup({
    emailFormControl: new FormControl("test@test.com", [Validators.required, Validators.email]),
    passwordFormControl: new FormControl("test123", [Validators.required]),
  });



  logInClick() {
    const email: string = this.loginForm.controls["emailFormControl"].value;
    const password: string = this.loginForm.controls["passwordFormControl"].value;
    this.store.dispatch(loginStart({email, password}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(loginFailure({error:""}))
  }

}
