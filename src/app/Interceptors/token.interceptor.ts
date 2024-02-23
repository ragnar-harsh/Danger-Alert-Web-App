import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MyHttpServiceService } from '../Service-Repository/my-http-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authentication : MyHttpServiceService, private router: Router,
    private toastr : ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authentication.getToken();

    if(Boolean(token)){
      request = request.clone({
        setHeaders: {Authorization : `Bearer ${token}`}
      })
    }

    return next.handle(request)
    .pipe(
      catchError((err:any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.toastr.error("Login is Expired. Please Login Again!");
            this.authentication.signOut();
            this.router.navigate(['login']);
          }
        }
        return throwError(() => new Error("Some Error Occured!"))
      })
    );
  }
}
