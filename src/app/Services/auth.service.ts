import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthResponse } from "../Models/AuthResponse";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../Models/User";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  user = new BehaviorSubject<User | null>(null);
  router: Router = inject(Router);
  private tokenExpireTimer: any;
  signUp(email: string, password: string) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJFD1Bx5r-xxbxXvU_67Gulpi7MGU04Zo",
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => this.handelCreateUser(res))
      );
  }

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    return this.http
      .post<AuthResponse>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJFD1Bx5r-xxbxXvU_67Gulpi7MGU04Zo",
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => {
          this.handelCreateUser(res);
        })
      );
  }

  autoLoggin() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) {
      return;
    }
    const loggedUser = new User(
      user.email,
      user.id,
      user._token,
      user._expiresIn
    );
    if (loggedUser.token) {
      this.user.next(loggedUser);
      const timerValue = user._expiresIn - new Date().getTime();
      this.autoLogout(timerValue);
    }
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(["/login"]);
    localStorage.removeItem("user");
    if (this.tokenExpireTimer) {
      clearTimeout(this.tokenExpireTimer);
    }
    this.tokenExpireTimer = null;
  }

  autoLogout(expireTime: number) {
    this.tokenExpireTimer = setTimeout(() => {
      this.logOut();
    }, expireTime);
  }

  private handelCreateUser(res) {
    // console.log(res.expiresIn);
    // console.log(new Date().getTime());
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000;
    // console.log(expiresInTs);
    const expiresIn = new Date(expiresInTs);
    // console.log(expiresIn);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.autoLogout(res.expiresIn * 1000);
    localStorage.setItem("user", JSON.stringify(user));
    this.user.next(user);
  }

  private handleError(err) {
    console.log(err);
    let errorMessage = "An unknow error as occured";
    if (!err.error || !err.error.error) {
      return throwError(() => errorMessage);
    }
    switch (err.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "Email already exists, please sign in";
        break;
      case "OPERATION_NOT_ALLOWED":
        errorMessage = "This operation is not allowed.";
        break;
      case "INVALID_LOGIN_CREDENTIALS":
        errorMessage = "Email ID or Password is not correct";
        break;
    }
    return throwError(() => errorMessage);
  }
}