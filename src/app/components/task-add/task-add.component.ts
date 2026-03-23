import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Add New Task</h4>
          </div>
          <div class="card-body">

            <div *ngIf="showSuccess" class="alert alert-success">
              Task added successfully! Redirecting...
            </div>
            <div *ngIf="showError" class="alert alert-danger">
              Please fill in all required fields.
            </div>

            <form (ngSubmit)="onSubmit()">
              <div class="mb-3">
                <label class="form-label fw-semibold">
                  Title <span class="text-danger">*</span>
                </label>
                <input type="text" class="form-control"
                       [(ngModel)]="task.title" name="title"
                       placeholder="Enter task title">
              </div>

              <div class="mb-3">
                <label class="form-label fw-semibold">
                  Description <span class="text-danger">*</span>
                </label>
                <textarea class="form-control"
                          [(ngModel)]="task.description" name="description"
                          rows="3" placeholder="Describe the task"></textarea>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-semibold">
                    Due Date <span class="text-danger">*</span>
                  </label>
                  <input type="date" class="form-control"
                         [(ngModel)]="task.dueDate" name="dueDate">
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label fw-semibold">Priority</label>
                  <select class="form-select"
                          [(ngModel)]="task.priority" name="priority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label fw-semibold">Status</label>
                <select class="form-select"
                        [(ngModel)]="task.status" name="status">
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">Add Task</button>
                <a routerLink="/tasks" class="btn btn-outline-secondary">Cancel</a>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskAddComponent {
  task: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Medium'
  };

  showSuccess = false;
  showError = false;

  constructor(private taskService: TaskService, private router: Router) {}

  onSubmit(): void {
    if (!this.task.title.trim() || !this.task.description.trim() || !this.task.dueDate) {
      this.showError = true;
      this.showSuccess = false;
      return;
    }
    this.showError = false;
    this.taskService.addTask(this.task);
    this.showSuccess = true;
    setTimeout(() => this.router.navigate(['/tasks']), 1200);
  }
}