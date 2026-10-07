import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-contact-link',
  imports: [MagneticDirective],
  templateUrl: './contact-link.html',
  styleUrl: './contact-link.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactLink {
  readonly href = input.required<string>();
  readonly label = input.required<string>();
  readonly external = input(false);
}
