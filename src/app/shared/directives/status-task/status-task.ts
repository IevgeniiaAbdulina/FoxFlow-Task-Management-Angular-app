import {
  Directive,
  ElementRef,
  inject,
  input,
  Renderer2,
  OnChanges,
} from '@angular/core';
import { TaskStatus } from '@app/shared/interfaces/task-interface';

@Directive({
  selector: '[appStatusTask]',
})
export class StatusTask implements OnChanges {
  readonly taskStatus = input.required<TaskStatus>();

  private el = inject(ElementRef);
  private render = inject(Renderer2);

  ngOnChanges(): void {
    if (this.taskStatus() === 'todo') {
      this.render.addClass(this.el.nativeElement, 'todo');
      this.render.removeClass(this.el.nativeElement, 'in-progress');
      this.render.removeClass(this.el.nativeElement, 'done');
    } else if (this.taskStatus() === 'in-progress') {
      this.render.addClass(this.el.nativeElement, 'in-progress');
      this.render.removeClass(this.el.nativeElement, 'done');
      this.render.removeClass(this.el.nativeElement, 'todo');
    } else {
      this.render.addClass(this.el.nativeElement, 'done');
      this.render.removeClass(this.el.nativeElement, 'in-progress');
      this.render.removeClass(this.el.nativeElement, 'todo');
    }
  }
}
