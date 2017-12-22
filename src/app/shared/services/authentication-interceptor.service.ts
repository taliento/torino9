import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let request: HttpRequest<any>;
    const router = this.injector.get(Router);

    if(localStorage && localStorage.getItem('AuthData')) {
      const auth = JSON.parse(localStorage.getItem('AuthData'));

      if(!auth || !auth.token) return next.handle(req);

      request = req.clone({setHeaders:{Authorization: `Bearer ${auth.token}`}});

    } else {
      request = req.clone();
    }

    return next.handle(request).catch((error: HttpErrorResponse) => {
      if(error.status == 401) {
        localStorage.clear();

        router.navigate(['/login']);// FIXME
      }

      return Observable.throw(error);
    });
  }


}
