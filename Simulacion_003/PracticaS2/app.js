const createBtn = document.getElementById('createBtn');
const deleteBtn = document.getElementById('deleteBtn');
const host = document.getElementById('host');

let canvas = null; // referencia al canvas creado

createBtn.addEventListener('click', () => {
  // Evita crear más de uno
  if (canvas) return;

  // Crea el elemento <canvas>
  canvas = document.createElement('canvas');

  // Tamaño visual y “retina-friendly”
  const width = Math.min(800, host.clientWidth - 24);
  const height = 480;
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Mensaje fuera y añadimos el canvas
  host.textContent = '';
  host.appendChild(canvas);

  // Habilita Eliminar
  deleteBtn.disabled = false;
});

deleteBtn.addEventListener('click', () => {
  if (!canvas) return;

  // Quita el lienzo del DOM
  canvas.remove();
  canvas = null;

  // Mensaje de vacío y deshabilita Eliminar
  host.textContent = 'No hay lienzo creado.';
  deleteBtn.disabled = true;
});
