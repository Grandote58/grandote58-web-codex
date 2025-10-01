/**
 * Runner cuadrado — Movimiento lateral con límites
 * Extiende la app base: crea/elimina canvas, color/tamaño del cuadrado,
 * añade posición X (manual), velocidad y animación con colisiones en bordes.
 */

// ====== Referencias UI existentes ======
const createBtn = document.getElementById('createBtn');
const deleteBtn = document.getElementById('deleteBtn');
const host      = document.getElementById('host');

const color     = document.getElementById('color');
const size      = document.getElementById('size');
const sizeLabel = document.getElementById('sizeLabel');

// ====== NUEVAS referencias UI ======
const posX      = document.getElementById('posX');
const posXLabel = document.getElementById('posXLabel');
const speed     = document.getElementById('speed');
const speedLabel= document.getElementById('speedLabel');
const playBtn   = document.getElementById('playBtn');
const pauseBtn  = document.getElementById('pauseBtn');

// ====== Estado del canvas y dibujo ======
let canvas = null;
let ctx    = null;

// Estado del cuadrado
let x = 0;           // posición X (px) del cuadrado (su esquina izquierda)
let y = 0;           // posición Y (px) inferior (se calcula para estar abajo)
let v = 4;           // velocidad en px por cuadro
let animId = null;   // id del requestAnimationFrame

/**
 * clamp(value, min, max)
 * Limita un número a un rango [min, max].
 * Garantiza que el cuadrado no salga del canvas.
 */
function clamp(value, min, max){
  return Math.max(min, Math.min(max, value));
}

/**
 * getSquareMetrics()
 * Calcula y devuelve medidas útiles del cuadrado según el tamaño elegido:
 * - w, h: tamaño del cuadrado (px)
 * - leftMax: máximo x permitido para que no se salga del canvas
 * - baseY: coordenada y para ubicarlo cerca del borde inferior
 */
function getSquareMetrics(){
  const sqSize = Number(size.value);
  const w = sqSize, h = sqSize;
  const leftMax = canvas ? (canvas.width - w) : 0;
  const baseY = canvas ? (canvas.height - h - 20) : 0; // 20px desde el borde inferior
  return { w, h, leftMax, baseY };
}

/**
 * drawScene()
 * Limpia el canvas y dibuja el cuadrado en (x, y) con el color seleccionado.
 * Se invoca en cada cambio de estado (tamaño, color, posición, etc.).
 */
function drawScene(){
  if(!ctx || !canvas) return;

  const { w, h, baseY } = getSquareMetrics();

  // Limpiar todo
  ctx.clearRect(0,0,canvas.width, canvas.height);

  // Actualizar y garantizamos que Y esté en la base inferior
  y = baseY;

  // Dibujar el cuadrado
  ctx.fillStyle = color.value;
  ctx.fillRect(x, y, w, h);
}

/**
 * syncXWithSlider()
 * Convierte el valor del slider de posición (0-100 %) a una posición en píxeles,
 * asegurando que el cuadrado quede dentro de los bordes.
 */
function syncXWithSlider(){
  if(!canvas) return;
  const { w, leftMax } = getSquareMetrics();

  // Porcentaje → píxeles dentro del rango [0, leftMax]
  const percent = Number(posX.value) / 100; // 0..1
  x = clamp(Math.round(percent * leftMax), 0, leftMax);

  posXLabel.textContent = `${posX.value}%`;
  drawScene();
}

/**
 * syncSliderWithX()
 * Hace lo inverso a lo anterior: cuando x cambia (por animación),
 * actualiza el slider para que muestre la posición actual.
 */
function syncSliderWithX(){
  if(!canvas) return;
  const { leftMax } = getSquareMetrics();
  const percent = leftMax > 0 ? (x / leftMax) * 100 : 0;
  posX.value = Math.round(percent);
  posXLabel.textContent = `${posX.value}%`;
}

/**
 * step()
 * Bucle de animación: mueve el cuadrado en X a velocidad v,
 * rebota en los bordes (0 y leftMax) y redibuja la escena.
 */
function step(){
  const { leftMax } = getSquareMetrics();

  // Avanza en X
  x += v;

  // Colisiones con los bordes: rebote elástico simple
  if(x <= 0){
    x = 0;
    v = Math.abs(v); // hacia la derecha
  }else if(x >= leftMax){
    x = leftMax;
    v = -Math.abs(v); // hacia la izquierda
  }

  // Reflejar posición en el slider
  syncSliderWithX();

  // Redibujar
  drawScene();

  // Siguiente frame
  animId = requestAnimationFrame(step);
}

/**
 * startAnimation()
 * Inicia el bucle de animación si no está corriendo.
 */
function startAnimation(){
  if(!canvas || animId) return;
  animId = requestAnimationFrame(step);
  playBtn.disabled  = true;
  pauseBtn.disabled = false;
}

/**
 * stopAnimation()
 * Detiene el bucle de animación si está activo.
 */
function stopAnimation(){
  if(animId){
    cancelAnimationFrame(animId);
    animId = null;
  }
  playBtn.disabled  = false;
  pauseBtn.disabled = true;
}

/**
 * createCanvas()
 * Crea el canvas (si no existe), configura tamaño y estado inicial,
 * habilita controles y dibuja la primera escena.
 */
function createCanvas(){
  if(canvas) return;

  // Medidas base similares a tu versión
  const width = Math.min(800, host.clientWidth - 24);
  const height = 400;

  canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height;
  canvas.style.width  = width + 'px';
  canvas.style.height = height + 'px';

  ctx = canvas.getContext('2d');

  // Estado inicial del cuadrado: centro aproximado
  const { leftMax } = { ...getSquareMetrics(), leftMax: width - Number(size.value) };
  x = Math.round(leftMax / 2);

  // Montar en el host
  host.textContent = '';
  host.appendChild(canvas);

  // Habilitar controles de borrado y animación
  deleteBtn.disabled = false;
  playBtn.disabled   = false;
  pauseBtn.disabled  = true;

  // Sincronizar UI
  sizeLabel.textContent  = `${size.value} px`;
  speedLabel.textContent = `${speed.value} px/cuadro`;
  syncSliderWithX();

  // Dibujo inicial
  drawScene();
}

/**
 * deleteCanvas()
 * Elimina el canvas y resetea el estado y la UI.
 */
function deleteCanvas(){
  stopAnimation();
  if(!canvas) return;
  canvas.remove();
  canvas = null;
  ctx = null;
  host.textContent = 'No hay lienzo creado.';

  // Reset UI
  deleteBtn.disabled = true;
  playBtn.disabled   = true;
  pauseBtn.disabled  = true;

  // Opcional: valores por defecto visibles
  posX.value = 50; posXLabel.textContent = '50%';
  size.value = 80; sizeLabel.textContent = '80 px';
  speed.value = 4; speedLabel.textContent = '4 px/cuadro';
}

// ====== Listeners UI (creación/eliminación) ======
createBtn.addEventListener('click', createCanvas);
deleteBtn.addEventListener('click', deleteCanvas);

// ====== Listeners UI (apariencia) ======
size.addEventListener('input', () => {
  sizeLabel.textContent = `${size.value} px`;
  // Si cambia el tamaño, recolocar x si hiciera falta para no cruzar bordes
  if(canvas){
    const { leftMax } = getSquareMetrics();
    x = clamp(x, 0, leftMax);
    drawScene();
    syncSliderWithX();
  }
});
color.addEventListener('input', drawScene);

// ====== Listeners UI (posición y velocidad) ======
posX.addEventListener('input', syncXWithSlider);
speed.addEventListener('input', () => {
  v = Number(speed.value) * Math.sign(v || 1); // conservar sentido
  speedLabel.textContent = `${speed.value} px/cuadro`;
});

// ====== Listeners UI (animación) ======
playBtn.addEventListener('click', startAnimation);
pauseBtn.addEventListener('click', stopAnimation);
