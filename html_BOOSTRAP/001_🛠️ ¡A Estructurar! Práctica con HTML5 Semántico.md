# **🛠️ ¡A Estructurar! Práctica con HTML5 Semántico**

## **PRACTICA 001 HTML**

```html
<div class="header-principal">
  <img src="logo.png" alt="Mi Empresa">
  <div class="menu-navegacion">
    <a href="/">Inicio</a> | <a href="/productos">Productos</a>
  </div>
</div>
<div class="contenido-central">
  <h1>Bienvenido a Nuestros Productos</h1>
  <p>Descripción principal...</p>
</div>
<div class="barra-lateral">
  <h3>Noticias</h3>
  <p>Última noticia aquí...</p>
</div>
<div class="pie-pagina">
  <p>Copyright 2025</p>
</div>


```

**Cámbialo a esta Estructura**

```html
<body>
  <header>
    </header>

  <main>
    </main>

  <aside>
    </aside>

  <footer>
    </footer>
</body>
```

**Reflexión:** 🤔 ¿Por qué es importante que solo haya un elemento `<main>` por página?.

## **PRACTICA 002 HTML**

```html
<div>
  <h2>Mi Viaje a la Costa</h2>
  <p>Publicado el 26/10/2025</p>

  <div>
    <h3>Primer Día: La Llegada</h3>
    <p>El sol brillaba cuando llegamos...</p>
    <div>
      <img src="playa.jpg" alt="Playa soleada">
      <span>Foto 1: Una vista increíble de la playa.</span>
    </div>
  </div>

  <div>
    <h3>Segundo Día: Explorando</h3>
    <p>Decidimos explorar el pueblo...</p>
  </div>

  <p>Etiquetas: viajes, costa, 2025</p>
</div>
```

**Cámbialo a esta Estructura**

```html
<article>
      <header>
      </header>

      <section>
         <figure>
         </figure>
      </section>

      <section>
      </section>

      <footer>
      </footer>
    
</article>
```

**Reflexión:** 💡 ¿Cuándo usarías `<section>` dentro de un `<article>` y cuándo usarías varios `<article>` dentro de una `<section>` principal?

# **🚀 Desafío Práctico: Refactorizando a Semántico con VS Code**

Ahora aplicarás todo lo aprendido en un ejercicio completo. Transforma una estructura HTML básica y no semántica en una versión semántica usando Visual Studio Code.

**Código Inicial (No Semántico):**


```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Blog Simple</title>
    <link rel="stylesheet" href="style.css"> </head>
<body>
    <div class="encabezado-pagina">
        <h1>Blog de Noticias Tecnológicas</h1>
        <div class="navegacion-principal">
            <a href="#">Inicio</a> | <a href="#">Artículos</a> | <a href="#">Contacto</a>
        </div>
    </div>
    
<div class="contenido-principal">
    <div class="articulo-blog">
        <h2>Avances en IA</h2>
        <p>La inteligencia artificial sigue avanzando...</p>
        <div class="imagen-articulo">
            <img src="ia.jpg" alt="Ilustración de IA">
            <p><em>Ilustración sobre redes neuronales</em></p>
        </div>
    </div>
    <div class="articulo-blog">
        <h2>Nuevo Framework JS</h2>
        <p>Recientemente se lanzó un nuevo framework...</p>
    </div>
</div>

<div class="barra-lateral-info">
    <h3>Archivos</h3>
    <ul>
        <li>Octubre 2025</li>
        <li>Septiembre 2025</li>
    </ul>
</div>

<div class="pie-pagina-sitio">
    <p>&copy; 2025 Noticias Tech.</p>
</div>
```

**Cámbialo a esta Estructura**

**Código Final Esperado (Semántico):**

HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Blog Simple - Semántico</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Blog de Noticias Tecnológicas</h1>
        <nav>
            <a href="#">Inicio</a> | <a href="#">Artículos</a> | <a href="#">Contacto</a>
        </nav>
    </header>

    <main>
        <article>
            <h2>Avances en IA</h2>
            <p>La inteligencia artificial sigue avanzando...</p>
            <figure>
                <img src="ia.jpg" alt="Ilustración de IA">
                <figcaption>Ilustración sobre redes neuronales</figcaption>
            </figure>
        </article>
        <article>
            <h2>Nuevo Framework JS</h2>
            <p>Recientemente se lanzó un nuevo framework...</p>
        </article>
    </main>

    <aside>
        <h3>Archivos</h3>
        <ul>
            <li>Octubre 2025</li>
            <li>Septiembre 2025</li>
        </ul>
    </aside>

    <footer>
        <p>&copy; 2025 Noticias Tech.</p>
    </footer>

</body>
</html>
```

🧠 **Reflexión Final del Desafío:**

Al completar esta refactorización, no solo has limpiado el código, sino que le has dado **sentido estructural**. Piensa en cómo esta nueva versión sería interpretada por un lector de pantalla o un motor de búsqueda comparada con la original. ¡Has dado un paso importante hacia la creación de webs más profesionales y accesibles! 🚀

# **🧩Practica Construyendo Planeta Vivo**

#### **Paso 2. Estructura inicial del documento**

En `index.html`, escribe el siguiente código base y **explica brevemente qué representa cada etiqueta**:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Planeta Vivo</title>
</head>
<body>

</body>
</html>
```

#### Paso 3. Crear la estructura semántica principal

Dentro del `<body>`, agrega las siguientes secciones semánticas:

```html
<header>
  <h1>🌍 Revista Planeta Vivo</h1>
  <nav>
    <ul>
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#articulos">Artículos</a></li>
      <li><a href="#contacto">Contacto</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h2>Innovaciones verdes del 2025</h2>
    <p>Exploramos las tecnologías sostenibles que están transformando el planeta.</p>
  </article>

  <aside>
    <h3>Dato curioso</h3>
    <p>¿Sabías que un panel solar puede ahorrar hasta 900 kg de CO₂ al año?</p>
  </aside>
</main>

<footer>
  <p>© 2025 Planeta Vivo - Creando conciencia digital</p>
</footer>
```

#### Paso 5. Mejora la accesibilidad (opcional avanzado)

Agrega atributos **ARIA** para mejorar la accesibilidad:

```html
<nav role="navigation" aria-label="Menú principal">
```

Y utiliza encabezados coherentes (`h1`, `h2`, `h3`) en orden lógico.

🌱 *Recuerda:* La accesibilidad no es opcional, ¡es un derecho digital!







