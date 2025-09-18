import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Project } from '@app/shared/interfaces/project-interface';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { ProjectService } from '@app/features/services/projects-service/project-service';

@Component({
  selector: 'app-projects-list-item',
  imports: [MatButtonModule, MatCardModule, NgOptimizedImage],
  templateUrl: './projects-list-item.html',
  styleUrl: './projects-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListItem {
  readonly project$ = input.required<Project>();
  private router = inject(Router);
  private projectService = inject(ProjectService);

  openProject(): void {
    this.projectService.currentProject.set({ ...this.project$() });
    this.router.navigate(['project', this.project$().id]);
  }
}
