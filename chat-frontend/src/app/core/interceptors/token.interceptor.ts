import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
    
    const accessToken = localStorage.getItem('accessToken')
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return next.handle(request);
  }
}


export const jwtInterceptorProvider = { provide: HTTP_INTERCEPTORS,  useClass:TokenInterceptor,  multi: true};