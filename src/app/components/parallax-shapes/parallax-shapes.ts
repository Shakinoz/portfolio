import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'app-parallax-shapes',
  templateUrl: './parallax-shapes.html',
  styleUrl: './parallax-shapes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:pointermove)': 'onPointerMove($event)',
    '(document:pointerout)': 'onPointerOut($event)',
  },
})
export class ParallaxShapes {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly shapes = viewChildren<ElementRef<HTMLElement>>('shape');
  private animationFrame: number | undefined;
  private pointerX = 0;
  private pointerY = 0;
  private readonly positions = new WeakMap<HTMLElement, { x: number; y: number }>();

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.animationFrame !== undefined && isPlatformBrowser(this.platformId)) {
        window.cancelAnimationFrame(this.animationFrame);
      }
    });
  }

  protected onPointerMove(event: PointerEvent): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(hover: none)').matches
    ) {
      return;
    }

    this.pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
    this.pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
    this.startAnimation();
  }

  protected onPointerOut(event: PointerEvent): void {
    if (
      isPlatformBrowser(this.platformId) &&
      event.relatedTarget === null
    ) {
      this.pointerX = 0;
      this.pointerY = 0;
      this.startAnimation();
    }
  }

  private startAnimation(): void {
    if (this.animationFrame === undefined) {
      this.animationFrame = window.requestAnimationFrame(this.animateShapes);
    }
  }

  private readonly animateShapes = (): void => {
    const shapes = this.shapes();
    let stillMoving = false;

    for (const shape of shapes) {
      const element = shape.nativeElement;
      const depth = Number(element.dataset['depth']);
      const targetX = this.pointerX * depth;
      const targetY = this.pointerY * depth;
      const position = this.positions.get(element) ?? { x: 0, y: 0 };
      const currentX = position.x;
      const currentY = position.y;
      const nextX = currentX + (targetX - currentX) * 0.12;
      const nextY = currentY + (targetY - currentY) * 0.12;

      this.positions.set(element, { x: nextX, y: nextY });
      element.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;

      if (Math.abs(targetX - nextX) > 0.05 || Math.abs(targetY - nextY) > 0.05) {
        stillMoving = true;
      } else {
        this.positions.set(element, { x: targetX, y: targetY });
        element.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
    }

    if (stillMoving) {
      this.animationFrame = window.requestAnimationFrame(this.animateShapes);
    } else {
      this.animationFrame = undefined;
    }
  };
}
