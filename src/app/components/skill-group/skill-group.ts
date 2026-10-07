import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkillCategory } from '../../../data/profile';

@Component({
  selector: 'app-skill-group',
  templateUrl: './skill-group.html',
  styleUrl: './skill-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillGroup {
  readonly category = input.required<SkillCategory>();
}
