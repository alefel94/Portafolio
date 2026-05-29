import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSystemComponent } from './features/hero-system/hero-system.component';
import { ProjectFilesystemComponent } from './features/project-filesystem/project-filesystem.component';
import { RouterModule } from '@angular/router';
import { ThemeSwitcherComponent } from './shared/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroSystemComponent, ProjectFilesystemComponent, RouterModule, ThemeSwitcherComponent],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
      <app-theme-switcher></app-theme-switcher>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      position: relative;
    }
  `]
})
export class AppComponent {
  title = 'cyber-portfolio';
}
