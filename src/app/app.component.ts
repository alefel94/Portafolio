import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSystemComponent } from './features/hero-system/hero-system.component';
import { ProjectFilesystemComponent } from './features/project-filesystem/project-filesystem.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeroSystemComponent, ProjectFilesystemComponent, RouterModule],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      position: relative;

      &:not(:has(app-project-filesystem)) {
        height: 100vh;
        overflow: hidden;

        @media (max-width: 768px) {
          height: auto;
          overflow-y: auto;
        }
      }
    }
  `]
})
export class AppComponent {
  title = 'cyber-portfolio';

  constructor() {
    console.log('✅ AppComponent inicializado correctamente');
  }

  ngOnInit() {
    console.log('✅ AppComponent ngOnInit ejecutado');
  }
}
