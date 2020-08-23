import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        //if user does ot exist i.e login or sign up method we dont need to add the token
        if (!user) {
          return next.handle(req);
        }
        //if user exist i.e fetching data and storing data on data base then we need to add auth token to validate request
        const newRequest = req.clone({
          params: new HttpParams().set("auth", user.token),
        });
        return next.handle(newRequest);
      })
    );
  }
}
