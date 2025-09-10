# **🌡️⚙️ Proyecto 3: Calculadora de Energía Cinética + Gráfico en Tiempo Real**

## 📂 1) Estructura del proyecto

```css
/energia-cinetica
│── index.html          # Estructura y vista (HTML5 + Bootstrap)
│── /css
│   └── styles.css      # Estilos y animaciones
│── /js
│   └── script.js       # Lógica, fórmulas y render del gráfico
```

## 🏗️ 2) `index.html` — Estructura y “puntos de anclaje” para JS

**Objetivo:** Crear los elementos con `id` que JS leerá/escribirá (inputs, salidas y canvas del gráfico).
 **Pistas pedagógicas:** Fíjate cómo cada `id` es un “puente” para que JS manipule el DOM.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Energía Cinética con Temperatura 🌡️→⚡</title>

  <!-- Bootstrap 5 -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <!-- Estilos propios -->
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <!-- Header -->
  <header class="bg-dark text-white text-center py-4 shadow-sm">
    <h1 class="title-float">🌡️ Calculadora de Energía Cinética</h1>
    <p class="mb-0">Modelo educativo basado en <strong>gas ideal</strong> — <em>promedio térmico</em></p>
  </header>

  <!-- Main -->
  <main class="container my-5">
    <div class="row g-4">
      <!-- Panel de control -->
      <section class="col-lg-5">
        <div class="card shadow-lg p-4">
          <h2 class="h5 text-center mb-3">Parámetros de entrada 🔧</h2>

          <!-- Temperatura en Kelvin (control deslizante) -->
          <div class="mb-3">
            <label for="tempK" class="form-label">Temperatura (K)</label>
            <input type="range" class="form-range" min="0" max="1200" step="1" id="tempK" value="300" />
            <div class="d-flex justify-content-between">
              <small>0 K</small>
              <span class="badge bg-primary" id="tempKLabel">300 K</span>
              <small>1200 K</small>
            </div>
          </div>

          <!-- Masa molar (g/mol) para calcular velocidad RMS -->
          <div class="mb-3">
            <label for="molarMass" class="form-label">Masa molar (g/mol)</label>
            <input type="number" class="form-control" id="molarMass" min="1" step="0.01" value="28.97" />
            <div class="form-text">
              Ejemplos: Helio=4, N₂≈28,97, O₂≈32, Argón=39,95
            </div>
          </div>

          <!-- Botón reset suave -->
          <button class="btn btn-outline-secondary w-100" id="resetBtn">Restablecer valores ↺</button>
        </div>

        <!-- Salidas numéricas -->
        <div class="card shadow-lg p-4 mt-4">
          <h2 class="h5 text-center mb-3">Resultados 📊</h2>
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span>Energía cinética promedio por partícula</span>
              <strong id="keParticle">— J</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span>Energía cinética promedio por mol</span>
              <strong id="keMole">— kJ/mol</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span>Velocidad RMS (v<sub>rms</sub>)</span>
              <strong id="vrms">— m/s</strong>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <span>Equivalencias de temperatura</span>
              <strong id="tempEquiv">— °C / — °F</strong>
            </li>
          </ul>
          <p class="small text-muted mt-3">
            Modelo: gas ideal. <em>Energía cinética promedio</em> depende de T: 
            <code>&lt;E&gt; = (3/2)·k<sub>B</sub>·T</code> (por partícula) y 
            <code>&lt;E&gt;<sub>mol</sub> = (3/2)·R·T</code> (por mol).
          </p>
        </div>
      </section>

      <!-- Gráfico Canvas -->
      <section class="col-lg-7">
        <div class="card shadow-lg p-4">
          <h2 class="h5 text-center mb-3">E<sub>cin</sub> por mol vs Temperatura (K) — tiempo real 🎞️</h2>
          <!-- El canvas es el “lienzo” donde JS dibuja -->
          <canvas id="chart" width="720" height="360" class="rounded border"></canvas>
          <p class="small text-muted mt-3">
            La curva representa <code>(3/2)·R·T</code> en <strong>kJ/mol</strong>. El punto se anima 
            hacia la temperatura actual.
          </p>
        </div>
      </section>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-dark text-white text-center py-3">
    <small>Desarrollado con ❤️ usando HTML5 Canvas, Bootstrap 5 y JavaScript moderno.</small>
  </footer>

  <!-- JS Bootstrap -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- Lógica propia -->
  <script src="js/script.js"></script>
</body>
</html>
```

**Claves de comunicación HTML → JS:**

- `id="tempK"`, `id="molarMass"`: entradas que **JS leerá** con `getElementById(...)`.
- `id="keParticle"`, `id="keMole"`, `id="vrms"`, `id="tempEquiv"`: salidas que **JS escribirá**.
- `id="chart"`: el **canvas** donde **JS dibuja** el gráfico con la API Canvas 2D.

## 🎨 3) `css/styles.css` — Estilo + animación sutil

**Objetivo:** Mejorar UX y dar vida con animaciones suaves (motivación visual).

```css
/* Fondo con gradiente animado (suave) */
body {
  background: linear-gradient(-45deg, #c9d6ff, #e2e2e2, #f8f9fa, #d7e1ec);
  background-size: 400% 400%;
  animation: bgMove 18s ease infinite;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}

@keyframes bgMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Título con flotación ligera */
.title-float {
  animation: floatY 4s ease-in-out infinite;
}
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}

/* Pequeños detalles */
.card { border-radius: 14px; }
#chart { background: #ffffff; }
.badge { font-size: 0.95rem; }
```

## 🧠 4) Fórmulas que usaremos (modelo gas ideal)

- **Promedio por partícula:** ⟨E⟩ = (3/2)·k_B·T  (J)
- **Promedio por mol:** ⟨E⟩_mol = (3/2)·R·T  (J/mol)
- **Velocidad RMS:** v_rms = √(3·R·T / M)  (m/s), con **M en kg/mol**
   (si el usuario ingresa g/mol, convertimos: `Mkg = M_gmol / 1000`).
- Conversión de temperatura (para equivalencias de salida):
  - °C = K − 273.15
  - °F = (K − 273.15)·9/5 + 32

Constantes (SI):

- k_B = 1.380 649e−23 J/K
- R   = 8.314 462 618 J/(mol·K)

## 🧩 5) `js/script.js` — Lógica, flujo y gráfico (documentado)

**Objetivo pedagógico:** Ver claramente:

1. Cómo se leen inputs del DOM
2. Cómo se calculan resultados (funciones puras)
3. Cómo se actualiza el DOM
4. Cómo se anima un gráfico en Canvas con `requestAnimationFrame`

```javascript
/***********************
 * 1) CONSTANTES FÍSICAS
 ***********************/
const KB = 1.380649e-23;      // Constante de Boltzmann (J/K)
const R  = 8.314462618;       // Constante de los gases (J/(mol·K))

/*********************************
 * 2) REFERENCIAS A ELEMENTOS DOM
 *********************************/
// Entradas
const tempKInput   = document.getElementById("tempK");      // rango [0..1200]
const molarMassInp = document.getElementById("molarMass");  // g/mol
const resetBtn     = document.getElementById("resetBtn");

// Salidas
const tempKLabel  = document.getElementById("tempKLabel");
const keParticle  = document.getElementById("keParticle");
const keMole      = document.getElementById("keMole");
const vrms        = document.getElementById("vrms");
const tempEquiv   = document.getElementById("tempEquiv");

// Canvas (gráfico)
const canvas = document.getElementById("chart");
const ctx    = canvas.getContext("2d");

/*******************************************
 * 3) ESTADO DEL GRÁFICO Y PARÁMETROS VISUALES
 *******************************************/
// Rango visual de T para el gráfico
const T_MIN = 0;
const T_MAX = 1200;

// Escala vertical (kJ/mol) hasta el valor de E a T_MAX
const E_MAX_KJMOL = (1.5 * R * T_MAX) / 1000; // kJ/mol

// “Temperatura objetivo” y “temperatura animada” para el cursor del gráfico
let targetKelvin  = Number(tempKInput.value);
let animKelvin    = targetKelvin; // inicia sin deferencia para evitar salto

/********************************
 * 4) FUNCIONES DE CONVERSIÓN/FX
 ********************************/
/**
 * Convierte Kelvin a equivalencias útiles para mostrar.
 * @param {number} K - temperatura en Kelvin
 * @returns {{C:number, F:number}}
 */
function fromKelvin(K) {
  const C = K - 273.15;
  const F = C * 9/5 + 32;
  return { C, F };
}

/**
 * Energía cinética promedio por partícula (J).
 * <E> = (3/2) * kB * T
 */
function kineticEnergyPerParticleJ(K) {
  return 1.5 * KB * K;
}

/**
 * Energía cinética promedio por mol (J/mol).
 * <E>_mol = (3/2) * R * T
 */
function kineticEnergyPerMoleJ(K) {
  return 1.5 * R * K;
}

/**
 * Velocidad RMS (m/s) para una masa molar dada.
 * v_rms = sqrt( 3 * R * T / M ), M en kg/mol
 * @param {number} K - temperatura Kelvin
 * @param {number} M_gmol - masa molar en g/mol
 */
function vrmsFromT(K, M_gmol) {
  const M = M_gmol / 1000; // a kg/mol
  return Math.sqrt( (3 * R * K) / M );
}

/**
 * Formateo corto con separador de miles.
 */
function fmt(n, digits=2) {
  return Number(n).toLocaleString("es-CO", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

/******************************************
 * 5) RENDER NUMÉRICO (DOM): CÁLCULO + SALIDA
 ******************************************/
function updateNumericOutputs() {
  // 1) Leer entradas actuales
  const K = Number(tempKInput.value);
  const M_gmol = Math.max(1, Number(molarMassInp.value) || 1); // evitar cero/NaN

  // 2) Calcular magnitudes
  const E_particle_J = kineticEnergyPerParticleJ(K);
  const E_mole_J     = kineticEnergyPerMoleJ(K);
  const v_rms        = vrmsFromT(K, M_gmol);
  const { C, F }     = fromKelvin(K);

  // 3) Escribir en la UI
  tempKLabel.textContent   = `${K} K`;
  keParticle.textContent   = `${fmt(E_particle_J, 4)} J`;
  keMole.textContent       = `${fmt(E_mole_J/1000, 3)} kJ/mol`;
  vrms.textContent         = `${fmt(v_rms, 2)} m/s`;
  tempEquiv.textContent    = `${fmt(C, 2)} °C / ${fmt(F, 2)} °F`;

  // 4) Actualizar objetivo del gráfico
  targetKelvin = K;
}

/********************************************
 * 6) GRÁFICO CANVAS: EJE, CURVA Y ANIMACIÓN
 ********************************************/
/**
 * Transformación de coordenadas: (T[K], E[kJ/mol]) -> (x, y) px
 */
function toCanvasCoords(T, E_kJmol) {
  const padL = 60, padR = 20, padT = 20, padB = 50;
  const w = canvas.width  - padL - padR;
  const h = canvas.height - padT - padB;

  // Normalizaciones 0..1
  const nx = (T - T_MIN) / (T_MAX - T_MIN);
  const ny = (E_kJmol) / (E_MAX_KJMOL); // 0..1

  // x crece a la derecha; y invertido (0 arriba)
  const x = padL + nx * w;
  const y = padT + (1 - ny) * h;
  return { x, y, padL, padR, padT, padB, w, h };
}

/**
 * Dibuja ejes con marcas.
 */
function drawAxes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const { padL, padT, padB, w, h } = toCanvasCoords(0,0);

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1.25;

  // Eje X (Temperatura)
  ctx.beginPath();
  ctx.moveTo(padL, padT + h);
  ctx.lineTo(padL + w, padT + h);
  ctx.stroke();

  // Eje Y (E kJ/mol)
  ctx.beginPath();
  ctx.moveTo(padL, padT);
  ctx.lineTo(padL, padT + h);
  ctx.stroke();

  // Ticks X (cada 200 K)
  ctx.fillStyle = "#333";
  ctx.font = "12px system-ui";
  for (let t = 0; t <= T_MAX; t += 200) {
    const { x, y } = toCanvasCoords(t, 0);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 6);
    ctx.stroke();
    ctx.fillText(`${t}`, x - 10, y + 20);
  }
  ctx.fillText("Temperatura (K)", padL + w/2 - 50, padT + h + 36);

  // Ticks Y (4 divisiones)
  const yDiv = 4;
  for (let i = 0; i <= yDiv; i++) {
    const E_tick = (E_MAX_KJMOL / yDiv) * i;
    const { x, y } = toCanvasCoords(0, E_tick);
    ctx.beginPath();
    ctx.moveTo(x - 6, y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillText(`${fmt(E_tick, 1)}`, x - 48, y + 4);
  }
  ctx.save();
  ctx.translate(18, padT + h/2);
  ctx.rotate(-Math.PI/2);
  ctx.fillText("E (kJ/mol)", 0, 0);
  ctx.restore();
}

/**
 * Dibuja la curva E(T) = (3/2)·R·T (kJ/mol) hasta una T dada.
 */
function drawCurve(uptoKelvin) {
  ctx.strokeStyle = "#0d6efd";
  ctx.lineWidth = 2;
  ctx.beginPath();

  const step = 8; // resolución del trazo
  for (let T = T_MIN; T <= uptoKelvin; T += step) {
    const E_kJmol = (1.5 * R * T) / 1000;
    const { x, y } = toCanvasCoords(T, E_kJmol);
    if (T === T_MIN) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  // Último punto exacto
  const E_last = (1.5 * R * uptoKelvin) / 1000;
  const { x: xLast, y: yLast } = toCanvasCoords(uptoKelvin, E_last);
  ctx.lineTo(xLast, yLast);
  ctx.stroke();

  // Marcador (punto actual)
  ctx.fillStyle = "#198754";
  ctx.beginPath();
  ctx.arc(xLast, yLast, 5, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Bucle de animación: interpola animKelvin → targetKelvin y redibuja.
 */
function animate() {
  // Interpolación suave (easing)
  const diff = targetKelvin - animKelvin;
  animKelvin += diff * 0.08;          // factor suavizado
  if (Math.abs(diff) < 0.1) animKelvin = targetKelvin; // snap al final

  // Redibujo
  drawAxes();
  drawCurve(animKelvin);

  requestAnimationFrame(animate);
}

/*******************************************
 * 7) EVENTOS: HTML → JS (flujo de información)
 *******************************************/
/*
 * Los “listeners” capturan cambios de los inputs HTML y llaman a funciones
 * que: (a) leen valores, (b) calculan, (c) actualizan DOM y (d) ajustan la animación.
 */
tempKInput.addEventListener("input", updateNumericOutputs);
molarMassInp.addEventListener("input", updateNumericOutputs);

resetBtn.addEventListener("click", () => {
  tempKInput.value = 300;
  molarMassInp.value = 28.97;
  updateNumericOutputs(); // recalcula y actualiza todo
});

/***************************
 * 8) INICIALIZACIÓN GENERAL
 ***************************/
function init() {
  updateNumericOutputs(); // primer render de números y objetivo gráfico
  drawAxes();             // pinta ejes una vez
  animate();              // inicia el loop de animación (60 FPS aprox.)
}
init();
```

### 🔎 En el JS (qué mirar con lupa)

- **Funciones puras** (`kineticEnergyPerMoleJ`, `vrmsFromT`, etc.) separan **cálculo** de **presentación**.
- **Puentes HTML↔JS**: todos los `getElementById(...)` y los `addEventListener(...)`.
- **Parámetros y retorno**: funciones como `fromKelvin(K)` devuelven un objeto `{ C, F }` que el **caller** usa.
- **Canvas 2D**: `drawAxes()` y `drawCurve(...)` muestran el **patrón de dibujo** (clear → ejes → curva → marcador).
- **Animación**: `requestAnimationFrame(animate)` + interpolación (`animKelvin` → `targetKelvin`) para suavidad.

## 🧪 6) Cómo probar (checklist)

1. Abre `index.html` en tu navegador.
2. Mueve el **slider de temperatura**:
   - Observa cómo cambian **KE por partícula**, **KE por mol** y **v_rms**.
   - Mira el **punto verde** del gráfico moverse con suavidad hacia la nueva T.
3. Cambia **Masa molar** (ej.: Helio=4 g/mol) y nota cómo **v_rms** aumenta (moléculas más ligeras → mayor velocidad RMS).
4. Pulsa **Restablecer** para volver a 300 K y 28,97 g/mol (aire).

## 🧭 7) Mini-retos (aprendizaje activo)

- **Reto A:** agrega un “modo °C/°F” para que el slider muestre otra escala, pero conviertas internamente a Kelvin.
- **Reto B:** pinta una **línea punteada** en el gráfico para la temperatura ambiente (~298 K).
- **Reto C:** añade una **sombra** bajo la curva (área) para resaltar el crecimiento con T.

## 📌 Notas didácticas y científicas

- Este es un **modelo educativo** (gas ideal): la **energía cinética promedio** depende linealmente de **T en Kelvin**.

  

- Para objetos macroscópicos, **E = ½·m·v²** depende de su velocidad real, **no** de su temperatura. Aquí usamos **v_rms** de moléculas en gas ideal para ilustrar el puente T↔movimiento.