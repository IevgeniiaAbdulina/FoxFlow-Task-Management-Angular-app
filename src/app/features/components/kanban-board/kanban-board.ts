import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskBody } from '@app/shared/components/task-body/task-body';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-kanban-board',
  imports: [TaskBody, TranslateModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanBoard {}
