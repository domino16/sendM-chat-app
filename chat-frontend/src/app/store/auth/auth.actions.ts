import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/interfaces/user";

export const loginStart = createAction("[AUTH PAGE] Login start", props<{ email: string; password: string }>());

export const loginFailure = createAction("[AUTH PAGE] set/reset login error message", props<{ error: string }>());

export const loginSuccess = createAction("[AUTH PAGE] Login success", props<{ authUser: User }>());

export const signupStart = createAction("[AUTH PAGE] Sign up start", props<{ newUser: User }>());



