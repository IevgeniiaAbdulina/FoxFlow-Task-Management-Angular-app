import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TasksService } from '@app/services/tasks-service/tasks-service';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { TaskHeader } from '../task-header/task-header';
import { TaskMain } from '../task-main/task-main';

@Component({
  selector: 'app-task-body',
  imports: [TaskHeader, TaskMain],
  templateUrl: './task-body.html',
  styleUrl: './task-body.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskBody implements OnInit {
  tasksService = inject(TasksService);
  tasksFirebaseService = inject(FirebaseServiceTs);
  id = 'MnUTvclhDFbntBHR8Hba';

  ngOnInit(): void {
    this.tasksFirebaseService
      .getProjectTasks(this.id)
      .subscribe((tasks: TaskData[]) => {
        this.tasksService.tasks$.next(tasks);
      });
  }
}
