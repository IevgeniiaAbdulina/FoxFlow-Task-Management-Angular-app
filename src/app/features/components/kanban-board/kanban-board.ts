import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { TaskHeader } from '@app/shared/components/task-header/task-header';
import { TaskListItem } from '@app/shared/components/task-list-item/task-list-item';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';

@Component({
  selector: 'app-kanban-board',
  imports: [TranslateModule, TaskHeader, TaskListItem],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private tasksFirebaseService = inject(FirebaseServiceTs);

  readonly toDoTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  readonly inProgressTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  readonly doneTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);

  projectId: string | undefined;
  localEditingId: string | null = null;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];

      if (this.projectId) {
        this.tasksFirebaseService
          .getProjectTasks(this.projectId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((tasks) => {
            const groupedTasks = Object.groupBy(
              tasks,
              (task: TaskData) => task.status
            );

            this.toDoTasks.set(groupedTasks['todo'] ?? []);
            this.inProgressTasks.set(groupedTasks['in-progress'] ?? []);
            this.doneTasks.set(groupedTasks['done'] ?? []);
          });
      }
    });
  }

  onEditClick(id: string | null): void {
    this.localEditingId = id;
  }
}
