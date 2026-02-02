import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SystemBadgeComponent } from '../../shared/components/system-badge/system-badge.component';
import { NeonButtonComponent } from '../../shared/components/neon-button/neon-button.component';
import { PanelBoxComponent } from '../../shared/components/panel-box/panel-box.component';

@Component({
  selector: 'app-hero-system',
  standalone: true,
  imports: [CommonModule, SystemBadgeComponent, NeonButtonComponent, PanelBoxComponent],
  templateUrl: './hero-system.component.html',
  styleUrls: ['./hero-system.component.scss']
})
export class HeroSystemComponent implements OnInit {
  // Estado del sistema
  systemStatus = {
    status: 'ONLINE',
    role: 'FULL_STACK_ENGINEER',
    location: 'GUADALAJARA_MX'
  };

  // Mis Tecnologías Principales
  mainSkills = [
    { name: 'HTML', color: 'orange' as const },
    { name: 'CSS', color: 'blue' as const },
    { name: 'JavaScript (ES6+)', color: 'orange' as const },
    { name: 'PHP', color: 'purple' as const },
    { name: 'Java', color: 'green' as const },
    { name: 'MySQL', color: 'blue' as const },
    { name: 'Angular', color: 'pink' as const },
    { name: 'React', color: 'blue' as const },
    { name: 'Bootstrap', color: 'purple' as const },
    { name: 'Spring Boot', color: 'green' as const },
    { name: 'APIs REST', color: 'green' as const },
    { name: 'Postman', color: 'orange' as const },
    { name: 'Docker', color: 'blue' as const },
    { name: 'Apache', color: 'purple' as const },
    { name: 'cPanel', color: 'pink' as const },
    { name: 'Git', color: 'purple' as const },
    { name: 'GitHub', color: 'purple' as const },
    { name: 'Figma', color: 'pink' as const },
    { name: 'SCRUM', color: 'green' as const }
  ];

  // Descripción con efecto de typing
  description = 'Desarrollador web enfocado en frontend y backend, con experiencia en e-commerce, React, Angular Php, Java y SpringBoot. Trabajo ágil con SCRUM, Git y bases de datos, destacando por adaptabilidad y resolución de problemas.';
  typedDescription = '';
  typingIndex = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('✅ HeroSystemComponent inicializado');
    console.log('Sistema:', this.systemStatus);
    this.startTypingEffect();
  }

  private startTypingEffect(): void {
    if (this.typingIndex < this.description.length) {
      setTimeout(() => {
        this.typedDescription += this.description[this.typingIndex];
        this.typingIndex++;
        this.startTypingEffect();
      }, 30);
    }
  }

  onExploreClick(): void {
    this.router.navigate(['/proyectos']);
  }
}
