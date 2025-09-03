# **🌸 Práctica: “Landing Page – Perfumes Encanto Natural”**

🧼💐✨ Con componentes interactivos y responsivos de Bootstrap 5

### 🎯 Objetivo de la práctica

- Aplicar componentes interactivos de Bootstrap 5 para mejorar la experiencia de usuario (UX).
- Desarrollar una landing page para un producto real: Perfumes artesanales con secciones interactivas.

### 📁 Estructura de archivos

```css
/perfumes-bootstrap/
├── index.html
├── /css/
│   └── estilos.css
├── /img/
│   ├── perfume1.jpg
│   └── perfume2.jpg
```

## 🧩 Paso a Paso Detallado

### 1️⃣ Estructura base HTML + Bootstrap

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Perfumes Encanto Natural</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="css/estilos.css" />
</head>
<body class="bg-light">
```

### 2️⃣ Encabezado y botón de alerta informativa

```html
<header class="text-center p-4 bg-white shadow-sm">
  <h1>🌸 Encanto Natural</h1>
  <p>Perfumes artesanales hechos con amor y flores naturales</p>
</header>

<div class="alert alert-info alert-dismissible fade show mx-4 mt-3" role="alert">
  🌿 ¡Oferta del mes! 20% en la línea floral. Válido hasta fin de mes.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
</div>
```

### 3️⃣ Botonera con categorías de perfumes (Button Group)

```html
<div class="container text-center mt-4">
  <div class="btn-group" role="group" aria-label="Categorías">
    <button type="button" class="btn btn-outline-secondary">🌺 Florales</button>
    <button type="button" class="btn btn-outline-secondary">🍋 Cítricos</button>
    <button type="button" class="btn btn-outline-secondary">🌲 Amaderados</button>
  </div>
</div>
```

### 4️⃣ Sección colapsable (descripción extendida)

```html
<div class="container text-center mt-5">
  <p>
    <a class="btn btn-success" data-bs-toggle="collapse" href="#descripcionPerfume" role="button" aria-expanded="false" aria-controls="descripcionPerfume">
      Leer más sobre nuestra fragancia 🌼
    </a>
  </p>
  <div class="collapse" id="descripcionPerfume">
    <div class="card card-body">
      Nuestra fragancia estrella mezcla pétalos de rosa, lavanda silvestre y esencias cítricas para una experiencia inolvidable.
    </div>
  </div>
</div>
```

### 5️⃣ Modal para mostrar detalles de compra

```html
<div class="text-center mt-4">
  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalCompra">
    Ver opciones de compra 💳
  </button>
</div>

<!-- Modal -->
<div class="modal fade" id="modalCompra" tabindex="-1" aria-labelledby="modalCompraLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">🌸 Compra tu perfume</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <p>Escoge entre nuestras presentaciones:</p>
        <ul>
          <li>🎁 30 ml – $30.000</li>
          <li>🎁 50 ml – $45.000</li>
          <li>🎁 100 ml – $70.000</li>
        </ul>
        <p>🚚 Envíos a todo Colombia en 48 horas.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-success">Agregar al carrito 🛒</button>
      </div>
    </div>
  </div>
</div>
```

### 🔚 Scripts Bootstrap

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## 🧠 Resultado Esperado

🎯 Una landing page estética, funcional y responsiva, con interacción directa en:

- **Alertas** de promoción
- **Botones agrupados** para filtrar categorías
- **Colapsables** para ampliar información
- **Ventanas emergentes (modales)** para procesos de compra