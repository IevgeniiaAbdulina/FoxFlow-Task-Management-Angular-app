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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { ProjectDetailsDialog } from '@app/shared/components/project-details-dialog/project-details-dialog';
import { take } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    GreetingComponent,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private authService = inject(AuthService);
  private projectsFirebaseService = inject(ProjectsFirebaseService);
  private breakpointObserver = inject(BreakpointObserver);
  readonly dialog = inject(MatDialog);
  readonly name = signal('');
  readonly selectedProjectId = signal<string | null>(null);

  readonly projects = toSignal(this.projectsFirebaseService.getProjects(), {
    initialValue: [],
  });

  readonly user$ = computed(() =>
    this.authService.currentUser()
  ) as Signal<UserInterface>;

  readonly isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map((result) => result.matches)),
    { initialValue: false }
  );

  selectProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
  }

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
