# 🎓 Práctica e-learning: **“Lienzo + Cuadrados Personalizables”**

**Propósito:** reforzar DOM dinámico con `<canvas>`, estilos básicos y dibujo 2D; además, practicar una mejora con generación **aleatoria** de elementos.
 **Base del ejercicio:** partimos de tus tres archivos ya funcionales (`index.html`, `styles.css`, `app.js`) que crean/eliminan un canvas y dibujan un cuadrado configurable (color/tamaño).indexstylesapp

------

## 🎯 Objetivos de aprendizaje

1. **Crear y eliminar** dinámicamente un `<canvas>` desde JavaScript.
2. **Dibujar** un cuadrado en el canvas y **modificar** su color y tamaño desde la UI.
3. **Comprender** la separación de responsabilidades: estructura (HTML), apariencia (CSS) y lógica (JS).
4. **Extender** el proyecto con una mejora: **agregar tres cuadrados aleatorios** en diferentes posiciones mediante una **función** bien documentada.

------

## 🗂 Estructura de archivos del proyecto

```css
canvas-cuadrados/
│
├─ index.html        # Estructura y controles (Crear/Eliminar, Color, Tamaño)
├─ styles.css        # Estilos generales y del contenedor host
└─ app.js            # Lógica para crear/eliminar canvas y dibujar cuadrados
```

- `index.html` define encabezado, botones y contenedor del canvas.index
- `styles.css` aporta el layout limpio (host con borde punteado, botones, etc.).styles
- `app.js` crea el canvas, lo inserta, y dibuja el cuadrado centrado abajo con color/tamaño configurables.app

## 💻 Código 

### 1) `index.html` (estructura + controles)

*(Conserva tu versión; aquí un recordatorio con título actualizado)* index

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cuadrado Personalizable</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>⬛ Mi cuadrado personalizable</h1>
    <p>Crea un lienzo, ajusta el color y tamaño del cuadrado, y elimínalo si quieres.</p>
  </header>

  <main>
    <div class="controls">
      <button id="createBtn">➕ Crear</button>
      <button id="deleteBtn" disabled>🗑️ Eliminar</button>

      <label>Color:
        <input type="color" id="color" value="#0d6efd">
      </label>

      <label>Tamaño:
        <input type="range" id="size" min="20" max="200" value="80">
        <span id="sizeLabel">80 px</span>
      </label>
    </div>

    <div id="host" class="host">No hay lienzo creado.</div>
  </main>

  <script src="app.js"></script>
</body>
</html>
```

### 2) `styles.css` 

```css
:root{
  --line:#e5e7eb;
  --bg:#f8fafc;
  --card:#ffffff;
}
body{
  font-family: system-ui, sans-serif;
  background: var(--bg);
  margin:0; color:#111827;
}
header{ text-align:center; padding:16px; }
main{ max-width:800px; margin:0 auto; padding:12px; }

.controls{
  display:flex; gap:12px; flex-wrap:wrap;
  background:var(--card);
  border:1px solid var(--line);
  border-radius:12px;
  padding:12px;
}
.controls button{
  padding:8px 12px; border-radius:10px; cursor:pointer;
  border:1px solid var(--line); background:#fff;
}
.controls button:disabled{ opacity:.5; cursor:not-allowed; }

.host{
  margin-top:12px; min-height:320px;
  display:flex; align-items:center; justify-content:center;
  border:1px dashed var(--line); border-radius:12px;
  color:#6b7280; background:#fff; text-align:center;
}
canvas{
  border:1px solid var(--line);
  border-radius:12px;
  display:block;
  background:#fff;
}
```

### 3) `app.js` 

```javascript
// 🧭 Referencias a UI (botones y controles)
const createBtn = document.getElementById('createBtn');
const deleteBtn = document.getElementById('deleteBtn');
const host = document.getElementById('host');

const color = document.getElementById('color');
const size = document.getElementById('size');
const sizeLabel = document.getElementById('sizeLabel');

// 🖼️ Estado del canvas/contexto
let canvas = null;
let ctx = null;

/**
 * 🎨 drawSquare()
 * Dibuja UN cuadrado en la parte inferior y centrado horizontalmente.
 * - Limpia el canvas para evitar “fantasmas”.
 * - Usa el color y tamaño seleccionados.
 */
function drawSquare() {
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // Limpieza del lienzo completo
  ctx.clearRect(0,0,w,h);

  // Lectura de controles
  const sqSize = Number(size.value);
  const sqColor = color.value;

  ctx.fillStyle = sqColor;
  // x centrado, y a 20px del borde inferior
  ctx.fillRect(
    (w/2 - sqSize/2),
    h - sqSize - 20,
    sqSize,
    sqSize
  );
}

// ▶️ Crear canvas cuando el usuario lo solicite
createBtn.addEventListener('click', () => {
  if (canvas) return;   // evita múltiples lienzos

  // Reinicia el tamaño por claridad docente
  size.value = 80;
  sizeLabel.textContent = '80 px';

  // Crear elemento <canvas> y calcular tamaño
  canvas = document.createElement('canvas');
  const width = Math.min(800, host.clientWidth - 24);
  const height = 400;
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Obtener el contexto de dibujo
  ctx = canvas.getContext('2d');

  // Insertar en el DOM y habilitar “Eliminar”
  host.textContent = '';
  host.appendChild(canvas);
  deleteBtn.disabled = false;

  // Primer dibujo
  drawSquare();

  // ⬇️ (MEJORA) aquí podrás invocar la función que agrega 3 cuadrados aleatorios (ver sección de mejora)
  // placeRandomSquares(); // <- descomenta cuando agregues la mejora
});

// 🗑️ Eliminar canvas
deleteBtn.addEventListener('click', () => {
  if (!canvas) return;
  canvas.remove();
  canvas = null;
  ctx = null;
  host.textContent = 'No hay lienzo creado.';
  size.value = 80;
  sizeLabel.textContent = '80 px';
  deleteBtn.disabled = true;
});

// 🔁 Actualización reactiva de tamaño y color
size.addEventListener('input', () => {
  sizeLabel.textContent = `${size.value} px`;
  drawSquare();
});
color.addEventListener('input', drawSquare);
```

## 🧠 ¿Qué está pasando?

- **HTML** aporta el “esqueleto” (botones y área contenedora del canvas).
- **CSS** aplica una estética agradable que ayuda a **enfocar** la atención del alumno.
- **JS** crea el canvas cuando el alumno lo decide (patrón de **DOM dinámico**), calcula dimensiones y dibuja el **cuadrado base** abajo del lienzo.
- Al cambiar **color/tamaño**, el dibujo se **actualiza en vivo**.

## 🧩 Mejora sencilla: **tres cuadrados aleatorios** 🎲🎲🎲

### ✅ Requisito

- Debe estar dentro de **una función**.
- Debes indicar **dónde** se coloca en el código y **cómo** invocarla.

### 📌 1) Agrega esta función **debajo** de `drawSquare()` en `app.js`

*(Justo después de la definición de `drawSquare`, antes de los `addEventListener`)*

```javascript
/**
 * 🎲 placeRandomSquares()
 * Dibuja 3 cuadrados adicionales en posiciones aleatorias del canvas.
 * - Respeta los límites (no se salen).
 * - Tamaño de cada cuadrado: 60% del slider actual (para variar).
 * - Color: el mismo seleccionado, con leve variación de transparencia.
 */
function placeRandomSquares(){
  if(!ctx || !canvas) return;

  const baseSize = Math.max(10, Math.floor(Number(size.value) * 0.6));
  const w = canvas.width;
  const h = canvas.height;

  for(let i = 0; i < 3; i++){
    // Coordenadas aleatorias (evitando que se salgan)
    const x = Math.floor(Math.random() * (w - baseSize));
    const y = Math.floor(Math.random() * (h - baseSize));

    // Leve variación de alfa para distinguirlos
    ctx.save();
    ctx.globalAlpha = 0.7;              // un poco translúcidos
    ctx.fillStyle = color.value;        // mismo color elegido
    ctx.fillRect(x, y, baseSize, baseSize);
    ctx.restore();
  }
}
```

### 📌 2) ¿Dónde llamar a la función?

- **Opción A (automática):** al crear el canvas, **después** de `drawSquare();` (línea comentada en el `createBtn.addEventListener('click', ...)`).

  ```
  drawSquare();
  placeRandomSquares(); // <-- llama aquí para que aparezcan al crear el lienzo
  ```

- **Opción B (bajo demanda):** agrega un botón “🎲 Aleatorios” en tu HTML y llámala en su `click`.

> Importante: si cambias el tamaño/color tras colocar los aleatorios, **`drawSquare()` limpia el lienzo** y sólo vuelve a pintar el cuadrado base. Para mantener los aleatorios, vuelve a llamar a `placeRandomSquares()` después de `drawSquare()` cuando cambies tamaño/color (decisión didáctica: refuerza el concepto de **redibujar**).

## ✅ Checklist de logro

-  “Crear” genera el canvas.
-  El cuadrado base aparece **centrado abajo** con el color/tamaño elegidos.
-  “Eliminar” quita el canvas y desactiva el botón.
-  La **mejora** (aleatorios) funciona y **no salen** del área.

## ❓ Preguntas de autoevaluación

1. ¿Por qué limpiamos el canvas con `ctx.clearRect(0,0,w,h)` antes de dibujar?
2. ¿Cómo garantizamos que los cuadrados aleatorios **no se salgan** del canvas?
3. ¿Qué ventaja didáctica tiene separar el dibujo base en `drawSquare()` y la mejora en `placeRandomSquares()`?

## 🧪 Sugerencias de experimentación

- Cambia el **factor** `0.6` del tamaño aleatorio a `0.4` o `0.8` y observa el impacto.
- Prueba con `ctx.globalAlpha = 0.4` para una estética “vidriosa”.
- Tras `color.addEventListener('input', ...)`, llama a `placeRandomSquares()` para que la actualización de color **también** afecte a los aleatorios (refuerza el ciclo de **redibujar**).



# ✅ **Solución de Apoyo**

# ✅ Opción A — **Automática al crear el lienzo**

**Idea:** en cuanto el usuario pulse **Crear**, se dibuja el cuadrado base y **de inmediato** se agregan los 3 cuadrados aleatorios.

### 1) Asegúrate de tener la función (en `app.js`, debajo de `drawSquare()`):

```javascript
/**
 * 🎲 placeRandomSquares()
 * Dibuja 3 cuadrados adicionales en posiciones aleatorias del canvas.
 */
function placeRandomSquares(){
  if(!ctx || !canvas) return;

  const baseSize = Math.max(10, Math.floor(Number(size.value) * 0.6));
  const w = canvas.width;
  const h = canvas.height;

  for(let i = 0; i < 3; i++){
    const x = Math.floor(Math.random() * (w - baseSize));
    const y = Math.floor(Math.random() * (h - baseSize));

    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color.value;
    ctx.fillRect(x, y, baseSize, baseSize);
    ctx.restore();
  }
}
```

### 2) Llama a la función al terminar de crear el lienzo (en el `click` de **Crear**):

```html
createBtn.addEventListener('click', () => {
  if (canvas) return;

  // ... (código para crear canvas y ctx)

  // Primer dibujo
  drawSquare();

  // 👉 Automático: agrega los 3 cuadrados aleatorios
  placeRandomSquares();

  // habilitar eliminar, etc.
});
```

### 3) (Opcional) Mantener los aleatorios cuando cambias tamaño/color

Cada vez que `drawSquare()` limpia el lienzo, si quieres **conservar** los aleatorios tras mover los sliders:

```javascript
size.addEventListener('input', () => {
  sizeLabel.textContent = `${size.value} px`;
  drawSquare();
  placeRandomSquares();  // vuelve a colocar aleatorios
});

color.addEventListener('input', () => {
  drawSquare();
  placeRandomSquares();  // vuelve a colocar aleatorios
});
```

# ✅ Opción B — **Botón “Aleatorios” bajo demanda**

**Idea:** el usuario decide cuándo añadir los 3 cuadrados aleatorios con un botón extra.

### 1) Agrega el botón en tu `index.html` dentro de `.controls`:

```html
<button id="randomBtn" disabled>🎲 Aleatorios</button>
```

### 2) En `app.js`, habilítalo al crear el lienzo:

```javascript
const randomBtn = document.getElementById('randomBtn');

createBtn.addEventListener('click', () => {
  if (canvas) return;

  // ... (crear canvas y ctx, drawSquare)

  // habilitar botones
  deleteBtn.disabled = false;
  randomBtn.disabled = true;   // Puedes poner false si quieres permitirlo de inmediato

  // Si quieres permitirlo ya:
  randomBtn.disabled = false;
});
```

### 3) Listener del botón “Aleatorios”:

```javascript
randomBtn.addEventListener('click', () => {
  placeRandomSquares();   // usa la misma función
});
```

### 4) Al eliminar el lienzo, deshabilita el botón:

```javascript
deleteBtn.addEventListener('click', () => {
  if (!canvas) return;
  canvas.remove();
  canvas = null;
  ctx = null;

  host.textContent = 'No hay lienzo creado.';
  deleteBtn.disabled = true;
  randomBtn.disabled = true;  // 🔒
});
```

### 5) (Opcional) Redibujado coherente

Si quieres que al mover tamaño/color se mantenga solo el cuadrado base (y que el alumno **decida** cuándo volver a poner aleatorios), no llames a `placeRandomSquares()` dentro de los `input`. Si sí quieres mantenerlos:

```javascript
size.addEventListener('input', () => {
  sizeLabel.textContent = `${size.value} px`;
  drawSquare();
  // placeRandomSquares(); // <- deja comentado si prefieres “bajo demanda”
});
color.addEventListener('input', () => {
  drawSquare();
  // placeRandomSquares();
});
```

## 🧩 ¿Cuál elegir?

- **Opción A (automática):** ideal para experiencia guiada. Cada cambio deja el lienzo con “cuadrado base + aleatorios” sin pasos extra.
- **Opción B (bajo demanda):** fomenta el **control del estudiante** y el concepto de **redibujar**; útil para reflexionar sobre estados del canvas y cuándo invocar funciones.

## 🏁 Conclusión

Ambas soluciones refuerzan los conceptos clave de e-learning: **DOM dinámico**, **dibujo en canvas**, **separación de responsabilidades** y **control del estado**. La Opción A prioriza la fluidez automática (muy útil para principiantes), mientras que la Opción B promueve la toma de decisiones y el pensamiento sobre **cuándo** y **por qué** redibujar elementos. Puedes incluso combinarlas en una sola práctica: empezar con la automática para entender el flujo y luego pasar al botón **Aleatorios** para que el estudiante explore y gane autonomía. 🎨✨