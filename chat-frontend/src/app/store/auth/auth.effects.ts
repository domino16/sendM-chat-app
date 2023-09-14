import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap,  } from "rxjs";
import { loginFailure, loginStart, loginSuccess, signupStart } from "./auth.actions";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { loadChats, loadMessages } from "../chat/chat.actions";
import { RxStompService } from "src/app/core/services/rx-stomp.service";




@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.getAuth(action.email, action.password).pipe(
          map((accessToken) => {
              this.authService.handleAuth(accessToken.token)}),
          catchError((error) => {
            return of(this.store.dispatch(loginFailure({error:error.error})))
            }),
        );
      }),
    );
  },{dispatch:false});

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.signUp(action.newUser).pipe(
          map((accessToken) => this.authService.handleAuth(accessToken.token)),
          catchError((error) => {
            return of(this.store.dispatch(loginFailure({error:error.error})))
          }),
        );
      }),
    );
  },{dispatch:false});

  loginSucess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      switchMap((action)=>{
        this.router.navigate(["/chat"]);
        this.store.dispatch(loadChats());
        return this.rxStompService.watch(`/user/${action.authUser.email}/queue/messages`)
        .pipe(map(()=> {
          this.store.dispatch(loadChats())
          return loadMessages()
        }))
      })
    )
  })

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store,
    private rxStompService: RxStompService
  ) {}
}
