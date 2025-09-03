# **🌺 Práctica Web: “Floralia — Belleza que florece”**

### 🎯 Objetivo:

Diseñar una landing page moderna y funcional para una floristería con animaciones visuales y elementos interactivos, fomentando la experiencia de usuario (UX).

## 🗂️ Estructura del Proyecto

```css
/floralia/
├── index.html
├── /css/
│   └── estilos.css
├── /img/
│   ├── logo.png
│   ├── flores1.jpg
│   ├── flores2.jpg
│   └── flores3.jpg
```

## 🧩 Paso a paso explicado

### ✅ 1. HTML base con Bootstrap 5 y enlaces

```css
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Floralia</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="css/estilos.css" />
</head>
<body>
```

### ✅ 2. Menú transparente + logo 🌸

```html
<nav class="navbar navbar-expand-lg navbar-light fixed-top bg-transparent">
  <div class="container">
    <a class="navbar-brand text-white" href="#">
      <img src="img/logo.png" alt="Floralia" width="40" /> Floralia
    </a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="menu">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link text-white" href="#productos">Productos</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#contacto">Contacto</a></li>
      </ul>
    </div>
  </div>
</nav>
```

🧠 *El menú es transparente para dejar ver la imagen del banner y cambia a blanco al hacer scroll si lo deseas.*

### ✅ 3. Banner con animación suave

```html
<header class="hero text-center text-white d-flex align-items-center">
  <div class="container">
    <h1 class="display-4 animate__animated animate__fadeInDown">🌷 Floralia</h1>
    <p class="lead animate__animated animate__fadeInUp">Explora la belleza de nuestras flores</p>
    <a href="#productos" class="btn btn-outline-light btn-lg mt-3">Ver catálogo</a>
  </div>
</header>
```

🎨 CSS `estilos.css`:

```css
.hero {
  height: 100vh;
  background-image: url('../img/flores1.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 0;
}
.hero .container {
  z-index: 1;
  position: relative;
}
```

### ✅ 4. Sección de productos con tarjetas animadas

```html
<section id="productos" class="py-5">
  <div class="container">
    <h2 class="text-center mb-5">💐 Nuestros Arreglos Florales</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card producto shadow-sm hover-zoom">
          <img src="img/flores2.jpg" class="card-img-top" alt="Flor 1">
          <div class="card-body">
            <h5 class="card-title">Ramo Romántico</h5>
            <p class="card-text">Ideal para sorprender a tu persona especial.</p>
            <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#modalFlor1">Ver más</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

🎨 Animaciones CSS:

```css
.hover-zoom:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
.card {
  transition: all 0.3s ease;
}
```

### ✅ 5. Modal (ventana emergente)

```html
<div class="modal fade" id="modalFlor1" tabindex="-1" aria-labelledby="modalFlor1Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalFlor1Label">🌹 Ramo Romántico</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <img src="img/flores2.jpg" class="img-fluid mb-3" alt="">
        <p>Incluye rosas, lirios y follaje fino. Envío gratis en la ciudad.</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-success">Agregar al carrito</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
```

### ✅ 6. Formulario de contacto

```html
<section id="contacto" class="bg-light py-5">
  <div class="container">
    <h2 class="text-center">📬 Contáctanos</h2>
    <form class="row g-3 mt-4">
      <div class="col-md-6">
        <label class="form-label">Nombre</label>
        <input type="text" class="form-control" required>
      </div>
      <div class="col-md-6">
        <label class="form-label">Correo</label>
        <input type="email" class="form-control" required>
      </div>
      <div class="col-12">
        <label class="form-label">Mensaje</label>
        <textarea class="form-control" rows="4" required></textarea>
      </div>
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary">Enviar</button>
      </div>
    </form>
  </div>
</section>
```

## 📎 Scripts al final del HTML

```css
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

## ✅ Resultado esperado

- Menú transparente y adaptable 📱
- Banner atractivo con imagen + texto + animación 👀
- Tarjetas con animación al pasar el mouse ✨
- Ventanas emergentes al hacer clic en “Ver más” 🔍
- Formulario funcional y responsivo 📨