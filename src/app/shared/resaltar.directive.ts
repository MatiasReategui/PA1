import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Directiva de atributo personalizada: resalta visualmente un elemento
 * (por ejemplo, una fila de solicitud) al pasar el mouse sobre él.
 * Se usa en solicitud-list para reforzar el uso de directivas en Angular.
 */
@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {
  @Input('appResaltar') colorResaltado = '#eef4ff';

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.el.nativeElement.style.backgroundColor = this.colorResaltado;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
