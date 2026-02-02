# 🔍 Guía de Debugging - Cyber Portfolio

## ⚠️ Problema: La página se queda en "Iniciando Sistema..."

He agregado logs de debugging para identificar el problema. Sigue estos pasos:

## 🚀 Paso 1: Iniciar el servidor

```bash
npm start
```

Espera a que aparezca:
```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

## 🌐 Paso 2: Abrir el navegador

1. Abre **Google Chrome** o **Firefox**
2. Ve a: `http://localhost:4200`

## 🔧 Paso 3: Abrir la Consola del Navegador

### En Chrome/Edge:
- Presiona `F12` o `Ctrl + Shift + I` (Windows/Linux)
- Presiona `Cmd + Option + I` (Mac)
- O clic derecho → "Inspeccionar" → pestaña "Console"

### En Firefox:
- Presiona `F12` o `Ctrl + Shift + K`
- O clic derecho → "Inspeccionar elemento" → pestaña "Consola"

## 👀 Paso 4: Buscar mensajes de debugging

En la consola deberías ver estos mensajes si todo funciona:

```
🚀 Iniciando bootstrap de Angular...
✅ Bootstrap completado exitosamente
✅ AppComponent inicializado correctamente
✅ AppComponent ngOnInit ejecutado
✅ HeroSystemComponent inicializado
```

## ❌ Si ves ERRORES en rojo:

### Error común 1: "Cannot find module"
```
Error: Cannot find module '@angular/...'
```

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error común 2: "zone.js is not defined"
```
ReferenceError: Zone is not defined
```

**Solución:**
El polyfills.js no se está cargando. Verifica en la pestaña "Network" que `polyfills.js` se descargue correctamente.

### Error común 3: Archivos no encontrados (404)
Si ves errores 404 en la pestaña "Network":

**Solución:**
```bash
# Limpiar y recompilar
rm -rf dist .angular
npx ng build
npm start
```

## 🐛 Si la consola está vacía (no hay logs):

Esto significa que JavaScript no se está ejecutando. Verifica:

1. **Pestaña Network** (Red):
   - Presiona `Ctrl + R` para recargar
   - Deberías ver archivos cargándose:
     - `main.....js` ✅
     - `polyfills.....js` ✅
     - `styles.....css` ✅
     - `runtime.....js` ✅

2. **Si algún archivo muestra error 404**:
   ```bash
   # Limpiar todo y reconstruir
   rm -rf dist
   npx ng build
   npm start
   ```

## 📸 Captura de pantalla para ayuda

Si nada funciona, toma una captura de pantalla de:
1. La consola del navegador (con los errores)
2. La terminal donde ejecutas `npm start`
3. Envíalas para ayuda específica

## 🔄 Solución de último recurso

Si nada funciona, ejecuta estos comandos en orden:

```bash
# 1. Matar todos los procesos node
taskkill //F //IM node.exe

# 2. Limpiar completamente el proyecto
rm -rf node_modules package-lock.json dist .angular

# 3. Reinstalar todo
npm install

# 4. Compilar en modo desarrollo
npx ng build --configuration development

# 5. Iniciar servidor
npm start
```

## ✅ Verificación rápida

Ejecuta este comando para verificar versiones:

```bash
npx ng version
```

Deberías ver:
- Angular CLI: `17.x.x`
- Node.js: `22.x.x` (o superior a 18)
- TypeScript: `5.4.x`

---

## 📝 Notas adicionales

- El servidor debe estar corriendo en puerto 4200
- Si el puerto está ocupado, usa: `npm start -- --port 4300`
- La primera carga puede tardar 10-15 segundos
- Los logs de debugging están en estos archivos:
  - `src/main.ts` (líneas 7-15)
  - `src/app/app.component.ts` (líneas 40-46)
  - `src/app/features/hero-system/hero-system.component.ts` (líneas 36-39)

---

🆘 **¿Necesitas ayuda?** Comparte la salida de la consola del navegador.
