import { ChangeDetectionStrategy, Component } from '@angular/core';
import { projects } from '../../../data/profile';
import { PageHeading } from '../../components/page-heading/page-heading';
import { ProjectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [PageHeading, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = projects;
}
