import { Component } from '@angular/core';
import { ParallaxSectionComponent } from '@shared/components/parallax-section/parallax-section.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ParallaxSectionComponent],
  template: `<app-parallax-section></app-parallax-section>`
})
export class LandingComponent {}
