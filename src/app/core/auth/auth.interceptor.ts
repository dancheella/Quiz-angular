import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {RefreshResponseType} from "../../../types/refresh-response.type";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokens = this.authService.getTokens();
    if (tokens.accessToken) {
      const authReq = req.clone({
        headers: req.headers.set('x-access-token', tokens.accessToken);
      })
      return next.handle(authReq)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401 && !authReq.url.includes('/login') && !authReq.url.includes('/refresh')) {
              return this.handle401Error(authReq, next);
            }
            return throwError(() => err)
          })
        )
    }
    return next.handle(req);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refresh()
      .pipe(
        switchMap((result: RefreshResponseType) => {
          if (result && !result.error && result.accessToken && result.refreshToken) {
            this.authService.setTokens(result.accessToken, result.refreshToken);

            const authReq = req.clone({
              headers: req.headers.set('x-access-token', result.accessToken)
            });
            return next.handle(authReq)
          } else {
            return throwError(() => new Error('Repeat request error'));
          }
        }),
        catchError(err => {
          this.authService.removeTokens();
          this.authService.removeUserInfo();
          this.router.navigate(['/'])
          return throwError(() => err);
        })
      )
  }
}
