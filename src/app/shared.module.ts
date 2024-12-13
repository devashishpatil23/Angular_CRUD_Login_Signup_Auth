import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoaderComponent } from "./utility/loader/loader.component";
import { SnackbarComponent } from "./utility/snackbar/snackbar.component";

@NgModule({
  declarations: [LoaderComponent, SnackbarComponent],
  imports: [FormsModule],
  exports: [LoaderComponent, FormsModule, SnackbarComponent],
})
export class SharedModule {}
