import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  computed,
  OnChanges,
  //DestroyRef,
} from '@angular/core';
//import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetail } from '@app/features/components/task-detail/task-detail';
import { Months } from '@app/shared/enums/Months';
import { Timestamp } from 'firebase/firestore';
import { StyleChange } from '@app/shared/directives/style-change/style-change';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
//import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { NgOptimizedImage } from '@angular/common';
import { StatusTask } from '@app/shared/directives/status-task/status-task';

@Component({
  selector: 'app-task-list-item',
  imports: [
    MatIconModule,
    CommonModule,
    StyleChange,
    MatTooltipModule,
    TranslateModule,
    NgOptimizedImage,
    StatusTask,
  ],
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListItem implements OnChanges {
  @Output() readonly setEditingId = new EventEmitter<string | null>();
  @Output() readonly requestEdit = new EventEmitter<string>();
  readonly task = input.required<TaskData>();

  private projectService = inject(ProjectService);
  //private tasksFirebaseService = inject(FirebaseServiceTs);
  //private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);

  readonly projectId = computed(() => this.projectService.currentProject()?.id);

  isCompleted = false;
  daysToDeadline = 0;

  ngOnChanges(): void {
    this.getDaysToDeadline();
  }

  // deleteTask(): void {
  //   this.tasksFirebaseService
  //     .deleteTask(this.projectId()!, this.task().id)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(() => {
  //       /* empty */
  //     });
  // }

  openTaskDetailInformation(): void {
    this.dialog.open(TaskDetail, {
      data: { taskId: this.task().id },
    });
  }

  getDeadline(): string | null {
    const dueTo = this.task()?.dueTo;
    if (!dueTo || !(dueTo instanceof Timestamp)) return null;

    const date = (dueTo as Timestamp).toDate();
    const day = date.getDate();
    const month = Months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }

  getDaysToDeadline(): number | null {
    const dueTo = this.task()?.dueTo;
    if (!dueTo || !(dueTo instanceof Timestamp)) {
      this.daysToDeadline = 3;
      return this.daysToDeadline;
    }

    if (this.task().status === 'done') {
      this.isCompleted = true;
      this.daysToDeadline = 3;
    }

    const deadlineDate = dueTo.toDate();
    const today = new Date();
    const diff = deadlineDate.getTime() - today.getTime();
    this.daysToDeadline = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return this.daysToDeadline;
  }
}
