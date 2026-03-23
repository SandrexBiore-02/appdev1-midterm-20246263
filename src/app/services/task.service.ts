import { Injectable } from '@angular/core';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Finish Homework',
      description: 'Complete the math homework before due date.',
      dueDate: '2026-03-25',
      status: 'Pending',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Clean the House',
      description: 'Vacuum and dust the living room and kitchen.',
      dueDate: '2026-03-30',
      status: 'In Progress',
      priority: 'Medium'
    },
    {
      id: 3,
      title: 'Buy Groceries',
      description: 'Buy vegetables and fruits for the week.',
      dueDate: '2026-03-26',
      status: 'Completed',
      priority: 'Low'
    }
  ];

  constructor() { }

  // Method to get all tasks
  getTasks(): Task[] {
    return this.tasks;
  }

  // Method to get a single task by ID
  getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  // Method to add a new task
  addTask(newTask: Task): void {
    this.tasks.push(newTask);
  }

  // Method to update an existing task
  updateTask(updatedTask: Task): void {
    const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;
    }
  }

  // Method to delete a task
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  // Method to toggle the status of a task (e.g., 'Pending' to 'Completed')
  toggleStatus(id: number): void {
    const task = this.getTaskById(id);
    if (task) {
      task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
    }
  }
}