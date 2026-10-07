import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { ViewTransitionOriginService } from '../../core/view-transition-origin.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(pointerdown)': 'capturePointerOrigin($event)',
    '(keydown.enter)': 'captureKeyboardOrigin($event)',
  },
})
export class Nav {
  protected readonly theme = inject(ThemeService);
  private readonly viewTransitionOrigin = inject(ViewTransitionOriginService);

  protected capturePointerOrigin(event: Event): void {
    this.captureOriginFromTarget(event.target);
  }

  protected captureKeyboardOrigin(event: Event): void {
    this.captureOriginFromTarget(event.target);
  }

  private captureOriginFromTarget(target: EventTarget | null): void {
    if (!(target instanceof Element)) {
      return;
    }

    const link = target.closest<HTMLAnchorElement>('a[routerLink]');
    if (!link) {
      return;
    }

    const bounds = link.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    this.viewTransitionOrigin.capture(x, y);
  }
}
