import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoggingService {
  http: HttpClient = inject(HttpClient);
  logError(data: { statusCode: number; errroMessage: string; datatime: Date }) {
    this.http
      .post(
        "https://angular-crud-28c6e-default-rtdb.firebaseio.com/log.json",
        data
      )
      .subscribe();
  }
  fetchError() {
    this.http
      .get("https://angular-crud-28c6e-default-rtdb.firebaseio.com/log.json")
      .subscribe((data) => {
        console.log(data);
      });
  }
}
