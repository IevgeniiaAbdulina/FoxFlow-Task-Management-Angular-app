import {
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlightMessage]',
})
export class HighlightMessage implements OnChanges {
  readonly appHighlightMessage = input.required<string>();

  private el = inject(ElementRef);
  private renderer2 = inject(Renderer2);

  ngOnChanges(): void {
    this.el.nativeElement.style.color = this.appHighlightMessage();
    this.renderer2.setStyle(
      this.el.nativeElement,
      'color',
      this.appHighlightMessage()
    );
  }
}
