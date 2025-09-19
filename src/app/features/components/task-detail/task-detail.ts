import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TaskData } from '@app/shared/interfaces/task-interface';

@Component({
  selector: 'app-task-detail',
  imports: [],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetail implements OnInit {
  readonly task = signal<TaskData | null>(null);
  projectId = 'MnUTvclhDFbntBHR8Hba';

  private data = inject<{ taskId: string }>(MAT_DIALOG_DATA);
  private tasksFirebaseService = inject(FirebaseServiceTs);

  ngOnInit(): void {
    console.log('Task ID:', this.data.taskId);
    console.log('data', this.data);
    this.tasksFirebaseService
      .getTask(this.projectId, this.data.taskId)
      .subscribe((task) => {
        this.task.set(task);
      });
  }

  closeTask(): void {
    console.log('Close task');
  }
}
