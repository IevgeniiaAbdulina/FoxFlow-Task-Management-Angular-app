import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { ProjectsFirebaseService } from '@app/features/services/projects-service/projects-firebase-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private projectsFirebaseService = inject(ProjectsFirebaseService);
  private route = inject(ActivatedRoute);
  readonly selectedProjectId = signal<string | null>(null);

  readonly projects = toSignal(this.projectsFirebaseService.getProjects(), {
    initialValue: [],
  });

  constructor() {
    this.route.paramMap
      .pipe(map((params) => params.get('id')))
      .subscribe((projectId) => {
        this.selectedProjectId.set(projectId);
      });

    this.projectsFirebaseService.getProjects().subscribe((projects) => {
      console.log('Sidebar projects fetched:', projects);
    });
  }

  selectProject(projectId: string): void {
    this.selectedProjectId.set(projectId);
  }
}
