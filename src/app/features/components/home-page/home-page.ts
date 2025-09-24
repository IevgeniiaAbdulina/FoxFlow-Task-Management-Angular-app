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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ProjectsFirebaseService } from '@app/features/services/projects-service/projects-firebase-service';
import { ProjectDetailsDialog } from '@app/shared/components/project-details-dialog/project-details-dialog';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [
    GreetingComponent,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private authService = inject(AuthService);
  private projectsFirebaseService = inject(ProjectsFirebaseService);
  readonly dialog = inject(MatDialog);

  readonly projects = toSignal(this.projectsFirebaseService.getProjects());
  readonly name = signal('');

  readonly user$ = computed(() =>
    this.authService.currentUser()
  ) as Signal<UserInterface>;

  addProject(): void {
    const dialogRef = this.dialog.open(ProjectDetailsDialog, {
      data: { name: this.name() },
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed');
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
