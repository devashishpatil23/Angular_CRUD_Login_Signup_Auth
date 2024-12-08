import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreateTaskComponent } from "./dashboard/create-task/create-task.component";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { TaskDetailsComponent } from "./dashboard/task-details/task-details.component";
import { LoginComponent } from "./login/login.component";
import { RouteModule } from "./route.module";
import { LoaderComponent } from "./utility/loader/loader.component";
import { SnackbarComponent } from "./utility/snackbar/snackbar.component";
import { HomeComponent } from "./home/home.component";
import { AuthInterceptorService } from "./Services/auth-interceptors";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    LoginComponent,
    LoaderComponent,
    SnackbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    HttpClientModule,
    RouteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true, 
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
