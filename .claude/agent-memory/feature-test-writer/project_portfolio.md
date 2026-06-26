---
name: project-portfolio
description: Configuración y stack tecnológico del proyecto Portafolio (cyber-portfolio)
metadata:
  type: project
---

Proyecto Angular 17 standalone con Tailwind CSS 3, GSAP 3 y SCSS. Nombre del paquete: `cyber-portfolio`.

**Stack**: Angular 17 (standalone components, no NgModules), Tailwind CSS 3, GSAP + ScrollTrigger, SCSS (con alias `@use`/`@import`), WebGL2 (shader animation), Node.js `serve.js` como servidor de producción manual.

**Por qué:** Es un portafolio personal de Felipe Mejía (Full Stack Developer, Guadalajara MX). Aún en desarrollo activo — varios features incompletos.

**Estructura de rutas activas:**
- `/` → LandingComponent → ParallaxSectionComponent
- `/desarrollador` → HeroSystemComponent
- `/proyectos` → ProjectFilesystemComponent

**Directorios vacíos (features incompletos):** `contact-transmission/`, `experience-logs/`, `skills-system/`

**No existen tests** — no hay configuración de Karma/Jasmine funcional más allá del `ng test` default de Angular CLI.

**Cómo aplicar:** Antes de escribir tests, confirmar que el usuario quiera incluir las secciones incompletas o solo las existentes.
