---
name: project-stack
description: Stack y arquitectura de este portafolio (Angular 17 standalone) — qué tecnologías respetar al corregir hallazgos de QA
metadata:
  type: project
---

Proyecto: portafolio personal "cyber-portfolio" de Felipe Mejía. Stack: Angular 17 (standalone components, sin NgModules), Tailwind CSS 3, GSAP + ScrollTrigger, SCSS por componente, WebGL2 (shader-animation), servidor Node manual (`serve.js`, sin Express). Sin tests configurados (`ng test` existe en package.json pero no hay specs reales verificados).

Estructura: `src/app/features/*` (landing, hero-system, project-filesystem — son las únicas features con UI real), `src/app/shared/components/*` (neon-button, panel-box, system-badge, parallax-section, shader-animation, theme-switcher), `src/app/core/{services,models}` con servicios que leen `src/assets/mock-data/*.json`.

**Hallazgo recurrente importante**: existe un desfase entre arquitectura "preparada" (ProjectService/ExperienceService/SkillService + JSON mocks bien escritos con RxJS) y la implementación real, que tiene los datos verídicos del usuario hardcodeados directamente en `project-filesystem.component.ts` (proyectos reales: Safe Dog, App del Clima, Prociq, etc.). Los JSON mock (`projects.json`, `experience.json`, `skills.json`) son contenido ficticio de scaffolding ("TechCorp Solutions", "CyberCommerce Platform", URLs `.demo`) — NUNCA usar este mock como fuente de verdad ni conectarlo a las vistas sin confirmación explícita del usuario, sería una regresión (reemplazar datos reales por ficticios).

**How to apply**: antes de "conectar" un servicio no usado, comparar contra cualquier dato hardcodeado equivalente en el componente. Si el componente ya tiene datos reales, documentar la decisión para el usuario en vez de conectar el servicio automáticamente.

Ver también [[feedback-decisiones-producto]] y [[feedback-no-console-log]].
