import { Component } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  standalone: false,
})
export class DashboardComponent {}

// is used to check if a specific property (key) exists directly on the response object and not on its prototype chain. ----- if (response.hasOwnProperty(key)) {} -----

// pipe(map(()=>{})) - is used to trasform the data
