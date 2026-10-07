import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

type ViewTransitionOrigin = {
  x: number;
  y: number;
};

@Injectable({ providedIn: 'root' })
export class ViewTransitionOriginService {
  private readonly platformId = inject(PLATFORM_ID);
  private pendingOrigin: ViewTransitionOrigin | undefined;
  private activeTransition: ViewTransition | undefined;

  capture(x: number, y: number): void {
    this.activeTransition?.skipTransition();
    this.pendingOrigin = { x, y };
  }

  applyToNextTransition(transition: ViewTransition): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const root = document.documentElement;
    const previousTransition = this.activeTransition;
    previousTransition?.skipTransition();

    const { x, y } = this.pendingOrigin ?? {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    this.pendingOrigin = undefined;
    this.activeTransition = transition;

    root.style.setProperty('--view-transition-x', `${x}px`);
    root.style.setProperty('--view-transition-y', `${y}px`);

    const clearOrigin = (): void => {
      if (this.activeTransition !== transition) {
        return;
      }

      this.activeTransition = undefined;
      root.style.removeProperty('--view-transition-x');
      root.style.removeProperty('--view-transition-y');
    };

    transition.finished.then(clearOrigin, clearOrigin);
  }
}
