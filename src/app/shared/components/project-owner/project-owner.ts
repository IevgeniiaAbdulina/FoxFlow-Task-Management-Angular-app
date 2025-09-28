import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MemberInterface } from '@app/shared/interfaces/member-interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-project-owner',
  imports: [NgOptimizedImage, MatTooltipModule],
  templateUrl: './project-owner.html',
  styleUrl: './project-owner.scss',
  host: {
    '[attr.data-details-visible]': 'isVisible()',
  },
})
export class ProjectOwner {
  readonly owner = input.required<MemberInterface>();
  readonly isVisible = input.required<boolean>();
}
