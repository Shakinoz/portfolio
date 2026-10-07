import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { profile } from '../../../data/profile';
import { ContactLink } from '../../components/contact-link/contact-link';
import { PageHeading } from '../../components/page-heading/page-heading';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-contact',
  imports: [ContactLink, MagneticDirective, PageHeading, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  protected readonly profile = profile;
  protected readonly contactLinks = [
    { label: 'E-mail', href: `mailto:${profile.email}`, external: false },
    { label: 'Téléphone', href: `tel:${profile.phone}`, external: false },
    { label: 'LinkedIn', href: profile.linkedin, external: true },
    { label: 'GitHub', href: profile.github, external: true },
  ];
  protected readonly sending = signal(false);
  protected readonly contactForm = inject(NonNullableFormBuilder).group({
    nom: ['', Validators.required],
    msg: ['', Validators.required],
  });

  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly submitButton = viewChild<ElementRef<HTMLButtonElement>>('submitButton');
  private mailtoTimer: number | undefined;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.mailtoTimer !== undefined && isPlatformBrowser(this.platformId)) {
        window.clearTimeout(this.mailtoTimer);
      }
    });
  }

  protected onSubmit(): void {
    if (this.contactForm.invalid || this.sending() || !isPlatformBrowser(this.platformId)) {
      return;
    }

    const { nom, msg } = this.contactForm.getRawValue();
    const button = this.submitButton()?.nativeElement;

    this.sending.set(true);
    if (button) {
      this.launchConfetti(button);
    }

    const subject = encodeURIComponent(`Portfolio – ${nom}`);
    const body = encodeURIComponent(msg);
    this.mailtoTimer = window.setTimeout(() => {
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      this.sending.set(false);
    }, 900);
  }

  private launchConfetti(button: HTMLButtonElement): void {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof button.animate !== 'function'
    ) {
      return;
    }

    const bounds = button.getBoundingClientRect();
    const colors = ['#0e6ba8', '#8cd3f0', '#12483a', '#ffd9a0'];
    const shapes = ['50%', '50% 0', '8px', '50% 50% 0 50%'];

    for (let index = 0; index < 36; index += 1) {
      const particle = document.createElement('i');
      const size = 22 + Math.random() * 14;
      const angle = Math.random() * Math.PI * 2;
      const distance = 120 + Math.random() * 180;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const gravity = 20 + Math.random() * 70;

      particle.className = 'confetti';
      particle.setAttribute('aria-hidden', 'true');
      particle.style.left = `${bounds.left + bounds.width / 2}px`;
      particle.style.top = `${bounds.top + bounds.height / 2}px`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = colors[index % colors.length];
      particle.style.borderRadius = shapes[index % shapes.length];
      document.body.append(particle);

      const animation = particle.animate(
        [
          { transform: 'translate(0, 0) rotate(0)', opacity: 0.7 },
          {
            transform: `translate(${x}px, ${y}px) rotate(${Math.random() * 720}deg)`,
            opacity: 0.7,
            offset: 0.72,
          },
          {
            transform: `translate(${x}px, ${y + gravity}px) rotate(${Math.random() * 1080}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1300 + Math.random() * 600,
          easing: 'cubic-bezier(.2,.7,.3,1)',
        },
      );
      animation.onfinish = () => particle.remove();
    }
  }
}
