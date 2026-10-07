import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Education } from '../../../data/profile';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.html',
  styleUrl: './education-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationCard {
  readonly education = input.required<Education>();
}
