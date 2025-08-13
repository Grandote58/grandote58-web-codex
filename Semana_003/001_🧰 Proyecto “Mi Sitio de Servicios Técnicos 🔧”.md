![Portada](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_002/assets/Mesa%20de%20trabajo%201HtmlTypota.png)


# **🧰 Proyecto “Mi Sitio de Servicios Técnicos 🔧”**

## 🧩 Paso 1: Preparar tu entorno de trabajo

### 🎯 ¿Qué vas a hacer?

Organizar las carpetas y archivos básicos del proyecto web.

### ✅ Acciones:

1. Crea una carpeta llamada: `handyman-web`.
2. Dentro crea:
   - `index.html` → aquí irá todo el contenido de la página.
   - `style.css` → donde escribiremos los estilos personalizados.
3. Abre tu proyecto en **Visual Studio Code** o tu editor favorito.

## 🧩 Paso 2: Crear la estructura base en HTML5

### 🎯 ¿Qué vas a hacer?

Diseñar el esqueleto de la página usando etiquetas semánticas: `<header>`, `<nav>`, `<section>`, `<footer>`.

### ✅ Código base en `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Servicios Técnicos</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Enlace a Bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Enlace a tu CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- Aquí irán las secciones -->

</body>
</html>
```

## 🧩 Paso 3: Agregar la barra superior de contacto

### 🎯 ¿Qué vas a hacer?

Crear una barra con horario y correo de contacto usando Bootstrap.

```html
<header class="bg-warning text-white py-2 text-center small">
  <p class="mb-0">📧 info@example.com | ⏰ Sáb - Jue: 8:00 am - 7:00 pm</p>
</header>
```

## 🧩 Paso 4: Crear el menú de navegación

### 🎯 ¿Qué vas a hacer?

Agregar un menú con enlaces simulados y un logo simple.

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
  <div class="container">
    <a class="navbar-brand fw-bold text-warning" href="#">🛠️ HANDSYMAN</a>
    <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="menu">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="#">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Servicios</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Proyectos</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Contacto</a></li>
      </ul>
    </div>
  </div>
</nav>
```

## 🧩 Paso 5: Crear el banner principal (hero)

### 🎯 ¿Qué vas a hacer?

Diseñar una sección con imagen de fondo, mensaje impactante y botón de llamada a la acción.

```html
<section class="seccion-hero d-flex align-items-center text-white text-center">
  <div class="container">
    <h1 class="display-4 fw-bold">🔧 Reparación de Calidad</h1>
    <p class="lead">Tu hogar en las mejores manos: seguro, eficiente y como nuevo.</p>
    <a href="#" class="btn btn-warning mt-3 fw-bold">Solicita Cotización</a>
  </div>
</section>
```

### 🧾 CSS correspondiente en `style.css`

```css
.seccion-hero {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  height: 90vh;
  position: relative;
}

.seccion-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.seccion-hero .container {
  position: relative;
  z-index: 1;
}
```

## 🧩 Paso 6: Crear la sección de beneficios

### 🎯 ¿Qué vas a hacer?

Mostrar 3 ventajas del servicio con íconos y texto.

```html
<section class="py-5 text-center bg-light">
  <div class="container">
    <div class="row g-4">
      <div class="col-md-4">
        <h5>💰 Precios Justos</h5>
        <p>Soluciones accesibles y garantizadas.</p>
      </div>
      <div class="col-md-4">
        <h5>💎 Servicio Premium</h5>
        <p>Técnicos capacitados con alto nivel de calidad.</p>
      </div>
      <div class="col-md-4">
        <h5>🕒 Soporte 24/7</h5>
        <p>¡Siempre disponibles para ayudarte!</p>
      </div>
    </div>
  </div>
</section>
```

## 🧩 Paso 7: Sección de tarjetas de servicios

### 🎯 ¿Qué vas a hacer?

Mostrar servicios ofrecidos con tarjetas y botones.

```html
<section class="py-5 text-center">
  <div class="container">
    <h2 class="fw-bold mb-4">Nuestros Servicios</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
          <img src="plomeria.jpg" class="card-img-top" alt="Plomería">
          <div class="card-body">
            <h5 class="card-title">Plomería</h5>
            <p class="card-text">Reparación de tuberías y griferías con garantía.</p>
            <a href="#" class="btn btn-outline-warning">Ver más</a>
          </div>
        </div>
      </div>
      <!-- Repite la estructura para otros 2 servicios -->
    </div>
  </div>
</section>
```

## 🧩 Paso 8: Footer con información de contacto

```html
<footer class="bg-dark text-white py-4">
  <div class="container text-center">
    <p class="mb-1">📞 (012) 345-67-89 | 📍 Brooklyn, NY</p>
    <small>© 2025 HANDSYMAN - Todos los derechos reservados.</small>
  </div>
</footer>
```

## 🧩 Paso 9: Agrega Bootstrap JS al final del `body`

```javascript
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

# ✅ Resultado Final Esperado

- Diseño profesional y adaptado a pantallas pequeñas.
- Estructura clara, jerárquica y accesible.
- Navegación, contenido visual y llamado a la acción funcionales.


![Pie](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_002/assets/Recurso%201PiePagina.png)
