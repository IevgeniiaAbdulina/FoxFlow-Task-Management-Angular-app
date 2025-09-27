import {
  Component,
  input,
  ChangeDetectionStrategy,
  output,
  inject,
} from '@angular/core';
import { UserInterface } from '@app/shared/interfaces/user-interface';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '@app/shared/interfaces/project-interface';
import { ProjectsListLarge } from '@app/shared/components/projects-list-large/projects-list-large';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-greeting-component',
  standalone: true,
  imports: [
    DatePipe,
    MatIconModule,
    MatButtonModule,
    ProjectsListLarge,
    TranslateModule,
  ],
  templateUrl: './greeting-component.html',
  styleUrls: ['./greeting-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetingComponent {
  readonly user$ = input.required<UserInterface | null>();
  readonly projects$ = input.required<Project[]>();

  readonly addProject = output();

  today: number = Date.now();
  private translate = inject(TranslateService);

  timeOfDay(): string {
    const hour = new Date(this.today).getHours();
    let timeKey: string;
    if (hour < 12) timeKey = 'MORNING';
    else if (hour < 17) timeKey = 'AFTERNOON';
    else timeKey = 'EVENING';
    return this.translate.instant(`TIME.${timeKey}`);
  }
}
