import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-cursor',
  template: '<span #cursor class="cursor" aria-hidden="true"></span>',
  styleUrl: './cursor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:pointermove)': 'onPointerMove($event)',
    '(document:pointerover)': 'onPointerOver($event)',
  },
})
export class Cursor {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cursor = viewChild<ElementRef<HTMLSpanElement>>('cursor');

  protected onPointerMove(event: PointerEvent): void {
    if (!isPlatformBrowser(this.platformId) || window.matchMedia('(hover: none)').matches) {
      return;
    }

    const cursor = this.cursor()?.nativeElement;
    if (!cursor) {
      return;
    }

    cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
    cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
    cursor.classList.add('visible');
  }

  protected onPointerOver(event: PointerEvent): void {
    if (!isPlatformBrowser(this.platformId) || !(event.target instanceof Element)) {
      return;
    }

    const cursor = this.cursor()?.nativeElement;
    if (!cursor) {
      return;
    }

    const target = event.target.closest<HTMLElement>('a, button, [role="button"]');
    const enlarge = !!target;
    cursor.classList.toggle('large', enlarge);
  }
}
