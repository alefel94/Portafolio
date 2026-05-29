import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }))
  ]
})
.then(() => console.log('✅ Bootstrap completado exitosamente'))
.catch(err => {
  console.error('❌ Error en bootstrap:', err);
  console.error('Stack trace:', err.stack);
});
