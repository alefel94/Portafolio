import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-system.component.html',
  styleUrls: ['./hero-system.component.scss']
})
export class HeroSystemComponent {

  mainSkills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Bootstrap',
    'Java', 'Spring Boot', 'PHP', 'MySQL', 'APIs REST', 'Docker',
    'Git', 'GitHub', 'Postman', 'Apache', 'cPanel',
    'Claude AI', 'ChatGPT', 'GitHub Copilot', 'Python', 'n8n', 'Figma', 'Scrum'
  ];

  constructor(private router: Router) {}

  onExploreClick(): void {
    this.router.navigate(['/proyectos']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
