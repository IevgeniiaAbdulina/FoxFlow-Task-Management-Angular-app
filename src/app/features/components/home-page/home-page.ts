import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  Signal,
  signal,
} from '@angular/core';
import { AuthService } from '@app/auth/services/auth-service';
import { GreetingComponent } from '@app/features/components/greeting-component/greeting-component';
import { UserInterface } from '@app/shared/interfaces/user-interface';
import { ProjectsFirebaseService } from '@app/features/services/projects-service/projects-firebase-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsDialog } from '@app/shared/components/project-details-dialog/project-details-dialog';
import { take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [GreetingComponent, TranslateModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private authService = inject(AuthService);
  private projectsFirebaseService = inject(ProjectsFirebaseService);
  readonly dialog = inject(MatDialog);
  readonly name = signal('');

  readonly projects = toSignal(this.projectsFirebaseService.getProjects(), {
    initialValue: [],
  });

  readonly user$ = computed(() =>
    this.authService.currentUser()
  ) as Signal<UserInterface | null>;

  addProject(): void {
    const dialogRef = this.dialog.open(ProjectDetailsDialog, {
      data: { name: this.name() },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (!result) {
        return;
      } else {
        this.name.set(result);

        this.projectsFirebaseService
          .addProject(this.name())
          .pipe(take(1))
          .subscribe(() => {
            this.name.set('');
          });
      }
    });
  }
}
