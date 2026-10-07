import { Routes } from '@angular/router';
import { Contact } from './pages/contact/contact';
import { Experience } from './pages/experience/experience';
import { Home } from './pages/home/home';
import { Projects } from './pages/projects/projects';

export const routes: Routes = [
  { path: '', component: Home, title: 'Accueil' },
  { path: 'experiences-etudes', component: Experience, title: 'Expériences et études' },
  { path: 'projets', component: Projects, title: 'Projets personnels' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: '**', redirectTo: '' },
];
