import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Project } from '@app/shared/interfaces/project-interface';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private firebaseServiceTs = inject(FirebaseServiceTs);

  readonly currentProject: WritableSignal<Project> = signal<Project>({
    id: '',
    title: '',
    owner: '',
    createdAt: '',
  });

  addTasksCollection(projectId: string): void {
    const date = new Date();
    const todoToCreate = '[EXAMPLE TASK] Learn Routing';

    this.firebaseServiceTs
      .addTask(todoToCreate, projectId, date)
      .subscribe((result) => console.log('Added default first task.', result));
  }
}
