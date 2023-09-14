import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Validation } from "./repeat-password-validation";
import { User } from "../../interfaces/user";
import { Store } from "@ngrx/store";
import { loginFailure, signupStart } from "src/app/store/auth/auth.actions";
import { errorMessage } from "src/app/store/auth/auth.selectors";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnDestroy{
  errorMessage = this.store.select(errorMessage);

  constructor(private store: Store) {}

  signupForm: FormGroup = new FormGroup(
    {
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      repassword: new FormControl("", [Validators.required]),
    },
    Validation.match("password", "repassword"),
  );

  logInClick() {
    const email: string = this.signupForm.controls["email"].value;
    const password: string = this.signupForm.controls["password"].value;
    const firstName: string = this.signupForm.controls["firstName"].value;
    const lastName: string = this.signupForm.controls["lastName"].value;

    const payload: User = {
      email,
      password,
      firstName,
      lastName,

    };

    this.store.dispatch(signupStart({ newUser: payload }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(loginFailure({error:""}))
  }
}
