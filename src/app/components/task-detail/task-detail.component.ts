import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgClass],
  template: `
    <div *ngIf="task; else notFound">
      <div class="card shadow-sm">
        <div class="card-header d-flex justify-content-between align-items-center bg-dark text-white">
          <h4 class="mb-0">{{ task.title }}</h4>
          <span class="badge fs-6" [ngClass]="getStatusClass(task.status)">
            {{ task.status }}
          </span>
        </div>
        <div class="card-body">
          <ul class="nav nav-tabs mb-4">
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['info']"
                 routerLinkActive="active">Info</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [routerLink]="['edit']"
                 routerLinkActive="active">Edit</a>
            </li>
          </ul>
          <router-outlet></router-outlet>
        </div>
        <div class="card-footer">
          <a routerLink="/tasks" class="btn btn-outline-secondary btn-sm">
            &#8592; Back to Tasks
          </a>
        </div>
      </div>
    </div>

    <ng-template #notFound>
      <div class="alert alert-danger">
        Task not found. <a routerLink="/tasks">Return to list</a>
      </div>
    </ng-template>
  `
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTaskById(id);
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