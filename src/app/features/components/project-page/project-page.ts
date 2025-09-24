import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProjectHeader } from '@app/features/components/project-header/project-header';
import { KanbanBoard } from '@app/features/components/kanban-board/kanban-board';

@Component({
  selector: 'app-project-page',
  imports: [ProjectHeader, KanbanBoard],
  templateUrl: './project-page.html',
  styleUrl: './project-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPage {}
