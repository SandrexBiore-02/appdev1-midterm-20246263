import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  template: `
    <div *ngIf="task">
      <div *ngIf="showSuccess" class="alert alert-success">
        Task updated successfully! Redirecting...
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
                 [(ngModel)]="task.title" name="title">
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">
            Description <span class="text-danger">*</span>
          </label>
          <textarea class="form-control"
                    [(ngModel)]="task.description" name="description"
                    rows="3"></textarea>
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
          <button type="submit" class="btn btn-success">Save Changes</button>
          <a [routerLink]="['/tasks', task.id, 'info']"
             class="btn btn-outline-secondary">Cancel</a>
        </div>
      </form>
    </div>

    <div *ngIf="!task" class="alert alert-danger">Task not found.</div>
  `
})
export class TaskEditComponent implements OnInit {
  task: Task | undefined;
  showSuccess = false;
  showError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.parent!.snapshot.paramMap.get('id'));
    const found = this.taskService.getTaskById(id);
    if (found) this.task = { ...found };
  }

  onSubmit(): void {
    if (!this.task) return;
    if (!this.task.title.trim() || !this.task.description.trim() || !this.task.dueDate) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.taskService.updateTask(this.task.id, this.task);
    this.showSuccess = true;
    setTimeout(() => this.router.navigate(['/tasks', this.task!.id, 'info']), 1200);
  }
}