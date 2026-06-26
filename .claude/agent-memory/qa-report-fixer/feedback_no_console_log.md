---
name: feedback-no-console-log
description: Regla explícita del CLAUDE.md de este proyecto sobre console.log — no generar logging indiscriminado
metadata:
  type: feedback
---

No generar `console.log` para todo; solo añadir logging cuando algo realmente no funciona y se necesita para depurar. Esta regla está en el CLAUDE.md del proyecto (`C:\Users\felip\Desktop\Portafolio\CLAUDE.md`) como instrucción que sobreescribe comportamiento por defecto.

**Why**: instrucción explícita y repetida del usuario; ya se encontró y eliminó un `console.log` de "éxito" en `src/main.ts` (bootstrap) que no aportaba valor de debugging, solo ruido en producción. El `console.error` en el `.catch()` de bootstrap SÍ se considera justificado (error real, no informativo).

**How to apply**: al corregir hallazgos de QA, distinguir entre logs informativos/de éxito (eliminar) y logs de error en catch/error handlers (mantener, son diagnóstico legítimo). No añadir logs nuevos como parte de un fix salvo que se esté activamente depurando algo que no se entiende.
