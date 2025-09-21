import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  input,
  InputSignal,
  Output,
  OnInit,
} from '@angular/core';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TasksService } from '@app/services/tasks-service/tasks-service';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetail } from '@app/features/components/task-detail/task-detail';
import { Months } from '@app/shared/enums/Months';
//import { Router } from '@angular/router';
//import { Timestamp } from '@angular/fire/firestore';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-task-list-item',
  imports: [MatIconModule, CommonModule],
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListItem implements OnInit {
  readonly task = input.required<TaskData>();
  readonly isEditing = input<boolean>(false);
  @Output() readonly setEditingId = new EventEmitter<string | null>();
  @Output() readonly requestEdit = new EventEmitter<string>();

  editingText = '';
  projectId = 'MnUTvclhDFbntBHR8Hba';
  today = Date.now();
  daysToDeadline = 0;

  private tasksService = inject(TasksService);
  private tasksFirebaseService = inject(FirebaseServiceTs);
  //private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.editingText = this.task().title;
    this.getDaysToDeadline();
  }

  deleteTask(): void {
    this.tasksFirebaseService
      .deleteTask(this.projectId, this.task().id)
      .subscribe(() => {
        this.tasksService.deleteTask(this.task().id);
      });
  }

  setTaskInEditMode(): void {
    this.editingText = this.task().title;
    this.setEditingId.emit(this.task().id);
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTask(): void {
    const dataToUpdate = {
      title: this.editingText,
    };
    this.tasksFirebaseService
      .updateTask(this.projectId, this.task().id, dataToUpdate)
      .subscribe(() => {
        this.tasksService.changeTask(this.task().id, this.editingText);
      });

    this.setEditingId.emit(null);
  }

  openTaskDetailInformation(): void {
    console.log('openTaskDetailInformation');
    //this.router.navigate(['/task', this.task().id])
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

    const deadlineDate = dueTo.toDate();
    const today = new Date();
    //console.log('date', date);
    //console.log('getDaysToDeadline', this.today);
    const diff = deadlineDate.getTime() - today.getTime();
    this.daysToDeadline = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return this.daysToDeadline;
  }

  onEditClick(): void {
    this.requestEdit.emit(this.task().id);
  }
}
