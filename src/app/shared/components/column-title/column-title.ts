import { Component, input } from '@angular/core';

@Component({
  selector: 'app-column-title',
  imports: [],
  templateUrl: './column-title.html',
  styleUrl: './column-title.scss',
})
export class ColumnTitle {
  readonly total = input.required<number>();
  readonly column = input.required<number>();

  progressPercentage(): number {
    return this.total() > 0 ? (this.column() / this.total()) * 100 : 0;
  }
}
