import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
  viewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MemberInterface } from '@app/shared/interfaces/member-interface';
import { NgOptimizedImage } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TasksService } from '@app/services/tasks-service/tasks-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-task-detail',
  imports: [
    MatButtonModule,
    MatIconModule,
    NgOptimizedImage,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetail implements OnInit {
  readonly task = signal<TaskData | null>(null);
  readonly editing = signal(false);
  readonly editingDescription = signal(false);
  projectId = 'MnUTvclhDFbntBHR8Hba';
  editingText = '';
  descriptionText = '';
  users: MemberInterface[] = [];
  selectedUserIds: string[] = [];
  @Output() readonly setEditingId = new EventEmitter<string | null>();
  readonly titleInputRef =
    viewChild<ElementRef<HTMLInputElement>>('titleInput');
  selectedDate: Date | null = null;

  private data = inject<{ taskId: string }>(MAT_DIALOG_DATA);
  private tasksFirebaseService = inject(FirebaseServiceTs);
  private tasksService = inject(TasksService);
  private dialogRef = inject(MatDialogRef<TaskDetail>);

  ngOnInit(): void {
    this.tasksFirebaseService
      .getTask(this.projectId, this.data.taskId)
      .subscribe((task) => {
        this.task.set(task);
        this.editingText = task.title;

        if (task.dueTo instanceof Timestamp) {
          this.selectedDate = task.dueTo.toDate();
        }
        this.descriptionText = task.description || '';
      });

    this.tasksFirebaseService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  closeTask(): void {
    this.dialogRef.close();
  }

  deleteTask(): void {
    console.log('delete task');
  }

  get selectedUsers(): MemberInterface[] {
    return this.users.filter((user) => this.selectedUserIds.includes(user.id));
  }

  editTask(): void {
    const currentTask = this.task();
    if (!currentTask) return;

    this.editing.set(true);
    this.editingText = currentTask.title;
    setTimeout(() => {
      this.titleInputRef()?.nativeElement.focus();
    });
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTask(): void {
    const currentTask = this.task();
    if (!currentTask || !this.editingText) return;

    const dataToUpdate = {
      title: this.editingText,
      isCompleted: currentTask.isCompleted,
    };
    this.tasksFirebaseService
      .updateTask(this.projectId, currentTask.id, dataToUpdate)
      .subscribe(() => {
        this.tasksService.changeTask(currentTask.id, this.editingText);
      });

    this.editing.set(false);
    this.setEditingId.emit(null);
  }

  saveHeaderTitle(): void {
    const currentTask = this.task();
    if (!currentTask || !this.editingText) return;

    const dataToUpdate = {
      title: this.editingText,
      isCompleted: currentTask.isCompleted,
    };
    this.tasksFirebaseService
      .updateTask(this.projectId, currentTask.id, dataToUpdate)
      .subscribe(() => {
        this.tasksService.changeTask(currentTask.id, this.editingText!);
        this.task.set({
          ...currentTask,
          title: this.editingText,
        });
        this.editing.set(false);
      });
  }

  cancelEditTask(): void {
    this.editing.set(false);
    this.editingText = '';
  }

  saveDateOnBlur(): void {
    const currentTask = this.task();
    if (!currentTask) return;

    const dueTo = this.selectedDate ? new Date(this.selectedDate) : null;
    const dataToUpdate = {
      title: currentTask.title,
      isCompleted: currentTask.isCompleted,
      dueTo: dueTo,
    };

    this.tasksFirebaseService
      .updateTask(this.projectId, currentTask.id, dataToUpdate)
      .subscribe(() => {
        this.task.set({
          ...currentTask,
          dueTo: dueTo,
        });
      });
  }

  editTaskDesription(): void {
    this.editingDescription.set(true);
  }

  saveTaskDescription(): void {
    const currentTask = this.task();
    if (!currentTask) return;

    const dataToUpdate = {
      title: currentTask.title,
      isComleted: currentTask.isCompleted,
      dueTo: currentTask.dueTo,
      description: this.descriptionText,
    };
    this.tasksFirebaseService
      .updateTask(this.projectId, currentTask.id, dataToUpdate)
      .subscribe(() => {
        this.task.set({
          ...currentTask,
          description: this.descriptionText,
        });
        this.editingDescription.set(false);
      });
  }

  cancelEditDescription(): void {
    this.editingDescription.set(false);
    this.descriptionText = this.task()?.description || '';
  }
}
