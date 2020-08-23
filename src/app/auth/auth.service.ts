import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Observable, Subject, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface SignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private autoLogoutTime: any;
  user = new BehaviorSubject<User>(null);
  private getBaseUrl(isLogin: boolean) {
    return !isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.fireBaseApiKey}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fireBaseApiKey}`;
  }
  constructor(private http: HttpClient, private router: Router) {}

  signUp(loginCredentials: { email: string; password: string }) {
    return this.http
      .post<SignUpResponse>(this.getBaseUrl(false), {
        ...loginCredentials,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(loginCredentials: { email: string; password: string }) {
    return this.http
      .post<SignUpResponse>(this.getBaseUrl(true), {
        ...loginCredentials,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expireDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const newUser = new User(email, localId, idToken, expireDate);
    this.user.next(newUser);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(newUser));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDate =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDate);
    }
  }

  autoLogout(expirationTime: any) {
    this.autoLogoutTime = setTimeout(() => {
      this.logout();
    }, expirationTime);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An Unknown Error Occured";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    //case to be changed
    switch (errorRes.error.error.message) {
      case "EMAIL_NOT_FOUND":
        errorMessage = "User with this email does not exist";
        break;
      case "EMAIL_EXISTS":
        errorMessage =
          "The email address is already in use by another account.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password is invalid";
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["auth"]);
    localStorage.clear();
    if (this.autoLogoutTime) {
      clearInterval(this.autoLogoutTime);
    }
    this.autoLogoutTime = null;
  }
}
