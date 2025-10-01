const createBtn = document.getElementById('createBtn');
const deleteBtn = document.getElementById('deleteBtn');
const host = document.getElementById('host');

const color = document.getElementById('color');
const size = document.getElementById('size');
const sizeLabel = document.getElementById('sizeLabel');

let canvas = null;
let ctx = null;

// Dibuja el cuadrado en la parte inferior
function drawSquare() {
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0,0,w,h);

  const sqSize = Number(size.value);
  const sqColor = color.value;

  ctx.fillStyle = sqColor;
  // Ubicar el cuadrado centrado horizontal, abajo del canvas
  ctx.fillRect(
    (w/2 - sqSize/2),   // x centrado
    h - sqSize - 20,    // y a 20px del borde inferior
    sqSize,
    sqSize
  );
}

// Crear canvas
createBtn.addEventListener('click', () => {
  if (canvas) return;

  // Reiniciar tamaño del cuadrado a 80
  size.value = 80;
  sizeLabel.textContent = '80 px';

  canvas = document.createElement('canvas');
  const width = Math.min(800, host.clientWidth - 24);
  const height = 400;
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  ctx = canvas.getContext('2d');
  host.textContent = '';
  host.appendChild(canvas);

  deleteBtn.disabled = false;
  drawSquare();
});

// Eliminar canvas
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

// Actualizar tamaño del label
size.addEventListener('input', () => {
  sizeLabel.textContent = `${size.value} px`;
  drawSquare();
});
color.addEventListener('input', drawSquare);
