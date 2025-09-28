import {
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';
import { TaskData, TaskStatus } from '@app/shared/interfaces/task-interface';
import { Timestamp } from 'firebase/firestore';

@Directive({
  selector: '[appStyleChange]',
})
export class StyleChange implements OnChanges {
  //readonly daysForDeadline = input.required<number>();
  //readonly taskStatus = input.required<TaskStatus>();
  readonly task = input.required<TaskData>();

  private el = inject(ElementRef);
  private render = inject(Renderer2);

  private getDaysToDeadline(task: TaskData): number {
    const dueTo = task?.dueTo;

    if (!dueTo || !(dueTo instanceof Timestamp)) return 3;
    if (task.status === 'done') {
      return 3;
    }

    const deadlineDate = dueTo.toDate();
    const today = new Date();
    const diff = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  ngOnChanges(): void {
    const task = this.task();
    const days = this.getDaysToDeadline(task);

    if (task.status !== 'done' && days <= 2) {
      this.render.addClass(this.el.nativeElement, 'deadline');
    } else if (task.status === 'done') {
      this.render.removeClass(this.el.nativeElement, 'deadline');
      this.render.addClass(this.el.nativeElement, 'task-complete');
    } else {
      this.render.removeClass(this.el.nativeElement, 'deadline');
    }
  }
}
