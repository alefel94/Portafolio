import { Routes } from '@angular/router';
import { HeroSystemComponent } from './features/hero-system/hero-system.component';
import { ProjectFilesystemComponent } from './features/project-filesystem/project-filesystem.component';

export const routes: Routes = [
  { path: '', component: HeroSystemComponent },
  { path: 'proyectos', component: ProjectFilesystemComponent },
];
