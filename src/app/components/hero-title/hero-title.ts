import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'app-hero-title',
  templateUrl: './hero-title.html',
  styleUrl: './hero-title.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'resetWeights()',
  },
})
export class HeroTitle {
  readonly name = input.required<string>();
  protected readonly lines = computed(() => this.name().split(' ').map((word) => Array.from(word)));

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly letters = viewChildren<ElementRef<HTMLSpanElement>>('letterElement');
  private pointerX = -1000;
  private pointerY = -1000;
  private frame: number | undefined;
  private readonly weights: number[] = [];
  private readonly widths: number[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.frame !== undefined && isPlatformBrowser(this.platformId)) {
        window.cancelAnimationFrame(this.frame);
      }
    });
  }

  protected onPointerMove(event: PointerEvent): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    this.pointerX = event.clientX;
    this.pointerY = event.clientY;
    this.scheduleFrame();
  }

  protected resetWeights(): void {
    this.pointerX = -1000;
    this.pointerY = -1000;
    this.scheduleFrame();
  }

  private scheduleFrame(): void {
    if (this.frame === undefined) {
      this.frame = window.requestAnimationFrame(this.animateLetters);
    }
  }

  private readonly animateLetters = (): void => {
    const letters = this.letters();
    let hasDifference = false;

    letters.forEach((letter, index) => {
      const bounds = letter.nativeElement.getBoundingClientRect();
      const distance = Math.hypot(
        this.pointerX - (bounds.left + bounds.width / 2),
        this.pointerY - (bounds.top + bounds.height / 2),
      );
      const influence = Math.max(0, 1 - distance / 260);
      const targetWeight = 300 + influence * 500;
      const targetWidth = 100 - influence * 20;

      this.weights[index] ??= 300;
      this.widths[index] ??= 100;
      this.weights[index] += (targetWeight - this.weights[index]) * 0.18;
      this.widths[index] += (targetWidth - this.widths[index]) * 0.18;
      letter.nativeElement.style.fontVariationSettings =
        `"wght" ${this.weights[index]}, "wdth" ${this.widths[index]}`;

      if (Math.abs(targetWeight - this.weights[index]) > 0.6) {
        hasDifference = true;
      }
    });

    this.frame = hasDifference ? window.requestAnimationFrame(this.animateLetters) : undefined;
  };
}
