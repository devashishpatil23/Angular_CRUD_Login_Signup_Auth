import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../Services/auth.service";
import { User } from "../Models/User";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  standalone: false,
})
export class HeaderComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);
  isLoggedIn: boolean = false;
  private userSubject: Subscription;

  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      console.log(user);
      this.isLoggedIn = user ? true : false;
    });
  }
  ngOnDestroy() {
    this.userSubject.unsubscribe();
  }

  OnLogOut() {
    this.authService.logOut();
    
  }
}
