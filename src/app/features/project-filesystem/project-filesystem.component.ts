import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface TagGroup {
  label: string;
  tags: string[];
}

interface Project {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  tagGroups?: TagGroup[];
  images: string[];
  link: string | null;
  repo: string | null;
}

@Component({
  selector: 'app-project-filesystem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-filesystem.component.html',
  styleUrls: ['./project-filesystem.component.scss']
})
export class ProjectFilesystemComponent {

  projects: Project[] = [
    {
      num: '01',
      title: 'Safe Dog',
      desc: 'Página de cuidadores de perros. Mi primer proyecto web, construido con tecnologías fundamentales del frontend.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Fetch API', 'JSON', 'Font Awesome', 'Google Fonts'],
      images: ['/assets/images/safedog.png'],
      link: 'https://safe-dog-proyect.vercel.app/',
      repo: null
    },
    {
      num: '02',
      title: 'App del Clima',
      desc: 'Aplicación meteorológica con fondo animado que cambia según el clima. Incluye pronóstico de 5 días, comparación de ciudades y caché con TTL. Versión web y CLI en Python con 46 casos de prueba.',
      tags: [],
      tagGroups: [
        { label: 'Frontend', tags: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API', 'anime.js'] },
        { label: 'Backend', tags: ['Python', 'pytest', 'Open-Meteo'] }
      ],
      images: ['/assets/images/appClima.png'],
      link: 'https://app-clima-weld-kappa.vercel.app/',
      repo: null
    },
    {
      num: '03',
      title: 'Prociq',
      desc: 'Landing page para empresa de chatbots de WhatsApp. Recepcionista automatizada que agenda, confirma y reagenda citas 24/7. Desplegada con Docker, Nginx y Cloudflare.',
      tags: [],
      tagGroups: [
        { label: 'Frontend', tags: ['HTML5', 'CSS3', 'JavaScript'] },
        { label: 'Backend', tags: ['Node.js', 'Express.js', 'Docker', 'Nginx', 'Cloudflare'] }
      ],
      images: ['/assets/images/landingpage.png'],
      link: 'https://prociq.mx/',
      repo: null
    },
    {
      num: '04',
      title: 'Automatización con n8n',
      desc: 'Workflow de automatización para chatbot de WhatsApp con IA. Transcribe audios con Whisper, procesa pedidos con un AI Agent y gestiona catálogo, direcciones y geocodificación mediante tools personalizadas.',
      tags: ['n8n', 'OpenAI', 'Whisper', 'WhatsApp API', 'AI Agent', 'Webhook', 'Window Buffer Memory'],
      images: ['/assets/images/n8n.png'],
      link: null,
      repo: null
    },
    {
      num: '05',
      title: 'Ticket Agent',
      desc: 'Agente Python que escucha eventos Socket.IO e imprime tickets en impresoras térmicas ESC/POS. Panel de control empaquetado como app de escritorio Windows con Electron e instalador NSIS.',
      tags: [],
      tagGroups: [
        { label: 'Backend', tags: ['Python', 'Socket.IO', 'ESC/POS', 'PyInstaller', 'Pydantic'] },
        { label: 'Desktop', tags: ['Electron', 'electron-builder', 'NSIS', 'GitHub Releases'] }
      ],
      images: [
        '/assets/images/ticket1.png',
        '/assets/images/ticket2.png',
        '/assets/images/ticket3.png',
        '/assets/images/ticket4.png'
      ],
      link: null,
      repo: null
    },
    {
      num: '06',
      title: 'Prociq Solutions',
      desc: 'Plataforma SaaS empresarial con arquitectura de microservicios (5 servicios). Incluye Chat Center, MES, sistema de citas, WhatsApp Gateway y dashboards en tiempo real.',
      tags: [],
      tagGroups: [
        { label: 'Frontend', tags: ['Angular 21', 'TypeScript', 'Tailwind CSS', 'Angular Material', 'Chart.js', 'Socket.IO Client', 'RxJS'] },
        { label: 'Backend', tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM', 'Redis', 'RabbitMQ', 'Socket.IO', 'AWS S3', 'Passport JWT'] },
        { label: 'Infra', tags: ['Docker', 'Traefik', 'Nginx', 'GitHub Actions'] }
      ],
      images: ['/assets/images/prociq1.png', '/assets/images/prociq2.png'],
      link: null,
      repo: null
    },
  ];

  activeIndex: { [key: number]: number } = {};

  constructor(private router: Router) {
    this.projects.forEach((_, i) => this.activeIndex[i] = 0);
  }

  prev(projectIndex: number): void {
    const len = this.projects[projectIndex].images.length;
    this.activeIndex[projectIndex] = (this.activeIndex[projectIndex] - 1 + len) % len;
  }

  next(projectIndex: number): void {
    const len = this.projects[projectIndex].images.length;
    this.activeIndex[projectIndex] = (this.activeIndex[projectIndex] + 1) % len;
  }

  goBack(): void {
    this.router.navigate(['/desarrollador']);
  }
}
