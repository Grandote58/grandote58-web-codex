# 📘 Actividad: **“Lienzo mágico con fondo personalizado”**

### 🎯 Objetivos de aprendizaje

1. **Comprender** cómo crear y eliminar un `<canvas>` dinámicamente en una página web.
2. **Aplicar** estilos y buenas prácticas para diferenciar el área de trabajo y los controles.
3. **Explorar** la posibilidad de añadir un **fondo con imagen** para personalizar la experiencia de usuario.
4. **Practicar** la documentación del código y la autoexplicación como parte del aprendizaje autónomo.

## 📁 Estructura de archivos

```css
canvas-cuadrado/
│  index.html
│  styles.css
│  app.js
```

## 📂 Archivos de trabajo

### 1) `index.html`

Archivo que contiene la **estructura básica de la página **index:

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>🖼️ Lienzo mágico con fondo</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>🖼️ Lienzo mágico</h1>
    <p>Presiona <strong>Crear</strong> para generar un canvas y <strong>Eliminar</strong> para quitarlo.</p>
  </header>

  <main>
    <div class="controls">
      <button id="createBtn">➕ Crear</button>
      <button id="deleteBtn" disabled>🗑️ Eliminar</button>
    </div>

    <!-- Aquí se insertará dinámicamente el canvas -->
    <div id="host" class="host" aria-live="polite">No hay lienzo creado.</div>
  </main>

  <script src="app.js"></script>
</body>
</html>
```

### 2) `styles.css`

Define la **apariencia visual** del entorno styles:

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
header{ text-align:center; padding:16px 12px; }
main{ max-width:800px; margin:0 auto; padding:12px; }

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
  margin-top:12px; min-height:320px;
  display:flex; align-items:center; justify-content:center;
  border:1px dashed var(--line); border-radius:12px;
  color:#6b7280; background:#fff; text-align:center;
}

canvas{
  border:1px solid var(--line);
  border-radius:12px;
  max-width:100%; height:auto; display:block;
  background:#fff url('fondo.png') center/cover no-repeat; /* 🎨 Fondo personalizado */
}
```

👉 Se añadió la línea con `background:url('fondo.png')` para que el **canvas tenga una imagen de fondo**.

### 3) `app.js`

Archivo que contiene la **lógica de creación y eliminación del canvas** app.

Con comentarios didácticos:

```javascript
// 🎯 Referencias a los botones y al contenedor
const createBtn = document.getElementById('createBtn');
const deleteBtn = document.getElementById('deleteBtn');
const host = document.getElementById('host');

let canvas = null; // variable global para guardar el canvas

// 👉 Evento para CREAR el canvas
createBtn.addEventListener('click', () => {
  if (canvas) return; // evita crear más de uno

  // 🖼️ Crear elemento <canvas>
  canvas = document.createElement('canvas');

  // Definir tamaño (con soporte retina-friendly)
  const width = Math.min(800, host.clientWidth - 24);
  const height = 480;
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  // Limpiar texto inicial y agregar canvas al host
  host.textContent = '';
  host.appendChild(canvas);

  // Habilitar el botón de eliminar
  deleteBtn.disabled = false;
});

// 👉 Evento para ELIMINAR el canvas
deleteBtn.addEventListener('click', () => {
  if (!canvas) return;

  // 🔥 Quitar el canvas del DOM
  canvas.remove();
  canvas = null;

  // Restaurar mensaje y deshabilitar botón
  host.textContent = 'No hay lienzo creado.';
  deleteBtn.disabled = true;
});
```

## ✨ Explicación

1. Al presionar **Crear**, se genera dinámicamente un `<canvas>` en el DOM con un tamaño definido.
2. Este canvas ya trae un **fondo con imagen** definido en `styles.css`.
3. Al presionar **Eliminar**, el canvas desaparece y se muestra el texto inicial.
4. El diseño es **responsivo**: el ancho se ajusta según el espacio disponible en pantalla.

## 📝 Preguntas de autoevaluación

1. ¿Por qué usamos `document.createElement('canvas')` en lugar de escribir el `<canvas>` directamente en el HTML?
2. ¿Qué hace la propiedad `background:url('fondo.png') center/cover no-repeat` en el CSS del canvas?
3. ¿Por qué se usa la condición `if (canvas) return;` dentro del evento **Crear**?

## 💡 Práctica de mejora

👉 **Reto adicional:** Cambia la imagen de fondo del canvas.

- Busca o diseña una imagen sencilla (ejemplo: `cielo.png`, `pasto.png`, `montañas.jpg`).

- Reemplaza en `styles.css` la línea:

  ```css
  background:#fff url('fondo.png') center/cover no-repeat;
  ```

  por tu propia imagen.

📸 **Bonus:** Explora y crea la forma de colocar su nombre en la esquina del canvas usando `ctx.fillText(...)`.

## 🎓 Conclusión

Esta práctica enseña lo básico de la manipulación dinámica del DOM, la integración de estilos visuales y la personalización del lienzo. Además, introduce la importancia de documentar el código y reflexionar mediante preguntas.