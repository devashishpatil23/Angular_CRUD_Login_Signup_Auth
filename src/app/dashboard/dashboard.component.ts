import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Task } from "../Models/Task";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { TaskService } from "../Services/task.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  standalone: false,
})
export class DashboardComponent implements OnInit, OnDestroy {
  showCreateTaskForm: boolean = false;
  http: HttpClient = inject(HttpClient);
  allTasks: Task[] = [];
  taskService: TaskService = inject(TaskService);
  selectedTask: Task;
  currentTaskId: string;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  updatedTasksSub: Subscription;
  errorSub: Subscription;
  showTaskDetails: boolean = false;
  taskToShow: Task;
  editMode: boolean = false;



  ngOnInit() {
    this.fetechAllTask();
    this.updatedTasksSub = this.taskService.taskUpdated.subscribe(() => {
      this.fetechAllTask();
    });
    this.errorSub = this.taskService.errorSubject.subscribe({
      next: (httpError) => {
        this.setErrorMessage(httpError);
      },
    });
  }

  // good practice
  ngOnDestroy() {
    this.updatedTasksSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode = false;
    this.selectedTask = {
      title: "",
      description: "",
      assignedTo: "",
      createdAt: "",
      priority: "",
      status: "",
    };
  }
  OnEditTaskClicked(id: string | undefined) {
    this.currentTaskId = id;
    this.showCreateTaskForm = true;
    this.editMode = true;
    this.selectedTask = this.allTasks.find((task) => {
      return task.id == id;
    });
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }
  ShowCurrentTaskDetails(id: string | undefined) {
    this.showTaskDetails = true;
    const taskDetail = this.allTasks.find((task) => task.id == id);
    this.taskToShow = taskDetail;
  }
  CloseTaskDetails() {
    this.showTaskDetails = false;
  }

  CreateOrUpdateTask(data: Task) {
    if (this.editMode) {
      this.taskService.UpdateTask(this.currentTaskId, data);
    } else {
      this.taskService.CreateTask(data);
    }
  }
  private fetechAllTask() {
    this.isLoading = true;
    this.taskService.GetAllTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.setErrorMessage(error);
        this.isLoading = false;
      },
    });
  }
  private setErrorMessage(err: HttpErrorResponse) {
    if (err.error.error == "Permission denied") {
      this.errorMessage = "You do not have permission";
    } else {
      this.errorMessage = err.error.error;
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
  DeleteTask(id: string | undefined) {
    this.taskService.DeleteTask(id);
  }
  DeleteAllTask() {
    this.taskService.DeleteAllTasks();
  }
}

// is used to check if a specific property (key) exists directly on the response object and not on its prototype chain. ----- if (response.hasOwnProperty(key)) {} -----

// pipe(map(()=>{})) - is used to trasform the data
