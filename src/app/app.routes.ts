import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskAddComponent } from './components/task-add/task-add.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskInfoComponent } from './components/task-info/task-info.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskAddComponent },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: TaskInfoComponent },
      { path: 'edit', component: TaskEditComponent }
    ]
  },
  { path: '**', redirectTo: '/tasks' }
];