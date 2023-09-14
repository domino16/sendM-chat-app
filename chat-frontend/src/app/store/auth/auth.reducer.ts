import { User } from "src/app/core/interfaces/user";
import { createReducer, on } from "@ngrx/store";
import { loginFailure, loginSuccess} from "./auth.actions";

export interface authState {
  user: User | null;
  errorMessage: string | null;
}

export const initialAuthState: authState = {
  user: null,
  errorMessage: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, action) => ( { ...state, user: action.authUser})),
  on(loginFailure, (state, action) => ({ ...state, errorMessage: action.error })),
);
