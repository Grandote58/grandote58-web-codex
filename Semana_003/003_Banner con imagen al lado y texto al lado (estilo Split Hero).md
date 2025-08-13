# 💡MEJORA BANNER

## 🔁 1. **Banner con imagen al lado y texto al lado (estilo "Split Hero")**

> Ideal para destacar el contenido y darle prioridad tanto al texto como a la imagen.

### ✅ Características UX:

- Imagen al **lado derecho o izquierdo** del texto.
- Texto en fondo blanco o semiopaco para máxima legibilidad.
- Perfecto para pantallas grandes.

### 🧱 Estructura sugerida:

```html
<section class="hero d-flex align-items-center">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-6 text-dark">
        <h1 class="fw-bold">Servicios con calidad garantizada 🔧</h1>
        <p class="lead">Expertos en reparación y mantenimiento del hogar.</p>
        <a class="btn btn-warning" href="#">Solicita Cotización</a>
      </div>
      <div class="col-md-6">
        <img src="technician.png" class="img-fluid" alt="Técnico trabajando">
      </div>
    </div>
  </div>
</section>
```

## 🖼️ 2. **Banner con fondo de imagen en slider automático**

> Estilo moderno, dinámico y llamativo, ideal para **resaltar varios servicios o situaciones** sin cambiar los textos o botones.

### ✅ Características UX:

- Imagen de fondo cambia automáticamente (usando Swiper.js o Bootstrap Carousel).
- Texto y botón permanecen fijos.
- Movimiento suave con transición.

### 🧱 Estructura base (con Bootstrap Carousel):

```html
<div id="carouselHero" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active bg-cover" style="background-image: url('slide1.jpg'); height: 100vh;">
      <div class="overlay">
        <div class="text-center text-white">
          <h1>Soluciones técnicas profesionales</h1>
          <a href="#" class="btn btn-warning mt-3">Cotiza Ahora</a>
        </div>
      </div>
    </div>
    <div class="carousel-item bg-cover" style="background-image: url('slide2.jpg'); height: 100vh;">
      <!-- misma estructura interna -->
    </div>
  </div>
</div>
```

### 🎨 CSS adicional:

```css
.bg-cover {
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  background-color: rgba(0,0,0,0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## 🎥 3. **Banner con video de fondo y capa de texto**

> Muy atractivo para **dar contexto visual realista** (ejemplo: herramientas en acción, casas en reparación).

### ✅ Características UX:

- Se percibe como profesional.
- Se puede pausar o silenciar el video.
- Texto legible con fondo oscuro.

### 🧱 Estructura:

```html
<section class="video-hero">
  <video autoplay muted loop class="bg-video">
    <source src="video-reparacion.mp4" type="video/mp4">
  </video>
  <div class="hero-content text-center text-white">
    <h1 class="fw-bold">¡Dale nueva vida a tu hogar!</h1>
    <a href="#" class="btn btn-warning mt-3">Solicita tu diagnóstico</a>
  </div>
</section>
```

### 🎨 CSS:

```css
.video-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.bg-video {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-content {
  position: relative;
  z-index: 1;
  padding-top: 25vh;
}
.video-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 0;
}
```

## 🎯 4. **Banner con imagen estática pero botón animado y textos con efecto tipo máquina de escribir**

> Perfecto para darle vida al contenido sin cambiar la imagen.

### ✅ Características UX:

- Más económico en rendimiento.
- Ideal para sitios sencillos pero elegantes.
- Atención dirigida al botón con animaciones CSS.

### 🧱 HTML:

```html
<section class="hero-sencillo d-flex align-items-center text-white text-center">
  <div class="container">
    <h1 class="titulo-maquina">Soluciones Rápidas y Confiables 🔧</h1>
    <p>Tu hogar merece lo mejor.</p>
    <a href="#" class="btn btn-warning boton-flotante">Contáctanos</a>
  </div>
</section>
```

### 🎨 CSS:

```css
.titulo-maquina {
  overflow: hidden;
  border-right: .15em solid orange;
  white-space: nowrap;
  animation: typing 4s steps(40, end), blink .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}
@keyframes blink {
  50% { border-color: transparent }
}

.boton-flotante {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

## 🧠 Recomendaciones para elegir:



| Objetivo de UX           | Mejor opción                                |
| ------------------------ | ------------------------------------------- |
| Mostrar varios servicios | 🎞️ Slider automático con texto fijo          |
| Profesional y emocional  | 🎥 Video de fondo con llamada clara          |
| Eficiente y moderno      | ⚖️ Imagen + texto a los lados (split layout) |
| Sencillo pero atractivo  | 💬 Efecto texto máquina + botón animado      |