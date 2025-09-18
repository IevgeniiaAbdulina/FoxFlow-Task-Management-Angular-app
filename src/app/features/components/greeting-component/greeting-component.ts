import {
  Component,
  input,
  ChangeDetectionStrategy,
  output,
} from '@angular/core';
import { UserInterface } from '@app/shared/interfaces/user-interface';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Project } from '@app/shared/interfaces/project-interface';
import { ProjectsListLarge } from '@app/shared/components/projects-list-large/projects-list-large';

@Component({
  selector: 'app-greeting-component',
  imports: [
    DatePipe,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ProjectsListLarge,
  ],
  templateUrl: './greeting-component.html',
  styleUrl: './greeting-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreetingComponent {
  readonly user$ = input.required<UserInterface>();
  readonly projects$ = input.required<Project[]>();

  readonly addProject = output();

  today: number = Date.now();
}
