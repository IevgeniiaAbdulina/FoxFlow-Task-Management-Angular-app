import { inject, Injectable } from '@angular/core';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseServiceTs } from '../firebase/firebase-service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<TaskData[]>([]);

  tasksFirebaseService = inject(FirebaseServiceTs);

  getTasksFromFirebase(projectId: string): Observable<TaskData[]> {
    return this.tasksFirebaseService.getProjectTasks(projectId);
  }

  addTask(title: string, id: string, date: Date): void {
    const newTask: TaskData = {
      title: title,
      id: id,
      createdAt: date,
      status: 'todo',
    };

    const updatedTask = [...this.tasks$.getValue(), newTask];
    this.tasks$.next(updatedTask);
  }

  changeTask(id: string, text: string): void {
    const updatedTask = this.tasks$.getValue().map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: text,
        };
      }
      return task;
    });
    this.tasks$.next(updatedTask);
  }

  deleteTask(id: string): void {
    const updatedTask = this.tasks$.getValue().filter((task) => task.id !== id);
    this.tasks$.next(updatedTask);
  }
}
