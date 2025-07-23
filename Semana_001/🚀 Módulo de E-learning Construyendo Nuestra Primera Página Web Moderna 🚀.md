![Mesa de trabajo 1HtmlTypota](E:/Grandote58/GR58_Facebook/2x/Mesa%20de%20trabajo%201HtmlTypota.png)

# 🚀 **Módulo de E-learning: Construyendo Nuestra Primera Página Web Moderna** 🚀



¡Hola, futuro desarrollador/a web! 👋 

En este módulo, vamos a construir juntos la estructura de una página web desde cero. Olvídate de las etiquetas confusas, ¡vamos a aprender a usar el HTML semántico como un profesional!

### 🎯 **Objetivo del Módulo**



Al finalizar esta lección, serás capaz de:

- **Identificar y explicar** el propósito de las etiquetas HTML estructurales más importantes: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`.
- **Estructurar un documento HTML** de forma lógica y semántica, ¡haciendo felices a los motores de búsqueda como Google! 🤓
- **Visualizar** cómo el código HTML y el CSS trabajan juntos para crear una página web visualmente organizada.

### 🤔 **¿Qué es el "HTML Semántico"?**

Imagina que estás construyendo una casa 🏠. 

No usarías ladrillos de pared para hacer el techo, ¿verdad? Cada material tiene un propósito.

En la web es igual. El **HTML Semántico** consiste en usar la etiqueta HTML correcta para cada tipo de contenido. Esto no solo organiza tu código, sino que también le dice a los navegadores y a los motores de búsqueda exactamente qué es cada parte de tu página. ¡Es como darle un mapa de tu contenido!

¡Manos a la obra! 🏗️

## **Paso 1: El Cerebro y el Esqueleto 🧠 (`<head>` y `<body>`)**



Toda página HTML tiene dos partes fundamentales:

- `<head>`: **El cerebro**. Aquí va información que no se ve directamente en la página, pero que es crucial: el título de la pestaña del navegador, enlaces a archivos CSS (nuestra pintura 🎨), y otros metadatos.

  

- `<body>`: **El esqueleto visible**. Todo lo que el usuario ve (texto, imágenes, botones) vive dentro del `<body>`.

Nuestro archivo `index.html` empieza así:

```html
<!DOCTYPE html>
<html lang="es">

<head>
    <title>Mi Primera Página Moderna</title>
    <link rel="stylesheet" href="estilos.css">
</head>

<body>
    </body>

</html>
```

### **Paso 2: La Cabecera y la Navegación 🗺️ (`<header>` y `<nav>`)**

- `<header>`: ¡La gran entrada! Es el encabezado principal de tu página. Generalmente contiene el logo, el título del sitio y quizás un eslogan.

  

  - 🎨 **Color Asignado:** Azul

    

- `<nav>`: El GPS de tu sitio. Es la barra de navegación que contiene los enlaces principales para que el usuario se mueva por las diferentes secciones (Ej: Inicio, Productos, Contacto).

  

  - 🎨 **Color Asignado:** Turquesa

```html
<body>
    <header class="encabezado-principal">
        <h1>Este es el Encabezado Principal (header)</h1>
    </header>

    <nav class="navegacion-principal">
        <p>Esta es la Barra de Navegación (nav)</p>
    </nav>

    </body>
```

## **Paso 3: El Contenido Principal 🌟 (`<main>`, `<section>` y `<article>`)**

¡Aquí es donde ocurre la magia!

- `<main>`: El protagonista. Esta etiqueta envuelve **TODO el contenido principal y único** de la página. Solo debe haber un `<main>` por página.

  - 🎨 **Color Asignado:** Amarillo

    

- `<section>`: Como los capítulos de un libro. Se usa para agrupar contenido que está relacionado temáticamente. Por ejemplo, una sección de "Novedades" o una de "Productos Destacados".

  - 🎨 **Color Asignado:** Naranja

    

- `<article>`: Una pieza de contenido independiente. Piensa en una noticia en un periódico o una entrada en un blog. Podrías sacar ese `<article>` de la página y seguiría teniendo sentido por sí solo.

  - 🎨 **Color Asignado:** Morado

```html
<main class="contenido-principal">
    <h2>Este es el Contenido Principal (main)</h2>

    <section class="seccion-articulos">
        <h3>Esta es una Sección (section)</h3>

        <article class="articulo-blog">
            <h4>Este es un Artículo (article)</h4>
            <p>Este contenido es independiente y tiene sentido por sí mismo.</p>
        </article>
        
        <article class="articulo-blog">
            <h4>Este es otro Artículo (article)</h4>
            <p>Podríamos tener muchos artículos dentro de esta sección.</p>
        </article>
    </section>
    
    </main>
```

### **Paso 4: Contenido Extra y el Final 📝 (`<aside>` y `<footer>`)**

- `<aside>`: La nota al margen. Es para contenido que está relacionado de forma secundaria con lo principal. Perfecto para publicidad, enlaces a otros artículos o una biografía corta del autor.

  - 🎨 **Color Asignado:** Violeta

    

- `<footer>`: El pie de página. Aquí va la información que cierra la página: enlaces de contacto, derechos de autor, redes sociales, etc.

  - 🎨 **Color Asignado:** Verde

```html
<aside class="barra-lateral">
    <h4>Esta es la Barra Lateral (aside)</h4>
    <p>Perfecta para publicidad o enlaces relacionados.</p>
</aside>
```

HTML

```html
<footer class="pie-de-pagina">
    <p>Este es el Pie de Página (footer) - Copyright © 2025</p>
</footer>
```

## **Paso 5: ¡Dando Color a la Vida con CSS! 🎨 (`estilos.css`)**

Todo lo que hemos hecho es la estructura. Ahora, con este código CSS, "pintamos" cada bloque para poder verlo claramente. Cada clase (ej: `.encabezado-principal`) corresponde a una etiqueta HTML.

```css
/* estilos.css */
body {
    font-family: sans-serif;
    margin: 0;
}

/* Damos estilo a cada bloque con un color de fondo para identificarlo */
.encabezado-principal { 
    background-color: #4A90E2; 
    color: white; 
    padding: 15px; 
    text-align: center; }

.navegacion-principal { 
    background-color: #50E3C2; 
    padding: 10px; 
    text-align: center; }

.contenido-principal { 
    background-color: #F8E71C; 
    padding: 15px; }

.seccion-articulos { 
    background-color: #F5A623; 
    padding: 15px; 
    margin-bottom: 15px; 
    border-radius: 5px; }

.articulo-blog { 
    background-color: #BD10E0; 
    color: white; 
    padding: 15px; 
    margin-top: 10px; 
    border-radius: 5px; }

.barra-lateral { 
    background-color: #9013FE; 
    color: white; 
    padding: 15px; 
    border-radius: 5px; }

.pie-de-pagina { 
    background-color: #7ED321; 
    color: white; 
    padding: 20px; 
    text-align: center; }

```



### **🎉 ¡Felicidades! 🎉**



¡Has completado el módulo! Ahora tienes un mapa mental y un ejemplo práctico de cómo se organiza una página web profesional.

**Tu próximo desafío:** Intenta modificar el contenido, cambiar los colores o incluso añadir una nueva `<section>` con sus propios `<article>`. ¡La mejor forma de aprender es experimentar!





![Recurso 1PiePagina](./assets/Recurso%201PiePagina.png)





