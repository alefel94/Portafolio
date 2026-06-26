---
name: feedback-decisiones-producto
description: Qué tipo de hallazgos de QA requieren decisión del usuario en vez de corrección automática en este portafolio
metadata:
  type: feedback
---

En este proyecto, varios hallazgos de QA no son bugs sino decisiones de producto/diseño pendientes. No resolverlos unilateralmente; documentarlos en el reporte final para que el usuario decida.

Casos identificados hasta ahora:
- **Componentes shared sin uso pero con diseño visual completo** (neon-button, panel-box, system-badge): conectarlos implica rediseñar el HTML/CSS de las vistas existentes (reemplazar markup propio por estos componentes) — es un cambio de diseño, no un fix.
- **Servicios core (ProjectService/ExperienceService/SkillService) con mock data genérico vs. datos reales hardcodeados en el componente**: ver [[project-stack]]. No conectar el servicio sin confirmar que los datos del JSON van a ser reemplazados por contenido real primero.
- **Tailwind configurado pero casi sin uso real** (solo las 3 directivas `@tailwind base/components/utilities` en `src/styles/theme.scss`, cero `@apply` o clases utility usadas en el resto del código): decidir si se mantiene la dependencia o se elimina es decisión arquitectónica, no bug fix.
- **Mock data ficticio en JSON** (experience.json con "TechCorp Solutions", projects.json con "CyberCommerce Platform" y URLs `.demo`): nunca inventar reemplazo "real" — solo señalar que es placeholder y debe ser reemplazado por el usuario con datos verídicos antes de desplegar.

**Why**: el usuario (qa-report-fixer agent definition) pidió explícitamente no inventar datos de producto y dejar estas decisiones documentadas en vez de resolverlas arbitrariamente.

**How to apply**: al ver un hallazgo de "código muerto" o "servicio no conectado", primero verificar si hay una implementación real alternativa ya en uso (hardcoded) antes de asumir que conectar/eliminar es la solución correcta.
