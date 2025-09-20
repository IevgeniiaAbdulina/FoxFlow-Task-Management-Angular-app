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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TaskData } from '@app/shared/interfaces/task-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MemberInterface } from '@app/shared/interfaces/member-interface';
import { NgOptimizedImage } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TasksService } from '@app/services/tasks-service/tasks-service';
import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

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
  projectId = 'MnUTvclhDFbntBHR8Hba';
  users: MemberInterface[] = [];
  selectedUserIds: string[] = [];
  readonly editing = signal(false);
  @Output() readonly setEditingId = new EventEmitter<string | null>();
  editingText = '';
  readonly titleInputRef =
    viewChild<ElementRef<HTMLInputElement>>('titleInput');
  selectedDate: Date | null = null;

  private data = inject<{ taskId: string }>(MAT_DIALOG_DATA);
  private tasksFirebaseService = inject(FirebaseServiceTs);
  private tasksService = inject(TasksService);

  ngOnInit(): void {
    console.log('Task ID:', this.data.taskId);
    console.log('data', this.data);
    this.tasksFirebaseService
      .getTask(this.projectId, this.data.taskId)
      .subscribe((task) => {
        this.task.set(task);
        this.editingText = task.title;
      });

    this.tasksFirebaseService.getUsers().subscribe((users) => {
      this.users = users;
      console.log('users', this.users);
    });
  }

  closeTask(): void {
    console.log('Close task');
    //this.editing.set(false);
    //this.setEditingId.emit(null);
  }

  deleteTask(): void {
    console.log('delete task');
  }

  get selectedUsers(): MemberInterface[] {
    return this.users.filter((user) => this.selectedUserIds.includes(user.id));
  }

  editTask(): void {
    console.log('edit header');
    const currentTask = this.task();
    if (!currentTask) return;

    this.editing.set(true);
    this.editingText = currentTask.title;
    //this.setEditingId.emit(currentTask.id);
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
      dueTo: this.selectedDate ? this.selectedDate : null,
    };
    this.tasksFirebaseService
      .updateTask(this.projectId, currentTask.id, dataToUpdate)
      .subscribe(() => {
        this.tasksService.changeTask(currentTask.id, this.editingText!);
        this.task.set({
          ...currentTask,
          title: this.editingText,
          dueTo: this.selectedDate,
        });
        this.editing.set(false);
      });
  }

  cancelEditTask(): void {
    console.log('cancelEditTask');
    this.editing.set(false);
    this.editingText = '';
  }
}
