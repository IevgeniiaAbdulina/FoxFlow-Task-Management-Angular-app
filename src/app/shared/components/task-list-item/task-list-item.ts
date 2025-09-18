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

@Component({
  selector: 'app-task-list-item',
  imports: [MatIconModule, CommonModule],
  templateUrl: './task-list-item.html',
  styleUrl: './task-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListItem implements OnInit {
  readonly task = input<TaskData>() as InputSignal<TaskData>;
  readonly isEditing = input<boolean>();
  @Output() readonly setEditingId = new EventEmitter<string | null>();

  editingText = '';
  id = 'MnUTvclhDFbntBHR8Hba';

  tasksService = inject(TasksService);
  tasksFirebaseService = inject(FirebaseServiceTs);

  ngOnInit(): void {
    this.editingText = this.task().title;
  }

  deleteTask(): void {
    this.tasksFirebaseService
      .deleteTask(this.id, this.task().id)
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
      isCompleted: this.task().isCompleted,
    };
    this.tasksFirebaseService
      .updateTask(this.id, this.task().id, dataToUpdate)
      .subscribe(() => {
        this.tasksService.changeTask(this.task().id, this.editingText);
      });

    this.setEditingId.emit(null);
  }
}
