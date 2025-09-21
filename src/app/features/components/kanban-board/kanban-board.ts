import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TasksService } from '@app/services/tasks-service/tasks-service';
//import { TaskBody } from '@app/shared/components/task-body/task-body';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { TranslateModule } from '@ngx-translate/core';
import { TaskHeader } from '@app/shared/components/task-header/task-header';
import { TaskListItem } from '@app/shared/components/task-list-item/task-list-item';

@Component({
  selector: 'app-kanban-board',
  imports: [TranslateModule, TaskHeader, TaskListItem],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard implements OnInit {
  readonly todo = signal<TaskData[]>([]);
  readonly inProgress = signal<TaskData[]>([]);
  readonly done = signal<TaskData[]>([]);

  projectId = 'MnUTvclhDFbntBHR8Hba';
  //editingId: string | null = null;
  localEditingId: string | null = null;

  private taskService = inject(TasksService);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasksFromFirebase(this.projectId).subscribe((tasks) => {
      this.todo.set(tasks.filter((task) => task.status === 'todo'));
      this.inProgress.set(
        tasks.filter((task) => task.status === 'in-progress')
      );
      this.done.set(tasks.filter((task) => task.status === 'done'));
    });
  }

  onEditClick(id: string | null): void {
    this.localEditingId = id;
  }
}
