![Portada](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_002/assets/Mesa%20de%20trabajo%201HtmlTypota.png)

# 🎓 **Actividad práctica**: Sitio web de jabones artesanales – "Aromarte"

## 🎯 Objetivo de aprendizaje

- Crear un sitio web para una tienda de jabones artesanales con:
  - Páginas: **inicio**, **productos** y **contacto**
  - Estructura organizada y semántica con HTML5
  - Diseño responsivo con Bootstrap 5
  - Estilos personalizados en CSS comentado en español
  - **Animaciones suaves con CSS** para tarjetas, botones y transiciones

## 🗂️ Estructura de carpetas y archivos

```css
/aromarte/
├── index.html
├── productos.html
├── contacto.html
├── /css/
│   └── estilos.css
├── /img/
│   ├── logo.png
│   ├── lavanda.jpg
│   ├── carbon.jpg
│   ├── menta.jpg
└── /js/
    └── script.js (opcional)
```

## 📄 index.html (Inicio)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inicio - Aromarte</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

  <!-- Navegación con logo -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <img src="img/logo.png" width="50" alt="Logo"> Aromarte
      </a>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="menu">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="productos.html">Productos</a></li>
          <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Banner con animación -->
  <header class="banner d-flex align-items-center text-white text-center">
    <div class="container">
      <h1 class="display-4 animate-fade">Bienvenido a Aromarte 🌿</h1>
      <p class="lead animate-slide">La belleza comienza con el cuidado natural</p>
      <a href="productos.html" class="btn btn-outline-light mt-3 animate-bounce">Ver Catálogo</a>
    </div>
  </header>

</body>
</html>
```

## 📄 productos.html (Catálogo)

```html
<section class="container seccion text-center">
  <h2 class="titulo-seccion">Nuestros jabones artesanales</h2>
  <div class="row g-4">
    <div class="col-md-4">
      <div class="card producto animate-grow">
        <img src="img/lavanda.jpg" class="card-img-top" alt="Jabón de lavanda">
        <div class="card-body">
          <h5 class="card-title">Lavanda Relajante</h5>
          <p class="card-text">Relaja tus sentidos con aroma floral</p>
          <p class="precio">$12.000</p>
          <a href="#" class="btn btn-success">Comprar</a>
        </div>
      </div>
    </div>
    <!-- Repetir para carbón activado y menta -->
  </div>
</section>
```

## 📄 contacto.html (Formulario)

```html
<section class="container seccion text-center">
  <h2 class="titulo-seccion">Contáctanos</h2>
  <form class="text-start bg-light p-4 rounded shadow-sm">
    <div class="mb-3">
      <label for="nombre" class="form-label">Nombre</label>
      <input type="text" class="form-control" id="nombre" required>
    </div>
    <div class="mb-3">
      <label for="correo" class="form-label">Correo electrónico</label>
      <input type="email" class="form-control" id="correo" required>
    </div>
    <div class="mb-3">
      <label for="mensaje" class="form-label">Mensaje</label>
      <textarea class="form-control" id="mensaje" rows="4"></textarea>
    </div>
    <button type="submit" class="btn btn-success animate-bounce">Enviar</button>
  </form>
</section>
```

## 🎨 css/estilos.css (estilos con animaciones)

```css
/* 🎨 General */
body {
  background-color: #fffaf5;
  font-family: 'Segoe UI', sans-serif;
  color: #1b1f3b;
}

/* 🟢 Títulos */
.titulo-seccion {
  color: #278ce7;
  font-weight: 700;
  margin-bottom: 30px;
}

/* 💫 Banner animado */
.banner {
  background-image: url('../img/lavanda.jpg');
  background-size: cover;
  background-position: center;
  height: 90vh;
  position: relative;
}
.banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}
.banner .container {
  position: relative;
  z-index: 1;
}

/* ✨ Animaciones */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes slideUp {
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@keyframes grow {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.animate-fade {
  animation: fadeIn 2s ease forwards;
}
.animate-slide {
  animation: slideUp 2s ease forwards;
}
.animate-bounce {
  animation: bounce 1.5s infinite;
}
.animate-grow {
  animation: grow 1s ease-out forwards;
}

/* 🧼 Tarjetas de producto */
.card.producto {
  transition: transform 0.3s;
}
.card.producto:hover {
  transform: scale(1.03);
}

.precio {
  color: #f25c05;
  font-weight: bold;
  font-size: 1.2rem;
}
```

## ✅ Resultado esperado

| Página    | Contenido clave                               | UX visual mejorado con…                 |
| --------- | --------------------------------------------- | --------------------------------------- |
| Inicio    | Logo, menú responsivo, banner animado         | `fade`, `slide`, `bounce`, fondo oscuro |
| Productos | Tarjetas responsivas con animación de entrada | `grow`, `hover`, tarjetas animadas      |
| Contacto  | Formulario estilizado con Bootstrap           | Fondo claro, botón con `bounce`         |

## 🧠 Actividad de clase sugerida

- **Duración**: 2 sesiones (3 horas)
- **Evaluación**:
  - Uso correcto de animaciones y estructura (`30%`)
  - Diseño responsivo y organización visual (`30%`)
  - Código ordenado y comentarios en CSS (`20%`)
  - Originalidad en productos e imágenes (`20%`)

![Pie](D:\Bakup_2025\HTML5\Semana_004\assets\Recurso 1PiePagina.png)