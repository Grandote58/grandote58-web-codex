![Portada](D:\Bakup_2025\HTML5\Semana_002\assets\Mesa de trabajo 1HtmlTypota-1753843861075-3.png)

# 🎯 **Paso 2: Selectores y propiedades esenciales**

> 📌 Este paso te enseña a seleccionar **qué elementos quieres estilizar** (selectores) y **cómo deseas que luzcan** (propiedades). Es el corazón del CSS. ❤️💡

### 🎯 ¿Qué es un selector?

Un **selector** en CSS te permite elegir **uno o varios elementos HTML** a los que aplicarás estilos. Imagina que el HTML es una casa y los selectores son las llaves que abren cuartos específicos para decorarlos. 🏡🔑

### 📚 Tipos de selectores más comunes:

| Tipo de selector     | Ejemplo   | Qué selecciona                          | Uso práctico                               |
| -------------------- | --------- | --------------------------------------- | ------------------------------------------ |
| Selector de elemento | `p`       | Todos los párrafos                      | Estilizar todo texto de párrafo            |
| Selector de clase    | `.boton`  | Todos los elementos con `class="boton"` | Reutilizar estilos para varios botones     |
| Selector de ID       | `#titulo` | Solo el elemento con `id="titulo"`      | Estilo único para un elemento              |
| Selector universal   | `*`       | Todos los elementos                     | Estilos globales o reset                   |
| Selector descendente | `div p`   | Párrafos dentro de un div               | Aplicar estilo solo en contexto específico |

### ✨ Ejemplos de selectores:

```css
/* Selector de elemento */
h1 {
  color: darkblue;
}

/* Selector de clase */
.titulo-principal {
  font-size: 36px;
  text-transform: uppercase;
}

/* Selector de ID */
#intro {
  background-color: #fce4ec;
  padding: 20px;
}

/* Selector universal */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Selector descendente */
article p {
  line-height: 1.6;
}
```

### 🎨 Propiedades básicas de estilo

A continuación, una lista con las propiedades más esenciales para comenzar a estilizar tus elementos:

#### 🔠 Texto y fuentes:

| Propiedad        | Ejemplo                           | Función                                       |
| ---------------- | --------------------------------- | --------------------------------------------- |
| `color`          | `color: #1B1F3B;`                 | Cambia el color del texto                     |
| `font-size`      | `font-size: 20px;`                | Define el tamaño del texto                    |
| `font-family`    | `font-family: Arial, sans-serif;` | Define la tipografía                          |
| `text-align`     | `text-align: center;`             | Alinea el texto (izquierda, derecha, centro)  |
| `text-transform` | `text-transform: uppercase;`      | Cambia a mayúsculas, minúsculas, capitalizado |

#### 🧱 Tamaño y forma:

| Propiedad       | Ejemplo                    | Función               |
| --------------- | -------------------------- | --------------------- |
| `width`         | `width: 400px;`            | Ancho del elemento    |
| `height`        | `height: 200px;`           | Alto del elemento     |
| `border`        | `border: 2px solid black;` | Contorno del elemento |
| `border-radius` | `border-radius: 10px;`     | Bordes redondeados    |

#### 🧴 Espaciado:

| Propiedad | Ejemplo          | Función         |
| --------- | ---------------- | --------------- |
| `margin`  | `margin: 20px;`  | Espacio externo |
| `padding` | `padding: 15px;` | Espacio interno |

#### 🌈 Fondo:

| Propiedad          | Ejemplo                               | Función                    |
| ------------------ | ------------------------------------- | -------------------------- |
| `background-color` | `background-color: #FEC52E;`          | Cambia el color de fondo   |
| `background-image` | `background-image: url('fondo.jpg');` | Agrega una imagen de fondo |

### 🛠 Práctica rápida: Crea un bloque estilizado

```html
<!-- HTML -->
<div class="tarjeta">
  <h2 id="nombre">María López</h2>
  <p>Desarrolladora Frontend apasionada por el diseño web.</p>
</div>

```

```css
/* CSS */
.tarjeta {
  width: 300px;
  background-color: #ffffff;
  border: 2px solid #278CE7;
  padding: 20px;
  border-radius: 10px;
}

#nombre {
  color: #D9293F;
  font-family: 'Arial Black', sans-serif;
  font-size: 24px;
  text-align: center;
}
```

🎯 **Resultado esperado:** Una tarjeta de presentación visualmente clara, con texto centrado, colorido y bien espaciado.

### 🧠 Tips didácticos:

- Usa nombres de clases descriptivos: `.btn-verde`, `.card-producto`, `.cabecera`.
- Reutiliza clases para evitar código duplicado.
- Usa el inspector del navegador (clic derecho → Inspeccionar) para modificar estilos en tiempo real.

# **PRACTICAS**

### 🌈 1. Títulos con Personalidad

**Objetivo**: Aplicar color, tamaño y fuente a los títulos.

#### HTML

```html
<h1>Mi Blog de Aventuras 🚀</h1>
<h2>Capítulo 1: El Despegue</h2>
```

#### CSS

```css
h1 {
  font-family: 'Comic Sans MS', cursive;
  color: #D9293F;
  font-size: 40px;
  text-align: center;
}
h2 {
  font-style: italic;
  color: #278CE7;
}
```

### 🔖 2. Tarjetas con Clases Geniales

**Objetivo**: Reutilizar estilos con clases CSS.

#### HTML

```html
<div class="tarjeta">
  <h3>HTML Básico</h3>
  <p>Aprende etiquetas esenciales.</p>
</div>

<div class="tarjeta">
  <h3>CSS Intermedio</h3>
  <p>Domina selectores y propiedades.</p>
</div>
```

#### CSS

```css
.tarjeta {
  border: 1px solid #1B1F3B;
  padding: 15px;
  margin: 10px;
  background-color: #FEC52E;
  border-radius: 10px;
}
```

### 🏷️ 3. Personaliza con IDs Únicos

**Objetivo**: Aplicar estilos únicos con ID.

#### HTML

```css
<p id="importante">Este mensaje debe destacarse. 🔥</p>
```

#### CSS

```css
#importante {
  background-color: #D9293F;
  color: white;
  font-weight: bold;
  padding: 10px;
}
```



![Recurso 1PiePagina](./assets/Recurso%201PiePagina.png)
