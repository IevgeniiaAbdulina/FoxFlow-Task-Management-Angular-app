import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { TasksService } from '@app/services/tasks-service/tasks-service';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { TaskListItem } from '../task-list-item/task-list-item';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-task-main',
  imports: [TaskListItem, TranslateModule],
  templateUrl: './task-main.html',
  styleUrl: './task-main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMain implements OnInit {
  readonly tasks = signal<TaskData[]>([]);
  editingId: string | null = null;
  id = 'MnUTvclhDFbntBHR8Hba';

  private tasksService = inject(TasksService);

  ngOnInit(): void {
    this.tasksService.getTasksFromFirebase(this.id).subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }
}
