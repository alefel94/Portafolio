import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'desarrollador',
    loadComponent: () => import('./features/hero-system/hero-system.component').then(m => m.HeroSystemComponent)
  },
  {
    path: 'proyectos',
    loadComponent: () => import('./features/project-filesystem/project-filesystem.component').then(m => m.ProjectFilesystemComponent)
  },
];
