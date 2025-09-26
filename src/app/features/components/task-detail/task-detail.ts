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
import { TaskData, TaskStatus } from '@app/shared/interfaces/task-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MemberInterface } from '@app/shared/interfaces/member-interface';
import { NgOptimizedImage } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { TranslateModule } from '@ngx-translate/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StatusTask } from '@app/shared/directives/status-task/status-task';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { CommonModule } from '@angular/common';

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
    TranslateModule,
    MatDividerModule,
    MatTooltipModule,
    StatusTask,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetail implements OnInit {
  private projectService = inject(ProjectService);
  private data = inject<{ taskId: string }>(MAT_DIALOG_DATA);
  private tasksFirebaseService = inject(FirebaseServiceTs);
  private dialogRef = inject(MatDialogRef<TaskDetail>);

  defaultTask: TaskData = {
    id: '',
    status: 'todo',
    title: '',
    createdAt: new Date(),
  };

  readonly task = signal<TaskData>(this.defaultTask);
  readonly editing = signal(false);
  readonly editingDescription = signal(false);

  projectId: string | undefined;
  editingText = '';
  descriptionText = '';
  users: MemberInterface[] = [];
  selectedUserIds: string[] = [];
  @Output() readonly setEditingId = new EventEmitter<string | null>();
  readonly titleInputRef =
    viewChild<ElementRef<HTMLInputElement>>('titleInput');
  readonly descriptionArea =
    viewChild<ElementRef<HTMLTextAreaElement>>('descriptionArea');
  selectedDate: Date | null = null;
  selectedStatus: TaskStatus | undefined = 'todo';
  assignedUsers: MemberInterface[] | undefined = [];
  isAssignedUsers = false;

  ngOnInit(): void {
    this.projectId = this.projectService.currentProject()?.id;

    if (this.projectId) {
      this.tasksFirebaseService
        .getTask(this.projectId, this.data.taskId)
        .subscribe((task) => {
          this.task.set(task);
          this.editingText = task.title;

          if (task.dueTo instanceof Timestamp) {
            this.selectedDate = task.dueTo.toDate();
          }
          this.descriptionText = task.description || '';
          this.selectedStatus = task.status;
          this.assignedUsers = task.assignedTo;
          task.assignedTo?.forEach((user) => {
            this.selectedUserIds.push(user.id);
          });
          if (this.assignedUsers?.length !== 0) {
            this.isAssignedUsers = true;
          }
        });
    }

    this.tasksFirebaseService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  get selectedUsers(): MemberInterface[] {
    return this.users.filter((user) => this.selectedUserIds.includes(user.id));
  }

  //Edit title

  editTaskTitle(): void {
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

  saveTaskTitle(): void {
    const currentTask = this.task();
    if (!currentTask || !this.editingText) return;

    const dataToUpdate = {
      id: currentTask.id,
      title: this.editingText,
    };
    if (this.projectId) {
      this.tasksFirebaseService
        .updateTask(this.projectId, currentTask.id, dataToUpdate)
        .subscribe(() => {
          this.task.set({
            ...currentTask,
            title: this.editingText,
          });
          this.editing.set(false);
        });
    }
  }

  cancelEditTask(): void {
    this.editing.set(false);
    this.editingText = '';
  }

  //Assign Users

  chooseUserForAssign(): void {
    this.selectedUserIds = this.assignedUsers?.map((user) => user.id) ?? [];
    this.isAssignedUsers = !this.isAssignedUsers;
  }

  saveUsersAssignedToTask(): void {
    const currentTask = this.task();
    if (!currentTask) return;
    let assignedUsersTemp: MemberInterface[] | undefined = [];
    assignedUsersTemp = this.selectedUsers;

    const updateDate = {
      assignedTo: assignedUsersTemp,
    };
    if (this.projectId) {
      this.tasksFirebaseService
        .updateTask(this.projectId, currentTask.id, updateDate)
        .subscribe(() => {
          this.task.set({
            ...currentTask,
            assignedTo: assignedUsersTemp,
          });
        });
    }
  }

  //Edit task deadline

  saveTaskDeadline(): void {
    const currentTask = this.task();
    if (!currentTask) return;

    const dueTo = this.selectedDate ? new Date(this.selectedDate) : null;
    const dataToUpdate = {
      title: currentTask.title,
      dueTo: dueTo,
    };

    if (this.projectId) {
      this.tasksFirebaseService
        .updateTask(this.projectId, currentTask.id, dataToUpdate)
        .subscribe(() => {
          this.task.set({
            ...currentTask,
            dueTo: dueTo,
          });
        });
    }
  }

  //Change task status

  onStatusChange(): void {
    const currentTask = this.task();
    if (!currentTask) return;

    const updatedTask = {
      status: this.selectedStatus,
    };
    if (this.projectId) {
      this.tasksFirebaseService
        .updateTask(this.projectId, currentTask.id, updatedTask)
        .subscribe(() => {
          this.task.set({
            ...currentTask,
          });
        });
    }
  }

  //Edit task description

  editTaskDescription(): void {
    this.editingDescription.set(true);
    setTimeout(() => {
      this.descriptionArea()?.nativeElement.focus();
    });
  }

  saveTaskDescription(): void {
    const currentTask = this.task();
    if (!currentTask) return;

    const dataToUpdate = {
      id: currentTask.id,
      description: this.descriptionText,
    };
    if (this.projectId) {
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
  }

  cancelEditDescription(): void {
    this.descriptionText = this.task()?.description || '';
    this.editingDescription.set(false);
  }

  closeTask(): void {
    this.dialogRef.close();
  }

  deleteTask(): void {
    const currentTask = this.task();
    if (!currentTask) return;
    if (this.projectId) {
      this.tasksFirebaseService
        .deleteTask(this.projectId, currentTask.id)
        .subscribe(() => {
          /* EMPTY */
        });
    }
    this.closeTask();
  }
}
