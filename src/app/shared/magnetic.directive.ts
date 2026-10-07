import { isPlatformBrowser } from '@angular/common';
import { Directive, inject, PLATFORM_ID, signal } from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  host: {
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'reset()',
    '[style.translate]': 'translation()',
  },
})
export class MagneticDirective {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly translation = signal('0 0');

  protected onPointerMove(event: PointerEvent): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      event.pointerType !== 'mouse' ||
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const target = event.currentTarget;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const bounds = target.getBoundingClientRect();
    this.translation.set(
      `${(event.clientX - bounds.left - bounds.width / 2) * 0.3}px ${(event.clientY - bounds.top - bounds.height / 2) * 0.3}px`,
    );
  }

  protected reset(): void {
    this.translation.set('0 0');
  }
}
