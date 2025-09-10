import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-member',
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './member.html',
  styleUrl: './member.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Member {
  readonly name = input<string>('');
  readonly position = input<string>('');
  readonly image = input<string>('');
  readonly gitHub = input<string>('');
}
