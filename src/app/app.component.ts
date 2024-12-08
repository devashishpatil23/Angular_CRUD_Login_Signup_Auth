import { Component, inject, OnInit } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { AuthService } from "./Services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = "angular-http-client";
  authServive: AuthService = inject(AuthService);

  ngOnInit() {
    this.authServive.autoLoggin();
  }
}
