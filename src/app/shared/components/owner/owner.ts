import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { OwnerData } from '@app/shared/interfaces/owner-interface';

@Component({
  selector: 'app-owner',
  imports: [MatCardModule, NgOptimizedImage],
  templateUrl: './owner.html',
  styleUrl: './owner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Owner {
  readonly owner = input.required<OwnerData>();
}
