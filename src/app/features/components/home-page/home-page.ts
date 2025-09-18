import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  Signal,
} from '@angular/core';
import { AuthService } from '@app/auth/services/auth-service';
import { GreetingComponent } from '@app/features/components/greeting-component/greeting-component';
import { UserInterface } from '@app/shared/interfaces/user-interface';
import { ProjectsFirebaseService } from '@app/features/services/projects-service/projects-firebase-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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

  readonly projects = toSignal(this.projectsFirebaseService.getProjects(), {
    initialValue: [],
  });

  readonly user$ = computed(() =>
    this.authService.currentUser()
  ) as Signal<UserInterface>;
}
