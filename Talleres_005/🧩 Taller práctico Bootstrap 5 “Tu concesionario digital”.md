# **🧩 Taller práctico Bootstrap 5: “Tu concesionario digital”**

### 🎯 Objetivo:

Crear una landing page para venta de vehículos con las siguientes secciones:

1. **Inicio** (banner atractivo + CTA)
2. **Catálogo de vehículos**
3. **Testimonios de clientes**
4. **Formulario de contacto**
5. **Footer con redes sociales**

## 🗂️ Estructura del proyecto

```css
/landing-vehiculos/
├── index.html
├── /css/
│   └── estilos.css
├── /img/
│   ├── logo.png
│   ├── banner.jpg
│   ├── auto1.jpg
│   ├── auto2.jpg
│   └── cliente1.jpg
```

## ✍️ Paso a paso explicado

### ✅ Paso 1: Estructura base del archivo `index.html`



```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Autos Premium</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>
```

### ✅ Paso 2: Menú de navegación fijo (con logo e íconos)



```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
  <div class="container">
    <a class="navbar-brand" href="#">
      <img src="img/logo.png" alt="Logo" width="40"> Autos Premium
    </a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menuNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="menuNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a href="#catalogo" class="nav-link">Catálogo</a></li>
        <li class="nav-item"><a href="#testimonios" class="nav-link">Testimonios</a></li>
        <li class="nav-item"><a href="#contacto" class="nav-link">Contacto</a></li>
      </ul>
    </div>
  </div>
</nav>
```

🧠 **Explicación**:

- `sticky-top`: mantiene el menú fijo al hacer scroll
- `navbar-toggler`: convierte el menú en "hamburguesa" en móviles
- `img`: muestra el logo del negocio

### ✅ Paso 3: Banner de inicio (hero)



```html
<header class="hero d-flex align-items-center text-white text-center">
  <div class="container">
    <h1 class="display-4">🚗 Encuentra tu vehículo ideal</h1>
    <p class="lead">Conduce con estilo, potencia y seguridad</p>
    <a href="#catalogo" class="btn btn-primary btn-lg mt-3">Ver vehículos</a>
  </div>
</header>
```

🎨 **CSS en `estilos.css`**:

```css
.hero {
  height: 90vh;
  background-image: url('../img/banner.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
}
.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 0;
}
.hero .container {
  position: relative;
  z-index: 1;
}
```

### ✅ Paso 4: Sección Catálogo de vehículos



```html
<section id="catalogo" class="py-5 bg-light">
  <div class="container">
    <h2 class="text-center mb-4">🚙 Catálogo de Vehículos</h2>
    <div class="row g-4">
      <!-- Tarjeta 1 -->
      <div class="col-md-4">
        <div class="card h-100">
          <img src="img/auto1.jpg" class="card-img-top" alt="Vehículo 1">
          <div class="card-body">
            <h5 class="card-title">Toyota Hilux</h5>
            <p class="card-text">4x4 Turbo, Diesel, ideal para todo terreno.</p>
            <span class="badge bg-success">$95.000.000</span>
          </div>
        </div>
      </div>
      <!-- Repetir para más autos -->
    </div>
  </div>
</section>
```

🧠 **Explicación**:

- Uso de `card` de Bootstrap para tarjetas.
- `badge` para mostrar precios.
- `g-4`: separa tarjetas con “gutter” (espaciado horizontal y vertical).

### ✅ Paso 5: Sección de testimonios (carousel de Bootstrap)



```
<section id="testimonios" class="py-5">
  <div class="container">
    <h2 class="text-center mb-4">❤️ Testimonios</h2>
    <div id="carouselTestimonios" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active text-center">
          <img src="img/cliente1.jpg" class="rounded-circle mb-3" width="100" alt="Cliente feliz">
          <blockquote class="blockquote">
            <p>“El mejor servicio y el mejor carro que he tenido. ¡Gracias!”</p>
          </blockquote>
          <footer class="blockquote-footer">Ana Gómez</footer>
        </div>
        <!-- Agregar más items -->
      </div>
      <button class="carousel-control-prev" data-bs-target="#carouselTestimonios" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" data-bs-target="#carouselTestimonios" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  </div>
</section>
```

### ✅ Paso 6: Formulario de contacto

```html
<section id="contacto" class="py-5 bg-light">
  <div class="container">
    <h2 class="text-center mb-4">📬 Contáctanos</h2>
    <form class="row g-3">
      <div class="col-md-6">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre" required>
      </div>
      <div class="col-md-6">
        <label for="correo" class="form-label">Correo</label>
        <input type="email" class="form-control" id="correo" required>
      </div>
      <div class="col-12">
        <label for="mensaje" class="form-label">Mensaje</label>
        <textarea class="form-control" id="mensaje" rows="4" required></textarea>
      </div>
      <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary">Enviar mensaje</button>
      </div>
    </form>
  </div>
</section>
```

### ✅ Paso 7: Footer con redes sociales



```html
<footer class="bg-dark text-white text-center py-4">
  <p>© 2025 Autos Premium. Todos los derechos reservados.</p>
  <div>
    <a href="#" class="text-white me-3">Facebook</a>
    <a href="#" class="text-white me-3">Instagram</a>
    <a href="#" class="text-white">WhatsApp</a>
  </div>
</footer>
```

## 🔁 Animaciones opcionales en CSS

Agrega al final de `estilos.css`:

```css
.card:hover {
  transform: scale(1.02);
  transition: transform 0.3s ease-in-out;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
```

## 📋 Evaluación sugerida

| Criterio                         | Peso (%) |
| -------------------------------- | -------- |
| Correcta estructura de Bootstrap | 30%      |
| Diseño responsive completo       | 20%      |
| Uso de componentes diversos      | 20%      |
| Formularios y navegación         | 15%      |
| Estilo visual y animaciones      | 15%      |