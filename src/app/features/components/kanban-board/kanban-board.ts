import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TasksService } from '@app/services/tasks-service/tasks-service';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { TaskHeader } from '@app/shared/components/task-header/task-header';
import { TaskListItem } from '@app/shared/components/task-list-item/task-list-item';
import { ActivatedRoute } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  private tasksService = inject(TasksService);
  readonly toDoTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  readonly inProgressTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  readonly doneTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);

  projectId: string | undefined;

  localEditingId: string | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];

      if (this.projectId) {
        this.tasksService
          .getTasksFromFirebase(this.projectId)
          .subscribe((tasks) => {
            const groupedTasks = Object.groupBy(
              tasks,
              (task: TaskData) => task.status
            );

            this.toDoTasks.set(groupedTasks['todo'] || []);
            this.inProgressTasks.set(groupedTasks['inprogress'] || []);
            this.doneTasks.set(groupedTasks['done'] || []);
          });
      }
    });
  }

  onEditClick(id: string | null): void {
    this.localEditingId = id;
  }
}
