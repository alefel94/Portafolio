import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { HeroSystemComponent } from './features/hero-system/hero-system.component';
import { ProjectFilesystemComponent } from './features/project-filesystem/project-filesystem.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'desarrollador', component: HeroSystemComponent },
  { path: 'proyectos', component: ProjectFilesystemComponent },
];
