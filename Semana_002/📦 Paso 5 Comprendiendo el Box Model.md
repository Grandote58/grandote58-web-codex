![Portada](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_001/assets/Mesa%20de%20trabajo%201HtmlTypota.png)

# 📦 **Paso 5: Comprendiendo el Box Model**

#### 🎯 Objetivo del paso:

Que el estudiante comprenda cómo se estructuran visualmente los elementos HTML en la página web, utilizando el modelo de caja de CSS para gestionar el espacio, los márgenes y el diseño responsivo.

### 🧠 ¿Qué es el Box Model?

En CSS, **cada elemento HTML se representa como una caja rectangular**, compuesta por cuatro áreas principales:

```scss
┌────────────────────────────────────────────┐
│                Margin (margen)             │
│   ┌────────────────────────────────────┐   │
│   │           Border (borde)           │   │
│   │  ┌──────────────────────────────┐  │   │
│   │  │   Padding (relleno interno)  │  │   │
│   │  │  ┌────────────────────────┐  │  │   │
│   │  │  │   Content (contenido)  │  │  │   │
│   │  │  └────────────────────────┘  │  │   │
│   │  └──────────────────────────────┘  │   │
│   └────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

### 🔍 Detalle de cada componente:

1. **Content (Contenido)**

   Donde vive el texto, imagen o elemento en sí.

   Ejemplo: el texto dentro de un párrafo `<p>`.

2. **Padding (Relleno interno)**

   Espacio entre el contenido y el borde del elemento. Aumenta el "aire" interno.

   👉 *No afecta elementos externos.*

3. **Border (Borde)**

   Delimita visualmente el elemento. Puede tener color, grosor y estilo.

   Ejemplo: `border: 2px solid #333;`

4. **Margin (Margen externo)**

   Espacio fuera del borde, separa el elemento de otros elementos.

   👉 *Afecta la disposición general de la página.*

### 🧪 Ejemplo práctico:

```html
<div class="caja-ejemplo">¡Hola, Box Model!</div>
```

```css
.caja-ejemplo {
  width: 200px;
  padding: 20px;
  border: 5px solid #F25C05;
  margin: 30px;
  background-color: #FEC52E;
}
```

#### Resultado visual:

- **Ancho del contenido:** 200px
- **Relleno (padding):** 20px
- **Borde (border):** 5px
- **Margen (margin):** 30px

➡️ **Tamaño total del elemento** = 200 + (2×20) + (2×5) = **250px de ancho real** (sin contar márgenes)

### 📚 Buenas prácticas:

✅ Usa `box-sizing: border-box;` para facilitar el control del ancho total del elemento.
 Ejemplo:

```css
* {
  box-sizing: border-box;
}
```

### 💡 Actividad práctica:

1. Crea tres cajas `<div>` con diferentes márgenes, paddings y bordes.
2. Asigna diferentes colores para observar cómo se comporta cada área.
3. Añade una breve explicación sobre cómo varió su tamaño.

### 🧭 Tip adicional:

Usa la herramienta **"Inspeccionar" del navegador** para ver el modelo de caja en acción. Chrome y Firefox lo muestran gráficamente al seleccionar un elemento.

# **PRACTICAS**

## 📦 Práctica 1: **🔍 “Rayos X CSS: Descubre tu Caja Invisible”**

### 🎯 Objetivo:

Visualizar y comprender las partes del Box Model usando colores llamativos para identificar `content`, `padding`, `border` y `margin`.

### 🧱 Estructura HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Rayos X CSS</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
  <div class="rayos-x">¡Observa los espacios en acción! 🧪</div>
</body>
</html>
```

### 🎨 CSS

```css
.rayos-x {
  background-color: #FEC52E; /* Content */
  padding: 30px;             /* Espacio interno */
  border: 10px solid #278CE7;/* Borde visible */
  margin: 20px;              /* Espacio externo */
  font-size: 20px;
  font-family: Arial, sans-serif;
  color: #1B1F3B;
  width: 300px;
}
```

### 🧠 Resultado esperado:

Una **caja amarilla con borde azul**, texto centrado, espacio interno bien visible, y una separación externa clara. Esta práctica es ideal para inspeccionar con herramientas del navegador.

## 📦 Práctica 2: **📏 “El Reto de la Caja Perfecta”**

### 🎯 Objetivo:

Calcular el tamaño final de una caja y ajustar sus dimensiones totales manipulando `width`, `padding`, `border` y `box-sizing`.

------

### 🧱 Estructura HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>La Caja Perfecta</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
  <div class="caja-perfecta">Soy una caja con tamaño controlado 📦</div>
</body>
</html>
```

### 🎨 CSS

```css
.caja-perfecta {
  width: 300px;
  padding: 20px;
  border: 5px solid #6C3FB6;
  margin: 30px;
  background-color: #FFF8DC;
  font-size: 16px;
  box-sizing: content-box; /* ❌ Cambia a border-box en el reto */
}
```

### 🧪 Desafío:

1. Inspeccionar el elemento en el navegador.
2. Calcular su tamaño final con `content-box`.
3. Cambiar `box-sizing: border-box;` y observar cómo se reduce el tamaño visual.
4. Comparar la diferencia en el tamaño total de la caja.

## 📦 Práctica 3: **🎯 “Dispara al Blanco: Alinea tus Cajas”**

### 🎯 Objetivo:

Aprender a alinear y distribuir múltiples cajas con `margin`, comprender el espaciado entre ellas y crear diseños simétricos usando el Box Model.

### 🧱 Estructura HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Alineación con Box Model</title>
  <link rel="stylesheet" href="estilo.css">
</head>
<body>
  <div class="fila">
    <div class="caja">Caja 1 🟥</div>
    <div class="caja">Caja 2 🟦</div>
    <div class="caja">Caja 3 🟩</div>
  </div>
</body>
</html>
```

### 🎨 CSS

```css
.fila {
  display: flex;
  justify-content: space-between;
  margin: 40px;
}

.caja {
  background-color: #F25C05;
  color: white;
  padding: 20px;
  margin: 10px;
  border: 3px solid white;
  width: 100px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
```



![Recurso 1PiePagina](./assets/Recurso%201PiePagina.png)



