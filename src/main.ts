import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

console.log('🚀 Iniciando bootstrap de Angular...');

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes)
  ]
})
.then(() => console.log('✅ Bootstrap completado exitosamente'))
.catch(err => {
  console.error('❌ Error en bootstrap:', err);
  console.error('Stack trace:', err.stack);
});
