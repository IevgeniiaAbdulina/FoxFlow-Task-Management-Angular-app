import {
  Component,
  inject,
  OnInit,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ProjectService } from '@app/features/services/projects-service/project-service';
import { Project } from '@app/shared/interfaces/project-interface';

import { A11yModule } from '@angular/cdk/a11y';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-header',
  imports: [
    A11yModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './project-header.html',
  styleUrl: './project-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectHeader implements OnInit {
  private projectService = inject(ProjectService);

  readonly project$ = signal<Project | null>(null);

  readonly isEditing = signal<boolean>(false);
  editingText = '';

  ngOnInit(): void {
    this.project$.set(this.projectService.currentProject()!);
  }

  removeProject(): void {
    this.projectService.removeProject(this.project$()!);
  }

  updateProject(): void {
    console.log('Value is updated', this.editingText);

    this.projectService.updateProject(
      this.project$()?.id as string,
      this.editingText
    );

    this.isEditing.set(false);
  }

  setProjectInEditMode(): void {
    this.isEditing.set(true);
  }
}
