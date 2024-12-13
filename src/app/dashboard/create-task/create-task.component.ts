import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Task } from "src/app/Models/Task";


@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"],
  standalone: false,
})
export class CreateTaskComponent implements AfterViewInit {

  @Input() isEditMode: boolean = false;
  @Input() selectedTask: Task;

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild("taskForm") taskForm: NgForm;

  @Output()
  EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();

  ngAfterViewInit() {
    setTimeout(() => {
      this.taskForm.form.patchValue(this.selectedTask);
    }, 0);
  }

  OnCloseForm() {
    this.CloseForm.emit(false);
  }
  OnFormSubmitted(form: NgForm) {
    console.log(form.value);
    this.EmitTaskData.emit(form.value);
    this.CloseForm.emit(false);
  }
}
