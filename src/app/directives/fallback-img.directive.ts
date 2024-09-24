import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true
})
export class FallbackImgDirective {
  @Input() fallback: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.fallback;
    console.log('error on image....')
  }

}
