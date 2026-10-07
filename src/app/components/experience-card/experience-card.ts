import { ChangeDetectionStrategy, Component, DestroyRef, input, signal } from '@angular/core';
import { Experience } from '../../../data/profile';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.entered]': 'entered()',
    '[attr.data-cursor-label]': '"Ouvrir"',
  },
})
export class ExperienceCard {
  private static readonly instances = new Set<ExperienceCard>();

  readonly experience = input.required<Experience>();
  readonly entered = input(false);
  protected readonly expanded = signal(false);

  constructor(destroyRef: DestroyRef) {
    ExperienceCard.instances.add(this);
    destroyRef.onDestroy(() => ExperienceCard.instances.delete(this));
  }

  protected toggle(): void {
    const shouldExpand = !this.expanded();
    if (shouldExpand) {
      for (const instance of ExperienceCard.instances) {
        if (instance !== this) instance.expanded.set(false);
      }
    }
    this.expanded.set(shouldExpand);
  }
}
