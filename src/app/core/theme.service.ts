import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

type ThemePreference = 'system' | 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly preference = signal<ThemePreference>('system');
  private readonly systemPrefersDark = signal(false);
  readonly isDark = computed(() =>
    this.preference() === 'system' ? this.systemPrefersDark() : this.preference() === 'dark',
  );

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedPreference = window.localStorage.getItem('portfolio-theme');
      if (savedPreference === 'light' || savedPreference === 'dark') {
        this.preference.set(savedPreference);
      }

      if (typeof window.matchMedia === 'function') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.systemPrefersDark.set(mediaQuery.matches);
        const updateSystemPreference = (event: MediaQueryListEvent): void => {
          this.systemPrefersDark.set(event.matches);
        };
        mediaQuery.addEventListener('change', updateSystemPreference);
        inject(DestroyRef).onDestroy(() => {
          mediaQuery.removeEventListener('change', updateSystemPreference);
        });
      }
    }

    effect(() => {
      const preference = this.preference();
      if (preference === 'system') {
        this.document.documentElement.removeAttribute('data-theme');
      } else {
        this.document.documentElement.dataset['theme'] = preference;
      }
    });
  }

  toggle(): void {
    const preference = this.isDark() ? 'light' : 'dark';
    this.preference.set(preference);
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('portfolio-theme', preference);
    }
  }
}
