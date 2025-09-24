import {
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { TaskStatus } from '@app/shared/interfaces/task-interface';

@Directive({
  selector: '[appStyleChange]',
})
export class StyleChange implements OnChanges {
  readonly daysForDeadline = input.required<number>();
  readonly taskStatus = input.required<TaskStatus>();

  private el = inject(ElementRef);
  private render = inject(Renderer2);

  ngOnChanges(): void {
    if (this.taskStatus() !== 'done' && this.daysForDeadline() <= 2) {
      this.render.addClass(this.el.nativeElement, 'deadline');
    } else if (this.taskStatus() === 'done') {
      this.render.removeClass(this.el.nativeElement, 'deadline');
      this.render.addClass(this.el.nativeElement, 'task-complete');
    } else {
      this.render.removeClass(this.el.nativeElement, 'deadline');
    }
  }
}
