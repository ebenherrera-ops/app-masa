# Masa+ — PWA para ganar masa muscular

HTML/CSS/JS puro, sin build. Datos en `localStorage`. Funciona offline (service worker + manifest).

## Abrir
```bash
cd app-masa && python3 -m http.server 8765
```
Abre http://localhost:8765 . En el celular (misma red WiFi): http://IP-DEL-PC:8765 y "Agregar a pantalla de inicio"
(nota: el service worker/instalación en el celular requiere HTTPS; para eso usa p.ej. GitHub Pages o Netlify).
Abrir `index.html` con doble clic funciona, pero sin modo offline.

## Archivos
- `index.html`, `style.css`, `app.js` (lógica), `data.js` (alimentos USDA aprox. y rutinas), `sw.js`, `manifest.json`, `icon.svg`.
- Datos: Perfil → Exportar/Importar JSON (haz copias de seguridad).

Aviso: las cifras (Mifflin-St Jeor, proteína ~1,8 g/kg) son referencias, no consejo médico.

## Seguir mejorando con OpenCode
Abre la carpeta con `opencode` y prueba prompts como:
- "Lee app.js y data.js. Agrega edición de rutinas desde la UI (crear/renombrar rutinas y ejercicios) guardadas en localStorage."
- "Agrega un historial de comidas por día con navegación ← → de fechas y totales semanales."
- "Haz que los rangos de reps e incremento de peso sean configurables por ejercicio."
- "Agrega un temporizador de descanso entre series con vibración."
- "Genera íconos PNG 192 y 512 para el manifest y verifica que la PWA sea instalable (Lighthouse)."
- "Agrega pruebas con Playwright que registren comida, peso y series y verifiquen que no hay errores en consola."
- "Muestra la tendencia de peso semanal (media móvil 7 días) y avisa si subes más de 0,5 kg/semana."

## Publicación (GitHub Pages)
El workflow `.github/workflows/pages.yml` publica la app en cada push a `main`. Los íconos PNG se guardan como
`icon-*.png.b64` (texto) y el workflow los decodifica. Activación única: en el repo, Settings → Pages →
Source: **GitHub Actions**, y luego Actions → "Publicar en GitHub Pages" → Run workflow.
