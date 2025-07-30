![Portada](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_002/assets/Mesa%20de%20trabajo%201HtmlTypota.png)

# 📏 **Paso 4: Unidades de medida en CSS – ¡Domina el tamaño de todo!**

> ✨ En este paso aprenderás a usar **unidades de medida** en CSS, que permiten ajustar el tamaño de los elementos (textos, márgenes, anchos, alturas) de forma **precisa o adaptable**. Son esenciales para crear interfaces que funcionen en diferentes pantallas 📱💻🖥️.

### 🎯 ¿Por qué son importantes las unidades?

Las unidades en CSS definen **cómo se calcula el tamaño de un elemento**. Puedes elegir entre:

- 🔒 **Unidades fijas** (como `px`): ideales para precisión.
- 🔓 **Unidades relativas** (como `%`, `em`, `vh`): ideales para diseño adaptable (responsive).

## 🧩 Tipos de unidades más comunes

| Tipo                     | Unidad | Significado                                         | Ejemplo              |
| ------------------------ | ------ | --------------------------------------------------- | -------------------- |
| 📏 Absoluta               | `px`   | Píxeles (fijos)                                     | `width: 300px;`      |
| 🔁 Relativa al contenedor | `%`    | Porcentaje del padre                                | `width: 80%;`        |
| 🔠 Relativa al texto      | `em`   | Relativo al tamaño de fuente del **elemento padre** | `padding: 2em;`      |
| 🔡 Relativa al documento  | `rem`  | Relativo al tamaño de fuente del **root (`html`)**  | `font-size: 1.5rem;` |
| 🖥️ Relativa a la pantalla | `vw`   | Viewport width (ancho de la ventana)                | `width: 50vw;`       |
| 📱 Relativa a la pantalla | `vh`   | Viewport height (alto de la ventana)                | `height: 100vh;`     |

## 🎨 Ejemplos explicativos

### 📌 `px` – Píxeles (Absoluta)

```css
h1 {
  font-size: 32px;
}
```

✔️ Ideal para textos o elementos que deben tener un tamaño exacto.

### 📌 `%` – Porcentaje

```css
img {
  width: 80%;
}
```

✔️ Útil para que las imágenes o contenedores se adapten al tamaño del padre.

### 📌 `em` – Escala relativa al elemento padre

```css
p {
  font-size: 1em;       /* igual al padre */
  padding: 2em;         /* 2 veces el tamaño de fuente del padre */
}
```

✔️ Perfecto para espacios internos proporcionales al texto.

### 📌 `rem` – Escala relativa al `<html>`

```css
html {
  font-size: 16px;
}

h2 {
  font-size: 2rem;      /* 32px */
}
```

✔️ Ideal para mantener consistencia global en toda la página.

### 📌 `vh` y `vw` – Tamaño relativo a la pantalla

```css
header {
  height: 100vh;      /* Ocupa toda la altura visible */
  width: 100vw;       /* Ocupa todo el ancho visible */
}
```

✔️ Perfecto para secciones tipo *landing page* o efectos pantalla completa.

## 📊 Comparativa visual

| Propiedad  | Absoluta (px)   | Relativa (%)             | Relativa (`em`, `rem`) | Relativa (`vh`, `vw`)  |
| ---------- | --------------- | ------------------------ | ---------------------- | ---------------------- |
| Precisión  | ✅ Alta          | ❌ Depende del contenedor | ⚠️ Depende del contexto | ⚠️ Depende del viewport |
| Adaptable  | ❌ No            | ✅ Sí                     | ✅ Sí                   | ✅ Sí                   |
| Ideal para | Iconos, botones | Imágenes fluidas         | Textos escalables      | Hero sections, slides  |

## 🧪 Práctica guiada: ¡Tamaño adaptable en acción!

### 🔧 HTML:

```html
<div class="contenedor">
  <h2>Mi Caja Adaptable</h2>
  <p>Esta caja cambia su tamaño según la pantalla. 📱💻</p>
</div>
```

### 🎨 CSS:

```css
.contenedor {
  width: 80%;             /* relativo al contenedor padre */
  padding: 2em;           /* relativo al texto */
  font-size: 1.2rem;      /* relativo al root */
  height: 40vh;           /* relativo a la pantalla */
  background-color: #FEC52E;
  border: 2px solid #3D3D3D;
}
```

🎯 **Resultado esperado:**

 Una caja que:

- Se ajusta al ancho de la pantalla (`%`).
- Tiene relleno proporcional al tamaño del texto (`em`).
- Escala su altura con el tamaño del navegador (`vh`).

## 🧠 Tips didácticos:

- Usa `rem` para mantener **coherencia tipográfica** global.
- Usa `%`, `vh` y `vw` para diseños **responsive y fluidos**.
- Usa `px` solo cuando necesites **control preciso**.

### 🧩 Desafío opcional:

> Crea un bloque que cambie completamente su forma (alto y ancho) cuando se cambie el tamaño de la ventana del navegador. Usa mínimo 3 unidades distintas.

# **PRACTICAS**

### 📐 1. Caja 100% Adaptable

**Objetivo**: Usar `%` y `vw` para adaptabilidad.

#### HTML

```html
<div class="adaptable">
  <p>Soy adaptable al ancho de tu pantalla 😎</p>
</div>
```

#### CSS

```css
.adaptable {
  width: 80%;
  margin: auto;
  background-color: #F25C05;
  padding: 20px;
}
```

### 📏 2. Texto que Escala Inteligentemente

**Objetivo**: Escalar texto con `em` y `rem`.

#### HTML

```html
<div class="texto-escalable">
  <h2>Título Escalable</h2>
  <p>Este texto se adapta según el tamaño base 🧐</p>
</div>
```

#### CSS

```css
html {
  font-size: 16px;
}

.texto-escalable {
  font-size: 1rem;
}

.texto-escalable h2 {
  font-size: 2rem;
}
```

### 🎥 3. Sección Fullscreen Dinámica

**Objetivo**: Crear secciones de pantalla completa con `vh`.

#### HTML

```html
<section class="pantalla-completa">
  <h1>Bienvenido a mi sitio 👾</h1>
</section>
```

#### CSS

```css
.pantalla-completa {
  height: 100vh;
  width: 100vw;
  background-color: #1B1F3B;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
```



![Pie](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_002/assets/Recurso%201PiePagina.png)
