import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TasksService } from '@app/services/tasks-service/tasks-service';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-header',
  imports: [TranslateModule, MatIconModule],
  templateUrl: './task-header.html',
  styleUrl: './task-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHeader {
  text = '';
  projectId = 'MnUTvclhDFbntBHR8Hba';
  status: 'todo' | 'inProgress' | 'done' = 'todo';
  //date = new Date();

  tasksService = inject(TasksService);
  tasksFirebaseService = inject(FirebaseServiceTs);

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTask(): void {
    const date = new Date();
    this.tasksFirebaseService
      .addTask(this.text, this.projectId, date)
      .subscribe((taskId) => {
        this.tasksService.addTask(this.text, taskId, date);
      });
    this.text = '';
  }
}
