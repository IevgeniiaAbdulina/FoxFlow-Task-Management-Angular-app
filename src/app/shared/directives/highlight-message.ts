import { Directive, ElementRef, inject, input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightMessage]',
})
export class HighlightMessage implements OnChanges {
  readonly appHighlightMessage = input.required<string>();

  private el = inject(ElementRef);

  ngOnChanges(): void {
    this.el.nativeElement.style.color = this.appHighlightMessage();
  }
}
