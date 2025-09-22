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
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { TaskBody } from '@app/shared/components/task-body/task-body';
import { TranslateModule } from '@ngx-translate/core';
import { TasksService } from '@app/services/tasks-service/tasks-service';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { TaskHeader } from '@app/shared/components/task-header/task-header';
import { TaskListItem } from '@app/shared/components/task-list-item/task-list-item';
import { ProjectHeader } from '@app/features/components/project-header/project-header';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kanban-board',
  imports: [TaskBody, TranslateModule, ProjectHeader, TaskHeader, TaskListItem],
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

  private taskService = inject(TasksService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = params['id'];

      if (this.projectId) {
        this.tasksService
          .getTasksFromFirebase(this.projectId)
          .subscribe((tasks) => {
            this.toDoTasks.set(tasks.filter((task) => task.status === 'todo'));
            this.inProgressTasks.set(
              tasks.filter((task) => task.status === 'inprogress')
            );
            this.doneTasks.set(tasks.filter((task) => task.status === 'done'));
          });
      }
    });
  }

  onEditClick(id: string | null): void {
    this.localEditingId = id;
  }
}
