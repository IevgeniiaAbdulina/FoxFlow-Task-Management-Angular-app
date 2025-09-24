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

  openProject(): void {
    const projectId: string = this.project$().id as string;
    if (projectId) {
      this.router.navigate(['project', this.project$().id]);
    } else {
      console.error('cant navigate to not actualized project!');
    }
  }
}
