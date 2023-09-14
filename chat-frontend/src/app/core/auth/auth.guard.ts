import { Injectable } from '@angular/core';
import { Router,UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { isAuthenticated } from 'src/app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor( private router: Router, private store:Store){}

  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(isAuthenticated).pipe(
      map((isAuthenticated => isAuthenticated ? true : this.router.createUrlTree(["/"]))));
  
  }
  
}
