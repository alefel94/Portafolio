# 🚀 CYBER PORTFOLIO - Full Stack Developer

> Portafolio futurista tipo sistema terminal con estética cyberpunk y efectos neón

![Status](https://img.shields.io/badge/STATUS-ONLINE-00ff9c?style=for-the-badge&logo=statuspage&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ⚡ Características

- 🎨 **Diseño Futurista**: Interfaz tipo sistema terminal con efectos neón y animaciones cyberpunk
- 💻 **Componentes Reutilizables**: SystemBadge, NeonButton, PanelBox y más
- 🎭 **Animaciones Avanzadas**: Efectos de glitch, typing, scanlines y glow
- 📱 **Responsive Design**: Diseño adaptable a todos los dispositivos
- 🔥 **Angular 17**: Arquitectura standalone components con TypeScript
- 🎯 **Mock Data**: Datos de ejemplo para proyectos, skills y experiencia

## 🛠️ Stack Tecnológico

### Frontend
- **Angular 17** - Framework principal
- **TypeScript** - Lenguaje de programación
- **Tailwind CSS** - Framework de estilos
- **SCSS** - Preprocesador CSS para efectos avanzados
- **RxJS** - Programación reactiva

### Estructura
```
cyber-portfolio/
├── src/
│   ├── app/
│   │   ├── core/              # Servicios y modelos base
│   │   │   ├── models/        # Interfaces de datos
│   │   │   └── services/      # Servicios de datos
│   │   ├── shared/            # Componentes reutilizables
│   │   │   └── components/    # SystemBadge, NeonButton, PanelBox
│   │   ├── features/          # Secciones del portafolio
│   │   │   └── hero-system/   # Sección Hero principal
│   │   └── layout/            # Layouts principales
│   ├── assets/
│   │   └── mock-data/         # Datos de ejemplo (JSON)
│   └── styles/                # Estilos globales SCSS
└── ...
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
cd cyber-portfolio
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm start
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

### Comandos disponibles

```bash
npm start          # Inicia servidor de desarrollo
npm run build      # Build de producción
npm run watch      # Build en modo watch
npm test           # Ejecuta tests
```

## 🎨 Personalización

### Modificar colores neón

Edita el archivo `src/styles/_variables.scss`:

```scss
$neon-blue: #00f0ff;
$neon-purple: #7a00ff;
$neon-green: #00ff9c;
$neon-pink: #ff00e5;
```

### Modificar configuración de Tailwind

Edita el archivo `tailwind.config.js`:

```javascript
colors: {
  'cyber': {
    'neon-blue': '#00f0ff',
    // ... tus colores personalizados
  }
}
```

### Modificar datos mock

Los archivos JSON están en `src/assets/mock-data/`:
- `projects.json` - Proyectos
- `skills.json` - Habilidades
- `experience.json` - Experiencia laboral

## 🧩 Componentes Principales

### HeroSystemComponent
Sección principal con diseño tipo terminal, incluye:
- Título con efecto glitch
- Estado del sistema (ONLINE/OFFLINE)
- Panel de código con syntax highlighting
- Métricas del sistema (CPU, Memory, Latency)
- Badges de tecnologías

### Componentes Shared

#### SystemBadge
```html
<app-system-badge text="REACT_V18" color="blue"></app-system-badge>
```

#### NeonButton
```html
<app-neon-button
  text="EXPLORE"
  variant="primary"
  [showArrow]="true"
  (clicked)="onButtonClick()">
</app-neon-button>
```

#### PanelBox
```html
<app-panel-box title="System Panel" status="online">
  <!-- Contenido -->
</app-panel-box>
```

## 📦 Próximas Secciones a Implementar

- [ ] **ProjectFilesystemComponent** - Proyectos como sistema de archivos
- [ ] **SkillsSystemComponent** - Habilidades como módulos del sistema
- [ ] **ExperienceLogsComponent** - Experiencia como logs del sistema
- [ ] **ContactTransmissionComponent** - Formulario tipo transmisión segura

## 🎯 Roadmap

- [ ] Agregar modo oscuro/claro
- [ ] Implementar animaciones con GSAP
- [ ] Añadir partículas de fondo con tsParticles
- [ ] Integrar backend real (NestJS)
- [ ] Añadir sistema de blog
- [ ] Implementar internacionalización (i18n)

## 📄 Licencia

MIT License - Siéntete libre de usar este proyecto para tu portafolio personal

## 👤 Autor

**Full Stack Developer**
- Portfolio: [En construcción]
- GitHub: [@tuusuario](https://github.com/tuusuario)
- LinkedIn: [Tu perfil](https://linkedin.com/in/tuperfil)

---

⚡ **SYSTEM STATUS: ONLINE** ⚡

🚀 Construido con Angular, TypeScript y mucho café
