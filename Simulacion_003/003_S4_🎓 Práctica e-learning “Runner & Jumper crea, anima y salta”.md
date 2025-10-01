# 🎓 Práctica e-learning: **“Runner & Jumper: crea, anima y salta”**

## 🎯 Objetivos

1. Crear y eliminar dinámicamente un `<canvas>` desde JavaScript (DOM).
2. Dibujar un cuadrado y controlar **color**, **tamaño**, **posición X** y **velocidad**.
3. Animar el movimiento lateral con **rebotes** en bordes (requestAnimationFrame).
4. Implementar un **salto con la tecla “X”** usando una física simple (gravedad, impulso, aterrizaje).
5. Encapsular una **mejora** en una **función** y ubicarla correctamente en el flujo de dibujo.

## 🗂 Estructura de archivos

```css
runner-jumper/
├─ index.html     # Estructura + controles
├─ styles.css     # Apariencia general
└─ app.js         # Lógica del canvas, animación y salto con tecla X
```

## 1) `index.html` — interfaz y controles

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Runner & Jumper: crea, anima y salta</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <h1>⬛ Runner & Jumper</h1>
    <p>Crea un lienzo, personaliza tu cuadrado, anímalo y ¡hazlo saltar con la tecla <strong>X</strong>! 🦘</p>
  </header>

  <main>
    <div class="controls">
      <button id="createBtn">➕ Crear</button>
      <button id="deleteBtn" disabled>🗑️ Eliminar</button>

      <label>Color:
        <input type="color" id="color" value="#0d6efd" />
      </label>

      <label>Tamaño:
        <input type="range" id="size" min="20" max="180" value="80" />
        <span id="sizeLabel">80 px</span>
      </label>

      <label>Posición X:
        <input type="range" id="posX" min="0" max="100" value="50" />
        <span id="posXLabel">50%</span>
      </label>

      <label>Velocidad:
        <input type="range" id="speed" min="1" max="10" value="4" />
        <span id="speedLabel">4 px/cuadro</span>
      </label>

      <button id="playBtn" disabled>▶️ Iniciar</button>
      <button id="pauseBtn" disabled>⏸️ Pausar</button>
    </div>

    <div id="host" class="host" aria-live="polite">No hay lienzo creado.</div>

    <section class="help">
      <h2>¿Cómo usar?</h2>
      <ol>
        <li>Presiona <strong>Crear</strong>.</li>
        <li>Ajusta color, tamaño, posición y velocidad.</li>
        <li>Presiona <strong>Iniciar</strong> para animar (rebota en bordes).</li>
        <li>Mientras corre o está quieto, presiona <strong>X</strong> para saltar.</li>
      </ol>
      <p class="hint">Tip: si cambias tamaño/color/posición, el dibujo se actualiza al instante.</p>
    </section>
  </main>

  <footer>
    <small>Hecho con HTML5 + CSS + JS · ¡Explora y experimenta! ✨</small>
  </footer>

  <script src="app.js"></script>
</body>
</html>
```

## 2) `styles.css` — estilos limpios y legibles

```css
:root{
  --line:#e5e7eb;
  --bg:#f8fafc;
  --card:#ffffff;
}
*{ box-sizing: border-box; }

body{
  font-family: system-ui, sans-serif;
  background: var(--bg);
  margin:0; color:#111827;
}
header{ text-align:center; padding:16px 12px; }
main{ max-width:900px; margin:0 auto; padding:12px; }

.controls{
  display:flex; gap:12px; flex-wrap:wrap;
  background:var(--card); border:1px solid var(--line);
  border-radius:12px; padding:12px;
}
.controls button{
  padding:8px 12px; border-radius:10px; cursor:pointer;
  border:1px solid var(--line); background:#fff;
}
.controls button:disabled{ opacity:.5; cursor:not-allowed; }

.host{
  margin-top:12px; min-height:380px;
  display:flex; align-items:center; justify-content:center;
  border:1px dashed var(--line); border-radius:12px;
  color:#6b7280; background:#fff; text-align:center;
}

canvas{
  border:1px solid var(--line);
  border-radius:12px;
  display:block;
  background:#fff; /* Puedes cambiar por una imagen de fondo si quieres */
}

.help{ margin-top:16px; background:#fff; border:1px solid var(--line); border-radius:12px; padding:12px; }
.hint{ color:#6b7280; font-style:italic; }
```

## 3) `app.js` — lógica completa, animación y salto con “X”

```javascript
/**
 * Runner & Jumper — Lógica principal
 * - Crea/Elimina el canvas bajo demanda.
 * - Dibuja un cuadrado personalizable (color y tamaño).
 * - Mueve lateralmente con límites y rebote.
 * - Salta con la tecla "X" (física simple: gravedad + impulso).
 *
 * Estructura:
 *   1) Referencias a UI y estado
 *   2) Utilidades: clamp, métricas, sincronizaciones
 *   3) Dibujo: drawScene() (+ mejora opcional: drawGhostTrail())
 *   4) Animación: step(), startAnimation(), stopAnimation()
 *   5) Eventos: crear/eliminar, sliders, teclado (salto con "X")
 */

// ===== 1) UI y estado global =====
const createBtn = document.getElementById('createBtn');
const deleteBtn = document.getElementById('deleteBtn');
const host      = document.getElementById('host');

const color     = document.getElementById('color');
const size      = document.getElementById('size');
const sizeLabel = document.getElementById('sizeLabel');

const posX      = document.getElementById('posX');
const posXLabel = document.getElementById('posXLabel');
const speed     = document.getElementById('speed');
const speedLabel= document.getElementById('speedLabel');

const playBtn   = document.getElementById('playBtn');
const pauseBtn  = document.getElementById('pauseBtn');

let canvas = null;
let ctx    = null;

// Estado del cuadrado (posición, velocidad, física)
let x = 0;         // posición X (px)
let y = 0;         // posición Y (px) — se calculará en base al suelo/base
let v = 4;         // velocidad horizontal (px/frame)
let animId = null; // requestAnimationFrame id

// Física del salto
let vy = 0;               // velocidad vertical (px/frame), negativa hacia arriba
const GRAVITY = 0.9;      // “aceleración” hacia abajo (ajustable)
const JUMP_V  = 14;       // impulso de salto (ajustable)
let grounded  = true;     // ¿está tocando el “suelo”/base?

// ===== 2) Utilidades =====
function clamp(value, min, max){
  return Math.max(min, Math.min(max, value));
}

/**
 * Devuelve métricas del cuadrado y límites del lienzo:
 * - w, h: tamaño del cuadrado
 * - leftMax: máximo x permitido (para no salirse)
 * - baseY: y que simula el “suelo” (20 px sobre el borde inferior)
 */
function getSquareMetrics(){
  const sqSize = Number(size.value);
  const w = sqSize, h = sqSize;
  const leftMax = canvas ? (canvas.width - w) : 0;
  const baseY = canvas ? (canvas.height - h - 20) : 0;
  return { w, h, leftMax, baseY };
}

/**
 * Sincroniza X real → slider (%)
 */
function syncSliderWithX(){
  if(!canvas) return;
  const { leftMax } = getSquareMetrics();
  const percent = leftMax > 0 ? (x / leftMax) * 100 : 0;
  posX.value = Math.round(percent);
  posXLabel.textContent = `${posX.value}%`;
}

/**
 * Sincroniza slider (%) → X real
 */
function syncXWithSlider(){
  if(!canvas) return;
  const { leftMax } = getSquareMetrics();
  const percent = Number(posX.value) / 100;
  x = clamp(Math.round(percent * leftMax), 0, leftMax);
  posXLabel.textContent = `${posX.value}%`;
  drawScene();
}

// ===== 3) Dibujo =====
/**
 * Dibuja la escena:
 * - Limpia el canvas.
 * - Ajusta y (suelo/base).
 * - Dibuja el cuadrado en (x, y) con color/tamaño elegidos.
 * - (Mejora opcional) Llama a drawGhostTrail() si quieres estela.
 */
function drawScene(){
  if(!ctx || !canvas) return;

  const { w, h, baseY } = getSquareMetrics();

  // Limpiar
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ajustar y al suelo si está por debajo
  if(y > baseY) y = baseY;

  // Dibujar cuadrado
  ctx.fillStyle = color.value;
  ctx.fillRect(x, y, w, h);

  // (Opcional) Estela suave:
  // drawGhostTrail(); // Descomenta si quieres “huellas fantasma”
}

/**
 * (Mejora opcional) Dibuja huellas laterales con transparencia.
 * Pégala debajo de drawScene() y llama dentro de drawScene() si quieres.
 */
function drawGhostTrail(){
  if(!ctx || !canvas) return;
  const { w, h, baseY } = getSquareMetrics();
  const gaps = [40, 80, 120];
  const alphas = [0.35, 0.22, 0.12];
  alphas.forEach((a, i) => {
    const dx = gaps[i];
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = color.value;
    ctx.fillRect(clamp(x - dx, 0, canvas.width - w), baseY, w, h);
    ctx.fillRect(clamp(x + dx, 0, canvas.width - w), baseY, w, h);
    ctx.restore();
  });
}

// ===== 4) Animación =====
/**
 * Bucle de animación:
 * - Movimiento horizontal + rebotes en bordes.
 * - Física vertical del salto (gravedad + aterrizaje).
 * - Redibujo y siguiente frame.
 */
function step(){
  const { w, h, leftMax, baseY } = getSquareMetrics();

  // --- Horizontal: avanzar y rebotar en 0/leftMax
  x += v;
  if(x <= 0){ x = 0; v = Math.abs(v); }
  else if(x >= leftMax){ x = leftMax; v = -Math.abs(v); }

  // --- Vertical: aplicar gravedad y salto
  if(!grounded){
    vy += GRAVITY;     // gravedad hacia abajo
    y += vy;

    // Aterrizaje
    if(y >= baseY){
      y = baseY;
      vy = 0;
      grounded = true;
    }
  }else{
    // Asegurar que y esté pegado al suelo
    y = baseY;
  }

  // Redibujar y sincronizar UI
  drawScene();
  syncSliderWithX();

  animId = requestAnimationFrame(step);
}

/** Inicia la animación si no está corriendo */
function startAnimation(){
  if(!canvas || animId) return;
  animId = requestAnimationFrame(step);
  playBtn.disabled  = true;
  pauseBtn.disabled = false;
}

/** Detiene la animación si está corriendo */
function stopAnimation(){
  if(animId){
    cancelAnimationFrame(animId);
    animId = null;
  }
  playBtn.disabled  = false;
  pauseBtn.disabled = true;
}

// ===== 5) Eventos y ciclo de vida =====
/** Crea el canvas, prepara estado y dibuja la escena inicial */
function createCanvas(){
  if(canvas) return;

  const width = Math.min(860, host.clientWidth - 24);
  const height = 420;

  canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height;
  canvas.style.width  = width + 'px';
  canvas.style.height = height + 'px';

  ctx = canvas.getContext('2d');

  // Estado inicial del cuadrado
  const { leftMax, baseY, w } = getSquareMetrics();
  x = Math.round(leftMax / 2);
  y = baseY;
  v = Number(speed.value);

  // Montar en el host
  host.textContent = '';
  host.appendChild(canvas);

  // Habilitar UI
  deleteBtn.disabled = false;
  playBtn.disabled   = false;
  pauseBtn.disabled  = true;

  // Labels
  sizeLabel.textContent  = `${size.value} px`;
  speedLabel.textContent = `${speed.value} px/cuadro`;
  syncSliderWithX();

  // Primera escena
  drawScene();
}

/** Elimina el canvas y resetea UI/estado */
function deleteCanvas(){
  stopAnimation();
  if(!canvas) return;
  canvas.remove();
  canvas = null;
  ctx = null;
  host.textContent = 'No hay lienzo creado.';

  deleteBtn.disabled = true;
  playBtn.disabled   = true;
  pauseBtn.disabled  = true;

  posX.value = 50; posXLabel.textContent = '50%';
  size.value = 80; sizeLabel.textContent = '80 px';
  speed.value = 4; speedLabel.textContent = '4 px/cuadro';
}

// --- Listeners de botones principales
createBtn.addEventListener('click', createCanvas);
deleteBtn.addEventListener('click', deleteCanvas);
playBtn.addEventListener('click', startAnimation);
pauseBtn.addEventListener('click', stopAnimation);

// --- Sliders de apariencia
size.addEventListener('input', () => {
  sizeLabel.textContent = `${size.value} px`;
  if(canvas){
    // Reajustar para no salirnos tras cambiar tamaño
    const { leftMax } = getSquareMetrics();
    x = clamp(x, 0, leftMax);
    drawScene();
    syncSliderWithX();
  }
});
color.addEventListener('input', drawScene);

// --- Sliders de posición y velocidad
posX.addEventListener('input', syncXWithSlider);
speed.addEventListener('input', () => {
  const dir = Math.sign(v || 1); // conserva sentido
  v = Number(speed.value) * dir;
  speedLabel.textContent = `${speed.value} px/cuadro`;
});

// === ACTIVIDAD PRÁCTICA: salto con la tecla "X" ===
/**
 * onKeyDownJumpX(e)
 * Lógica de salto:
 *  - Si la tecla es 'x' o 'X' y el cuadrado está en el suelo (grounded),
 *    aplica un impulso hacia arriba (vy negativo) y marca grounded=false.
 *
 * ¿Dónde se coloca?
 *  - Este listener va al final del archivo, junto con los demás listeners globales.
 *  - No requiere que la animación esté corriendo: puedes saltar y luego iniciar;
 *    o saltar mientras el runner está animado.
 */
function onKeyDownJumpX(e){
  if(!canvas) return;
  if(e.key === 'x' || e.key === 'X'){
    const { baseY } = getSquareMetrics();
    // Solo saltar si estamos en el suelo
    if(grounded){
      grounded = false;
      vy = -JUMP_V; // impulso hacia arriba
      // Si no hay animación corriendo, dibuja al menos un cuadro
      if(!animId) drawScene();
    }
  }
}
document.addEventListener('keydown', onKeyDownJumpX);
```

## 🧪 ¿Qué aprendiste al implementarlo?

- **DOM dinámico**: crear/quitar el `<canvas>` solo cuando hace falta.
- **Animación eficiente**: `requestAnimationFrame` coordina fps con el navegador.
- **Límites y rebotes**: el cuadrado no se sale y cambia de dirección en los bordes.
- **Física simple de salto**: gravedad, impulso y detección de aterrizaje.
- **Encapsulación**: la mejora (salto con tecla “X”) se ubica como **función** y su **listener** queda al final junto al resto.

## ❓ Preguntas de autoevaluación

1. ¿Por qué conviene usar `requestAnimationFrame` en vez de `setInterval` para animación en canvas?
2. ¿Cómo garantiza `getSquareMetrics()` que el cuadrado no se salga del lienzo aunque cambies el tamaño?
3. ¿Qué condiciones revisa `onKeyDownJumpX` antes de permitir un nuevo salto?

## ✨ Mejora sencilla adicional (en función): “Estela fantasma”

Si quieres añadir una **estela** al moverte/saltar:

1. **Pega** la función `drawGhostTrail()` **debajo** de `drawScene()` (ya la tienes en el archivo anterior).
2. **Actívala** dentro de `drawScene()` descomentando la llamada:

```javascript
// drawGhostTrail(); // ← quita los “//” para activar la estela
```

> Esta mejora modular refuerza el hábito de **encapsular** cambios en **funciones** y saber **dónde** integrarlas en el flujo de dibujo.

------

## 🏁 Conclusión

Con esta práctica pasaste de un canvas básico a un **runner-jumper** interactivo: crear/eliminar, personalizar, animar, **rebotar** y **saltar** con “X”. Aprendiste a **estructurar** el proyecto, separaste responsabilidades (HTML/CSS/JS), y ejercitaste **física elemental** en la web. Desde aquí puedes explorar más: doble salto, obstáculos, colisiones o marcador de puntos. 

¡Buen trabajo! 🎉