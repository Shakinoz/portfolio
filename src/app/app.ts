import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cursor } from './components/cursor/cursor';
import { Nav } from './components/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Cursor, Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
