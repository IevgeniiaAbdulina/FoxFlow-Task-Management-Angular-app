import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '@app/shared/interfaces/project-interface';
import { ProjectsListItem } from '@app/shared/components/projects-list-item/projects-list-item';

@Component({
  selector: 'app-projects-list-large',
  imports: [ProjectsListItem],
  templateUrl: './projects-list-large.html',
  styleUrl: './projects-list-large.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListLarge {
  readonly projects$ = input.required<Project[]>();
}
