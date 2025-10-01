// Referencias UI
const createBtn = document.getElementById('createBtn');
const clearBtn  = document.getElementById('clearBtn');
const host      = document.getElementById('canvasHost');

const color     = document.getElementById('color');
const size      = document.getElementById('size');
const sizeLabel = document.getElementById('sizeLabel');

// Estado de dibujo
let canvas = null;
let ctx    = null;
let drawing = false;
let lastX = 0, lastY = 0;

// Mostrar el número de píxeles del grosor
size.addEventListener('input', () => {
  sizeLabel.textContent = `${size.value} px`;
});

// 1) Crear el área de dibujo SOLO al pulsar el botón
createBtn.addEventListener('click', () => {
  if (canvas) return; // ya existe

  canvas = document.createElement('canvas');
  // Tamaño lógico (para nitidez) y visual
  const width  = Math.min(800, host.clientWidth - 24);
  const height = 500;
  canvas.width = width * 2;   // retina-friendly
  canvas.height = height * 2;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx = canvas.getContext('2d');
  ctx.scale(2,2); // compensa el “retina”
  ctx.lineJoin = 'round';
  ctx.lineCap  = 'round';

  host.textContent = ''; // limpiar el texto de ayuda
  host.appendChild(canvas);
  clearBtn.disabled = false;

  // Listeners de dibujo
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  document.addEventListener('mouseup', endDraw);

  // Soporte táctil
  canvas.addEventListener('touchstart', (e)=>startDraw(toPoint(e), e), {passive:false});
  canvas.addEventListener('touchmove',  (e)=>draw(toPoint(e), e), {passive:false});
  document.addEventListener('touchend', endDraw);

  // Limpieza
  clearBtn.addEventListener('click', clearCanvas);
});

// Utilidades para coordenadas
function getPos(evt){
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left),
    y: (evt.clientY - rect.top)
  };
}
function toPoint(touchEvent){
  const t = touchEvent.touches[0];
  return { clientX: t.clientX, clientY: t.clientY };
}

// Dibujo básico
function startDraw(posEvt, rawEvt){
  drawing = true;
  const p = posEvt ? getPos(posEvt) : getPos(event);
  lastX = p.x; lastY = p.y;
  if(rawEvt) rawEvt.preventDefault();
}

function draw(posEvt, rawEvt){
  if(!drawing) return;
  const p = posEvt ? getPos(posEvt) : getPos(event);

  ctx.strokeStyle = color.value;
  ctx.lineWidth   = Number(size.value);
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();

  lastX = p.x; lastY = p.y;
  if(rawEvt) rawEvt.preventDefault();
}

function endDraw(){
  drawing = false;
}

function clearCanvas(){
  if (!canvas) return;
  // Eliminar el canvas actual
  host.removeChild(canvas);
  canvas = null;
  ctx = null;
  // Deshabilitar el botón limpiar hasta que se cree de nuevo
  clearBtn.disabled = true;
  // Restablecer controles a valores iniciales
  color.value = '#0d6efd';
  size.value = 4;
  sizeLabel.textContent = '4 px';
  // Opcional: mostrar mensaje de ayuda
  host.textContent = 'Pulsa “Crear lienzo” para empezar a dibujar.';
}
