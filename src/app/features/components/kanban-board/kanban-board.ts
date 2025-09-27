import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  viewChildren,
  WritableSignal,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TaskData, TaskStatus } from '@app/shared/interfaces/task-interface';
import { TaskHeader } from '@app/shared/components/task-header/task-header';
import { TaskListItem } from '@app/shared/components/task-list-item/task-list-item';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { TaskContainerType } from '@app/shared/types/tasks-container-type';

@Component({
  selector: 'app-kanban-board',
  imports: [
    TranslateModule,
    TaskHeader,
    TaskListItem,
    DragDropModule,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private tasksFirebaseService = inject(FirebaseServiceTs);

  readonly dropList = viewChildren(CdkDropList);

  readonly toDoTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  readonly inProgressTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);
  readonly doneTasks: WritableSignal<TaskData[]> = signal<TaskData[]>([]);

  projectId: string | undefined;

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

  drop(event: CdkDragDrop<TaskData[]>): void {
    const previousContainerId = event.previousContainer.id as TaskContainerType;
    const currentContainerId = event.container.id as TaskContainerType;

    const previousSignal = this.getSignalForContainer(
      previousContainerId
    ) as WritableSignal<TaskData[]>;
    const currentSignal = this.getSignalForContainer(
      currentContainerId
    ) as WritableSignal<TaskData[]>;

    if (event.previousContainer === event.container) {
      const currentItems = [...currentSignal()];
      moveItemInArray(currentItems, event.previousIndex, event.currentIndex);
      currentSignal.set(currentItems);
    } else {
      const previousItems = [...previousSignal()];
      const currentItems = [...currentSignal()];

      transferArrayItem(
        previousItems,
        currentItems,
        event.previousIndex,
        event.currentIndex
      );

      const movedTaskIndex = event.currentIndex;
      if (currentItems[movedTaskIndex]) {
        this.updateTasksStatus(
          currentItems[movedTaskIndex],
          currentContainerId
        );
      }

      previousSignal.set(previousItems);
      currentSignal.set(currentItems);
    }
  }

  private getSignalForContainer(
    containerId: TaskContainerType
  ): WritableSignal<TaskData[]> | null {
    if (containerId === 'todo') return this.toDoTasks;
    if (containerId === 'inProgress') return this.inProgressTasks;
    if (containerId === 'done') return this.doneTasks;
    return null;
  }

  private updateTasksStatus(task: TaskData, newContainerId: string): void {
    const statusMap: { [key: string]: TaskStatus } = {
      todo: 'todo',
      inProgress: 'in-progress',
      done: 'done',
    };

    task.status = statusMap[newContainerId];

    const updatedTask = {
      status: task.status,
    };
    this.tasksFirebaseService.updateTask(this.projectId!, task.id, updatedTask);
  }

  getConnectedLists(): CdkDropList[] {
    return this.dropList ? Array.from(this.dropList()) : [];
  }
}
