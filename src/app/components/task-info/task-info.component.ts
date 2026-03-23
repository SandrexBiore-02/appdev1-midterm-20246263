import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [RouterLink, NgIf, NgClass],
  template: `
    <div *ngIf="task">
      <table class="table table-bordered">
        <tbody>
          <tr>
            <th class="table-secondary" style="width:160px">Title</th>
            <td>{{ task.title }}</td>
          </tr>
          <tr>
            <th class="table-secondary">Description</th>
            <td>{{ task.description }}</td>
          </tr>
          <tr>
            <th class="table-secondary">Due Date</th>
            <td>{{ task.dueDate }}</td>
          </tr>
          <tr>
            <th class="table-secondary">Priority</th>
            <td>
              <span class="badge" [ngClass]="getPriorityClass(task.priority)">
                {{ task.priority }}
              </span>
            </td>
          </tr>
          <tr>
            <th class="table-secondary">Status</th>
            <td>
              <span class="badge" [ngClass]="getStatusClass(task.status)">
                {{ task.status }}
              </span>
            </td>
          </tr>
          <tr>
            <th class="table-secondary">Created</th>
            <td>{{ task.createdAt }}</td>
          </tr>
        </tbody>
      </table>
      <a [routerLink]="['/tasks', task.id, 'edit']" class="btn btn-primary btn-sm">
        Edit This Task
      </a>
    </div>
  `
})
export class TaskInfoComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.parent!.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
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