import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, NgClass],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">All Tasks</h2>
      <a routerLink="/tasks/new" class="btn btn-primary">+ Add Task</a>
    </div>

    <div *ngIf="tasks.length === 0" class="alert alert-info">
      No tasks yet. Click "+ Add Task" to create your first one!
    </div>

    <div class="table-responsive" *ngIf="tasks.length > 0">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let task of tasks">
            <td>
              <a [routerLink]="['/tasks', task.id]" class="fw-semibold text-decoration-none">
                {{ task.title }}
              </a>
            </td>
            <td>{{ task.dueDate }}</td>
            <td>
              <span class="badge" [ngClass]="getPriorityClass(task.priority)">
                {{ task.priority }}
              </span>
            </td>
            <td>
              <span class="badge" [ngClass]="getStatusClass(task.status)">
                {{ task.status }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-outline-secondary me-1"
                      (click)="toggleStatus(task.id)" title="Cycle Status">&#8635;</button>
              <a [routerLink]="['/tasks', task.id, 'edit']"
                 class="btn btn-sm btn-outline-primary me-1">Edit</a>
              <button class="btn btn-sm btn-outline-danger"
                      (click)="deleteTask(task.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getAllTasks();
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.loadTasks();
    }
  }

  toggleStatus(id: number): void {
    this.taskService.toggleStatus(id);
    this.loadTasks();
  }

  getPriorityClass(priority: string): string {
    const map: Record<string, string> = {
      'High': 'bg-danger',
      'Medium': 'bg-warning text-dark',
      'Low': 'bg-success'
    };
    return map[priority] ?? 'bg-secondary';
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'Pending': 'bg-secondary',
      'In Progress': 'bg-info text-dark',
      'Completed': 'bg-success'
    };
    return map[status] ?? 'bg-secondary';
  }
}