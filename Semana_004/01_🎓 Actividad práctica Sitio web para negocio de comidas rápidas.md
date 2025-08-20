![Portada](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_002/assets/Mesa%20de%20trabajo%201HtmlTypota.png)

# 🎓 **Actividad práctica**: Sitio web para negocio de comidas rápidas

## 🧩 Objetivo de la actividad

- Diseñar una **página web completa** con secciones de inicio, productos y contacto.
- Implementar **HTML5 optimizado y etiquetas semánticas**.
- Utilizar **Bootstrap 5** para lograr un diseño totalmente **responsive y atractivo**.
- Aplicar estilos propios desde una hoja CSS con etiquetas.
- Desarrollar una **experiencia de usuario moderna** a través de tarjetas y formularios interactivos.

## 🗂️ Estructura de carpetas y archivos

```css
/fastfood-website/
├── index.html           ← Página de inicio
├── productos.html       ← Página de productos
├── contacto.html        ← Página de contacto
├── /css/
│   └── estilos.css      ← Hoja de estilos personalizada
├── /img/
│   ├── logo.png         ← Logo del sitio
│   ├── hamburguesa.png  ← Imagen ejemplo para producto
│   ├── pizza.png
│   └── perrocaliente.png
└── /js/
    └── script.js        ← (opcional para interacciones futuras)
```

## 🧱 Paso a paso por página

### 📄 1. **Página de inicio: `index.html`**

#### ✅ Objetivo:

Crear la estructura base con HTML5, incluir el logo, menú de navegación responsivo y una bienvenida atractiva.

#### 🔧 Contenido clave:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Inicio - FastFood Express</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

  <!-- 🔸 Menú de navegación -->
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img src="img/logo.png" alt="Logo" width="50"> FastFood Express
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menuPrincipal">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Inicio</a></li>
            <li class="nav-item"><a class="nav-link" href="productos.html">Productos</a></li>
            <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <!-- 🔹 Contenido de bienvenida -->
<section class="seccion caja-fondo text-center">
  <div class="container">
    <h1 class="titulo-seccion">¡Bienvenido a FastFood Express! 🍔</h1>
    <p class="lead">Delicias rápidas, sabor inolvidable. Revisa nuestros productos o contáctanos.</p>
    <a href="productos.html" class="btn btn-warning mt-3">Ver menú</a>
  </div>
</section>

</body>
</html>
```

### 📄 2. **Página de productos: `productos.html`**

#### ✅ Objetivo:

Crear tarjetas de producto con imagen, nombre, descripción y precio. Agregar sección de 3 o 6 productos usando Bootstrap Grid.

#### 🔧 Contenido clave:

```html
<!-- Tarjeta individual personalizada -->
<section class="seccion text-center">
  <div class="container caja-fondo">
    <h2 class="titulo-seccion">Producto destacado 🍕</h2>
    <div class="card mx-auto card-producto" style="width: 22rem;">
      <img src="img/pizza.png" class="card-img-top" alt="Pizza especial">
      <div class="card-body">
        <h5 class="card-title">Pizza Suprema</h5>
        <p class="card-text">Con pepperoni, queso doble y orilla rellena.</p>
        <p class="precio">$18.000</p>
        <a href="#" class="btn btn-warning">Pedir ahora</a>
      </div>
    </div>
  </div>
</section>

<!-- Sección de varias tarjetas -->
<section class="seccion text-center bg-light">
  <div class="container">
    <h2 class="titulo-seccion">Otros productos 🍟</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 card-producto">
          <img src="img/hamburguesa.png" class="card-img-top" alt="Hamburguesa">
          <div class="card-body">
            <h5 class="card-title">Hamburguesa BBQ</h5>
            <p class="card-text">Carne a la parrilla, queso cheddar y salsa BBQ.</p>
            <p class="precio">$15.000</p>
            <a href="#" class="btn btn-warning">Añadir</a>
          </div>
        </div>
      </div>
      <!-- Repetir para más productos -->
    </div>
  </div>
</section>
```

#### 🎨 Fragmento de `estilos.css` (comentado en español):

```css
/* 🎨 Fondo general */
body {
  background-color: #fffaf2;
  color: #1b1f3b;
  font-family: 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
}

/* 🟨 Estilo para secciones principales */
.seccion {
  padding: 60px 20px;
}

/* 🧱 Contenedores con fondo y sombra */
.caja-fondo {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  padding: 20px;
  margin-bottom: 40px;
}

/* 🟠 Estilo para los precios de producto */
.precio {
  font-size: 1.3rem;
  color: #f25c05;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 🧈 Botones generales */
.btn-warning {
  background-color: #f25c05;
  border: none;
}
.btn-warning:hover {
  background-color: #d94c00;
}

/* 🧱 Márgenes personalizados para secciones */
.mt-seccion {
  margin-top: 80px;
}
.mb-seccion {
  margin-bottom: 80px;
}

/* 🔖 Titulares estilizados */
.titulo-seccion {
  font-size: 2.2rem;
  color: #278ce7;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
}

/* 🖼 Tarjetas de producto */
.card-producto {
  transition: transform 0.3s ease;
}
.card-producto:hover {
  transform: scale(1.02);
}

```

### 📄 3. **Página de contacto: `contacto.html`**

#### ✅ Objetivo:

Crear un formulario con Bootstrap para recibir datos de contacto.

#### 🔧 Contenido clave:

```css
<section class="seccion bg-light">
  <div class="container caja-fondo">
    <h2 class="titulo-seccion">📬 Contáctanos</h2>
    <form>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre completo</label>
        <input type="text" class="form-control" id="nombre" placeholder="Tu nombre completo">
      </div>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo electrónico</label>
        <input type="email" class="form-control" id="correo" placeholder="correo@ejemplo.com">
      </div>
      <div class="mb-3">
        <label for="mensaje" class="form-label">Mensaje</label>
        <textarea class="form-control" id="mensaje" rows="4" placeholder="Escribe tu mensaje aquí..."></textarea>
      </div>
      <button type="submit" class="btn btn-warning">Enviar mensaje</button>
    </form>
  </div>
</section>

```

## ✅ Resultado de mejora UX/UI

| Elemento visual    | Mejora aplicada                                             |
| ------------------ | ----------------------------------------------------------- |
| Fondo              | Color neutro suave con secciones diferenciadas (`bg-light`) |
| Espaciado          | Márgenes y paddings personalizados (`.seccion`, `.mt-3`)    |
| Tipografía y color | Fuente clara, colores accesibles y bien contrastados        |
| Tarjetas           | Sombra, borde redondeado, hover suave (`transform: scale`)  |
| Botones            | Colores de marca, sin bordes y con efecto `hover`           |

## 🧠 Recomendaciones

| Elemento                | Evaluar                                                 |
| ----------------------- | ------------------------------------------------------- |
| Estructura de carpetas  | Cumple con estándares y buenas prácticas                |
| Navegación responsiva   | Se comporta bien en móvil y escritorio                  |
| Uso semántico de HTML5  | Etiquetas `<header>`, `<section>`, `<footer>` correctas |
| Aplicación de Bootstrap | Clases bien aplicadas, uso de grid, botones y tarjetas  |
| Personalización con CSS | Hoja de estilos externa con comentarios en español      |
| Formularios             | Bien estructurados, campos claros y botones funcionales |

![Pie](D:\Bakup_2025\HTML5\Semana_004\assets\Recurso 1PiePagina-1755712931482-1.png)