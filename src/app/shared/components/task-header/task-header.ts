import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  computed,
} from '@angular/core';
import { FirebaseServiceTs } from '@app/services/firebase/firebase-service';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-header',
  imports: [TranslateModule, MatIconModule],
  templateUrl: './task-header.html',
  styleUrl: './task-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHeader {
  private projectService = inject(ProjectService);
  private tasksFirebaseService = inject(FirebaseServiceTs);
  private destroyRef = inject(DestroyRef);

  text = '';
  status: 'todo' | 'inProgress' | 'done' = 'todo';

  readonly projectId = computed(() => this.projectService.currentProject()?.id);

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTask(): void {
    const date = new Date();
    this.tasksFirebaseService
      .addTask(this.text, this.projectId()!, date)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        /* empty */
      });
    this.text = '';
  }
}
