# 🚗 **Práctica: “Showroom Dinámico de Autos”**

Una **landing page interactiva** que simula un catálogo de vehículos, utilizando los siguientes componentes de Bootstrap 5:

🔁 Carousel
 📂 Dropdowns2
 ❌ Close Button
 🧊 Modal
 💬 Popovers
 📊 Progress Bars

### 🎯 Objetivo

Crear una interfaz moderna e interactiva con Bootstrap 5, usando múltiples componentes visuales para mejorar la experiencia de usuario.

## 🗂️ Estructura de archivos

```css
/autos-bootstrap/
├── index.html
├── /css/
│   └── estilos.css
├── /img/
│   ├── auto1.jpg
│   ├── auto2.jpg
│   └── auto3.jpg
```

## 🧩 Paso a Paso Explicado

### 1️⃣ Base HTML + Bootstrap + Tooltips + Popovers

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Showroom de Autos</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="css/estilos.css" />
</head>
<body data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="70">
```

### 2️⃣ Carousel de vehículos

```html
<div id="carouselAutos" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="img/auto1.jpg" class="d-block w-100" alt="Auto 1" />
    </div>
    <div class="carousel-item">
      <img src="img/auto2.jpg" class="d-block w-100" alt="Auto 2" />
    </div>
    <div class="carousel-item">
      <img src="img/auto3.jpg" class="d-block w-100" alt="Auto 3" />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselAutos" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselAutos" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>
```

### 3️⃣ Dropdown de modelos por marca

```html
<div class="dropdown my-4 text-center">
  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
    Selecciona Marca
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Toyota</a></li>
    <li><a class="dropdown-item" href="#">Chevrolet</a></li>
    <li><a class="dropdown-item" href="#">Ford</a></li>
  </ul>
</div>
```

### 4️⃣ Botón con cierre ❌ y modal informativo

```html
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  🚨 Promoción por tiempo limitado en autos eléctricos.
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>

<!-- Modal -->
<div class="text-center">
  <button class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalInfo">Ver más info</button>
</div>

<div class="modal fade" id="modalInfo" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">🚗 Detalles del modelo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        Motor híbrido, autonomía de 600km y velocidad máxima de 220km/h.
      </div>
      <div class="modal-footer">
        <button class="btn btn-success">¡Reservar ahora!</button>
      </div>
    </div>
  </div>
</div>
```

### 5️⃣ Popovers sobre íconos informativos

```html
<div class="text-center my-4">
  <button type="button" class="btn btn-secondary" data-bs-toggle="popover" title="Info técnica"
    data-bs-content="Este modelo incluye frenos ABS, pantalla 10'', cámara trasera y más.">
    ℹ️ Especificaciones
  </button>
</div>
```

🧠 *Inicialización con JavaScript:*

```javascript
<script>
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(el => new bootstrap.Popover(el));
</script>
```

### 6️⃣ Barra de progreso del proceso de compra

```html
<div class="container my-5">
  <h4>🛒 Proceso de compra</h4>
  <div class="progress">
    <div class="progress-bar progress-bar-striped bg-success" style="width: 70%">
      70% Completado
    </div>
  </div>
</div>
```

### 🔚 Scripts Finales

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## 🧠 ¿Qué se aprende con esta práctica?

✅ Integrar múltiples componentes de Bootstrap 5 en un mismo sitio

✅ Controlar interacciones avanzadas como modales, alertas y popovers

✅ Aplicar buenas prácticas de diseño responsivo

✅ Crear experiencias UX dinámicas y atractivas