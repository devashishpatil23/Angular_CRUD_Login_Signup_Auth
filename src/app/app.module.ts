import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouteModule } from "./route.module";
import { HomeComponent } from "./home/home.component";
import { AuthInterceptorService } from "./Services/auth-interceptors";

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [BrowserModule, HttpClientModule, RouteModule],
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
