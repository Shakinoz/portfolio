import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  PLATFORM_ID,
} from '@angular/core';
import { Project } from '../../../data/profile';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-project-card',
  imports: [MagneticDirective],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(pointermove)': 'onPointerMove($event)',
    '(pointerleave)': 'resetTilt($event)',
  },
})
export class ProjectCard {
  readonly project = input.required<Project>();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private animationFrame: number | undefined;
  private targetRotateX = 0;
  private targetRotateY = 0;
  private rotateX = 0;
  private rotateY = 0;
  private gradientX = 50;
  private gradientY = 50;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.animationFrame !== undefined && isPlatformBrowser(this.platformId)) {
        window.cancelAnimationFrame(this.animationFrame);
      }
    });
  }

  protected get actionLabel(): string {
    return this.project().name === 'Break the Bank' ? 'Jouer' : 'Ouvrir le site';
  }

  protected onPointerMove(event: PointerEvent): void {
    if (
      !isPlatformBrowser(this.platformId) ||
      event.pointerType !== 'mouse' ||
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !(event.currentTarget instanceof HTMLElement)
    ) {
      return;
    }

    const host = event.currentTarget;
    const bounds = host.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0) {
      return;
    }

    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    this.targetRotateY = (x - 0.5) * 16;
    this.targetRotateX = (0.5 - y) * 16;
    this.gradientX = x * 100;
    this.gradientY = y * 100;
    this.scheduleAnimation(host);
  }

  protected resetTilt(event: PointerEvent): void {
    if (!(event.currentTarget instanceof HTMLElement)) {
      return;
    }

    this.targetRotateX = 0;
    this.targetRotateY = 0;
    this.gradientX = 50;
    this.gradientY = 50;
    this.scheduleAnimation(event.currentTarget);
  }

  private scheduleAnimation(host: HTMLElement): void {
    if (this.animationFrame !== undefined) {
      return;
    }

    this.animationFrame = window.requestAnimationFrame(() => this.animateTilt(host));
  }

  private animateTilt(host: HTMLElement): void {
    this.rotateX += (this.targetRotateX - this.rotateX) * 0.18;
    this.rotateY += (this.targetRotateY - this.rotateY) * 0.18;
    host.style.setProperty('--rx', `${this.rotateX}deg`);
    host.style.setProperty('--ry', `${this.rotateY}deg`);
    host.style.setProperty('--gx', `${this.gradientX}%`);
    host.style.setProperty('--gy', `${this.gradientY}%`);

    const remainingX = this.targetRotateX - this.rotateX;
    const remainingY = this.targetRotateY - this.rotateY;
    if (Math.abs(remainingX) > 0.02 || Math.abs(remainingY) > 0.02) {
      this.animationFrame = window.requestAnimationFrame(() => this.animateTilt(host));
      return;
    }

    this.rotateX = this.targetRotateX;
    this.rotateY = this.targetRotateY;
    host.style.setProperty('--rx', `${this.rotateX}deg`);
    host.style.setProperty('--ry', `${this.rotateY}deg`);
    this.animationFrame = undefined;
  }
}
