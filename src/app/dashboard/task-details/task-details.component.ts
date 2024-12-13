import { Component, EventEmitter, inject, Input, Output } from "@angular/core";

import { Task } from "src/app/Models/Task";

@Component({
  selector: "app-task-details",
  templateUrl: "./task-details.component.html",
  styleUrls: ["./task-details.component.css"],
  standalone: false,
})
export class TaskDetailsComponent {
  
  @Input() task: Task;
  @Output()
  CloseDetailView: EventEmitter<boolean> = new EventEmitter<boolean>();

  OnCloseTaskDetail() {
    this.CloseDetailView.emit(false);
  }
}
