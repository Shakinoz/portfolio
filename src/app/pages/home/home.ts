import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { profile } from '../../../data/profile';
import { HeroTitle } from '../../components/hero-title/hero-title';
import { ParallaxShapes } from '../../components/parallax-shapes/parallax-shapes';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-home',
  imports: [HeroTitle, MagneticDirective, ParallaxShapes, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly profile = profile;
}
