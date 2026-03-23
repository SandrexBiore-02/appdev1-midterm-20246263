import { Injectable } from '@angular/core';
import { Task } from '../task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasks: Task[] = [
    {
      id: 1,
      title: 'Design UI Mockups',
      description: 'Create wireframes for TaskFlow using Figma.',
      dueDate: '2025-02-10',
      status: 'Completed',
      priority: 'High',
      createdAt: '2025-01-20'
    },
    {
      id: 2,
      title: 'Set Up Angular Project',
      description: 'Initialize the Angular project with routing and standalone components.',
      dueDate: '2025-02-15',
      status: 'In Progress',
      priority: 'High',
      createdAt: '2025-01-22'
    },
    {
      id: 3,
      title: 'Write Unit Tests',
      description: 'Write unit tests for all service methods using Jasmine and Karma.',
      dueDate: '2025-03-01',
      status: 'Pending',
      priority: 'Medium',
      createdAt: '2025-01-25'
    },
    {
      id: 4,
      title: 'Deploy to Netlify',
      description: 'Build the production bundle and deploy to Netlify.',
      dueDate: '2025-03-10',
      status: 'Pending',
      priority: 'Low',
      createdAt: '2025-01-28'
    }
  ];

  private nextId = 5;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): Task {
    const newTask: Task = {
      ...task,
      id: this.nextId++,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, updated: Partial<Task>): Task | undefined {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updated };
      return this.tasks[index];
    }
    return undefined;
  }

  deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

  toggleStatus(id: number): Task | undefined {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return undefined;
    const cycle: Record<Task['status'], Task['status']> = {
      'Pending': 'In Progress',
      'In Progress': 'Completed',
      'Completed': 'Pending'
    };
    task.status = cycle[task.status];
    return task;
  }
}