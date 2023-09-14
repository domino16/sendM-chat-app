import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { User } from "../interfaces/user";
import { Observable } from "rxjs";
import { loginSuccess } from "src/app/store/auth/auth.actions";
import { Store } from "@ngrx/store";
import jwtDecode from "jwt-decode";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isBrowser?: boolean;
  authUrl: string = environment.apiUrlAuth;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getAuth(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.authUrl}/auth/login`, {
      email,
      password,
    });
  }

  signUp(newUser: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.authUrl}/auth/signup`, newUser);
  }

  handleAuth(accessToken: string): void {
    if (this.isBrowser) {
      localStorage.setItem("accessToken", accessToken);
    }
    const authUser: User = jwtDecode(accessToken);
    const timestamp: number = new Date().getTime();
    const tokenExpirationTimestamp = (authUser.exp as number) * 1000;

    if (timestamp > tokenExpirationTimestamp) {
      this.logout();
      return;
    }
    this.store.dispatch(loginSuccess({ authUser }));
    this.autoLogout(tokenExpirationTimestamp - timestamp);
  }

  autoLogin() {
    if (this.isBrowser){
      const accessToken = localStorage.getItem("accessToken") as string;
    if (!accessToken) {
      return;
    }
    this.handleAuth(accessToken);
    }
  }

  logout() {
    if (this.isBrowser){
      localStorage.removeItem("accessToken");
    }
    this.router.navigate(["/"]);
  }

  autoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
