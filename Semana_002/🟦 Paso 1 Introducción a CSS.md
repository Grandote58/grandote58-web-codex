![Portada](D:\Bakup_2025\HTML5\Semana_002\assets\Mesa de trabajo 1HtmlTypota.png)

# 🟦 **Paso 1: Introducción a CSS**

> 🌐 **CSS (Cascading Style Sheets)** permite controlar la apariencia visual de un sitio web, separando el contenido (HTML) del diseño (estilos). 
>
> Es como elegir la ropa y los colores de una página web para que luzca profesional y atractiva. 🎨✨

### 🎯 ¿Qué es CSS y por qué lo usamos?

CSS es el lenguaje que le da “vida” al diseño web. Permite:

- Cambiar colores, fuentes y tamaños.
- Organizar la estructura visual con márgenes y espacios.
- Hacer que una web funcione en celulares y pantallas grandes.
- Crear transiciones, animaciones y efectos visuales modernos.

> 🧠 **Ejemplo visual**:
>
>  HTML es como una casa sin pintura ni muebles.
>  CSS es la decoración: colores, cuadros, iluminación y muebles.

### 🧩 Sintaxis básica de CSS

```css
selector {
  propiedad: valor;
}
```

**📌 Ejemplo sencillo:**

```css
h1 {
  color: red;
  font-size: 32px;
}
```

**¿Qué hace esto?**

- Aplica el color rojo (`color: red`) y un tamaño de letra grande (`font-size: 32px`) a todos los encabezados `<h1>` del documento.

### 🔌 ¿Cómo se aplica CSS en una página web?

Existen **3 formas** de aplicar CSS. Te explico cada una con ejemplo y cuándo usarla:

#### 1. ✅ **CSS Externo** (✅ Mejor práctica)

- Se guarda en un archivo `.css` separado (ej. `estilos.css`)
- Ideal para mantener orden y reutilizar estilos en varias páginas

```css
<!-- En el archivo HTML -->
<head>
  <link rel="stylesheet" href="estilos.css">
</head>
cssCopiarEditar/* En el archivo estilos.css */
body {
  background-color: #f5f5f5;
}
```

#### 2. 🟡 **CSS Interno**

- Se escribe dentro del archivo HTML, en la etiqueta `<style>`
- Útil para pruebas rápidas o proyectos pequeños

```css
<head>
  <style>
    p {
      color: blue;
    }
  </style>
</head>
```

#### 3. ❌ **CSS en línea** (No recomendado)

- Se escribe directamente en cada etiqueta HTML
- Difícil de mantener, poco profesional

```html
<h2 style="color: green; font-size: 20px;">Hola CSS</h2>
```

> ##### **⚠️ Evita el uso excesivo de CSS en línea. Rompe el principio de separación entre estructura y estilo.**

### 📌 Práctica rápida: crea tu primer estilo

1. Crea un archivo HTML llamado `index.html`
2. Crea un archivo CSS llamado `estilos.css`
3. Enlaza ambos usando `<link>`
4. Cambia el color de fondo del sitio y el estilo del título principal

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primera web con estilo</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <h1>¡Hola, CSS!</h1>
  <p>Esto es una página con estilo.</p>
</body>
</html>
```

```css
/* estilos.css */
body {
  background-color: #E8F0FE;
  font-family: Arial, sans-serif;
}

h1 {
  color: #1B1F3B;
  text-align: center;
}
```

### 📌 Tip: Herramienta de Inspección 🧪

Usa clic derecho → “Inspeccionar” en cualquier página (en Chrome o Firefox) para explorar cómo están aplicados los estilos CSS.

¡Es como ver los planos de la web en tiempo real! 🕵️‍♂️



# **PRACTICAS**

## **🎨 1. ¡Hola Estilo, Adiós Aburrimiento!**

**Objetivo**: Aprender a enlazar un archivo CSS externo y aplicar primeros estilos.

#### 🧱 Estructura HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi Primer Estilo</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <h1>¡Hola Mundo con Estilo!</h1>
  <p>Este es mi primer intento con CSS externo. 🎉</p>
</body>
</html>
```

#### 🎨 CSS (`estilos.css`)

```css
body {
  background-color: #E8F0FE;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  color: #278CE7;
  text-align: center;
}

p {
  color: #3D3D3D;
  font-size: 18px;
}
```

### 🧑‍🎨 2. Personaliza tu Página de Bienvenida

**Objetivo**: Comparar estilos en línea, internos y externos.

#### HTML con estilos en línea (❌)

```html
<h1 style="color:red; text-align:center;">Bienvenido</h1>
```

#### HTML con estilo interno (🟡)

```html
<head>
  <style>
    h1 {
      color: green;
    }
  </style>
</head>
```

#### HTML con CSS externo (✅)

```html
<link rel="stylesheet" href="mi-estilo.css">
```

✏️ Crea tres versiones del mismo texto para identificar cuál es más práctica y profesional.

### 📄 3. Dale Vida a tu Biografía

**Objetivo**: Crear una sección biográfica sencilla con estilos básicos.

#### HTML

```html
<div class="bio">
  <h2>Sofía Ramírez</h2>
  <p>Diseñadora gráfica apasionada por el arte digital y la animación 🎨✨</p>
</div>
```

#### CSS

```css
.bio {
  background-color: #FFF8DC;
  border-left: 5px solid #F25C05;
  padding: 20px;
  margin: 30px;
}
.bio h2 {
  color: #6C3FB6;
}
.bio p {
  font-size: 16px;
  color: #3D3D3D;
}
```



![Recurso 1PiePagina](./assets/Recurso%201PiePagina.png)