import {Directive, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
  selector: '[appButtonStyle]'
})

export class ButtonStylingDirective {

  @Input()
  @HostBinding('style.backgroundColor') background: string;

  @HostBinding('style.color') color: string = 'white';

  @HostBinding('style.border') border: string = 'none';

  @HostListener('mouseenter') onEnter(): void {
    this.color = this.background;
    this.background = 'white';
  }

  @HostListener('mouseleave') onLeave(): void {
    this.background = this.color;
    this.color = 'white';
    this.border = 'none';
  }

  @HostListener('mousedown') onMouseDown(): void {
    this.border = `solid ${this.color} 2px`
  }

  @HostListener('mouseup') onMouseUp(): void {
    this.border = 'none';
  }

}
