import { Component, inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../Services/auth.service";
import { Observable } from "rxjs";
import { AuthResponse } from "../Models/AuthResponse";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  isLoginMode: boolean = true;
  authservice: AuthService = inject(AuthService);
  isLoading: boolean = false;
  authObs: Observable<AuthResponse>;
  route: Router = inject(Router);
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  errorMessage: string | null = null;

  onFormSubmitted(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      this.isLoading = true;
      this.authObs = this.authservice.login(email, password);
    } else {
      this.isLoading = true;
      this.authObs = this.authservice.signUp(email, password);
    }

    this.authObs.subscribe({
      next: (res) => {
        // console.log(res);
        this.isLoading = false;
        this.route.navigate(["/dashboard/overview"]);
      },
      error: (errMsg) => {
        this.isLoading = false;
        this.errorMessage = errMsg;
        this.hideSnackBar();
      },
    });
    form.reset();
  }

  hideSnackBar() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
