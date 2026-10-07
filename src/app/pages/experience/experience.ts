import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChildren,
} from '@angular/core';
import { education, experiences, languages, skills } from '../../../data/profile';
import { EducationCard } from '../../components/education-card/education-card';
import { ExperienceCard } from '../../components/experience-card/experience-card';
import { PageHeading } from '../../components/page-heading/page-heading';
import { SkillGroup } from '../../components/skill-group/skill-group';

@Component({
  selector: 'app-experience',
  imports: [EducationCard, ExperienceCard, PageHeading, SkillGroup],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class Experience implements AfterViewInit {
  protected readonly experiences = experiences;
  protected readonly education = education;
  protected readonly languages = languages;
  protected readonly skills = skills;
  protected readonly enteredItems = signal<ReadonlySet<number>>(new Set());

  private readonly platformId = inject(PLATFORM_ID);
  private readonly timeline = viewChildren(ExperienceCard, { read: ElementRef });

  ngAfterViewInit(): void {
    this.onWindowScroll();
  }

  protected onWindowScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const timeline = this.timeline();
    if (timeline.length === 0) {
      return;
    }

    const container = timeline[0].nativeElement.parentElement;
    if (!container) {
      return;
    }

    const bounds = container.getBoundingClientRect();
    const progress = Math.min(
      1,
      Math.max(0, (window.innerHeight * 0.6 - bounds.top) / bounds.height),
    );
    container.style.setProperty('--p', String(progress));

    let changed = false;
    const visibleItems = new Set(this.enteredItems());
    timeline.forEach((item, index) => {
      if (
        item.nativeElement.getBoundingClientRect().top < window.innerHeight * 0.6 &&
        !visibleItems.has(index)
      ) {
        visibleItems.add(index);
        changed = true;
      }
    });
    if (changed) {
      this.enteredItems.set(visibleItems);
    }
  }
}
