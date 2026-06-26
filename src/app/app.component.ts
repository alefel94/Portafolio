import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeSwitcherComponent } from './shared/components/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeSwitcherComponent],
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
