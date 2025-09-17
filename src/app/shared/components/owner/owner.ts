import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-owner',
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './owner.html',
  styleUrl: './owner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Owner {
  readonly name = input<string>('');
  readonly position = input<string>('');
  readonly image = input<string>('');
  readonly gitHub = input<string>('');
}
