import { inject, Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Task } from "../Models/Task";
import {
  Subject,
  catchError,
  map,
  throwError,
  take,
  exhaustMap,
  Observable,
} from "rxjs";
import { LoggingService } from "./Loggin.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  http: HttpClient = inject(HttpClient);
  taskUpdated = new Subject<void>();
  errorSubject = new Subject<HttpErrorResponse>();
  logginService: LoggingService = inject(LoggingService);
  authService: AuthService = inject(AuthService);

  GetAllTasks() {
    return this.http
      .get("https://angular-crud-28c6e-default-rtdb.firebaseio.com/tasks.json")
      .pipe(
        map((response) => {
          const tasks: Task[] = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              tasks.push({ ...response[key], id: key });
            }
          }
          return tasks; 
        }),
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errroMessage: err.message,
            datatime: new Date(),
          };
          this.logginService.logError(errorObj);
          this.errorSubject.next(err);
          return throwError(() => err);
        })
      );
  }

  CreateTask(task: Task) {
    
    this.http
      .post<{ name: string }>(
        "https://angular-crud-28c6e-default-rtdb.firebaseio.com/tasks.json",
        task
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errroMessage: err.message,
            datatime: new Date(),
          };
          this.logginService.logError(errorObj);
          return throwError(() => {
            err;
          });
        })
      )
      .subscribe({
        next: () => {
          this.taskUpdated.next();
        },
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  UpdateTask(id: string | undefined, data: Task) {
    this.http
      .put(
        "https://angular-crud-28c6e-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json",
        data
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errroMessage: err.message,
            datatime: new Date(),
          };
          this.logginService.logError(errorObj);
          return throwError(() => {
            err;
          });
        })
      )
      .subscribe({
        next: () => {
          this.taskUpdated.next();
        },
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }
  DeleteTask(id: string | undefined) {
    let headers = new HttpHeaders();
    headers = headers.set("content-type", "application/json");
    this.http
      .delete(
        "https://angular-crud-28c6e-default-rtdb.firebaseio.com/tasks/" +
          id +
          ".json",
        { headers: headers }
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errroMessage: err.message,
            datatime: new Date(),
          };
          this.logginService.logError(errorObj);
          return throwError(() => {
            err;
          });
        })
      )
      .subscribe({
        next: () => {
          this.taskUpdated.next();
        },
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteAllTasks() {
    this.http
      .delete(
        "https://angular-crud-28c6e-default-rtdb.firebaseio.com/tasks.json"
      )
      .pipe(
        catchError((err) => {
          const errorObj = {
            statusCode: err.status,
            errroMessage: err.message,
            datatime: new Date(),
          };
          this.logginService.logError(errorObj);
          return throwError(() => {
            err;
          });
        })
      )
      .subscribe({
        next: () => {
          this.taskUpdated.next();
        },
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }
}
