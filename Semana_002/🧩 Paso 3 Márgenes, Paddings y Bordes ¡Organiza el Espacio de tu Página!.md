![Portada](D:\Bakup_2025\HTML5\Semana_002\assets\Mesa de trabajo 1HtmlTypota-1753843893156-6.png)

# 🧩 **Paso 3: Márgenes, Paddings y Bordes: ¡Organiza el Espacio de tu Página!**

> 📦 Este paso te enseña cómo usar **espacios externos e internos**, así como los **bordes**, para organizar y mejorar la apariencia de tus elementos en la web. Es como darle aire, forma y contorno a cada componente de tu sitio 🖼️✨.

### 🧠 ¿Qué es el “espaciado” en CSS?

Imagina que cada elemento HTML es una caja. CSS te permite definir:

- **Márgenes**: el espacio **fuera** de la caja (como el espacio entre muebles).
- **Padding**: el espacio **dentro** de la caja (como el acolchado de un sofá).
- **Bordes**: el **límite visual** de la caja (como el marco de un cuadro).

Estos tres forman parte del **Box Model**, el modelo de caja que usa CSS para organizar cada elemento en la página.

## 🎯 Conceptos clave

### 🔷 `margin`: espacio exterior

Define el espacio **fuera del borde** del elemento. Sirve para separar un elemento de otros.

```css
p {
  margin: 20px;
}
```

📌 Esto aplicará **20 píxeles de espacio** por fuera del párrafo.

### 🔶 `padding`: espacio interior

Define el espacio **entre el contenido y el borde** del elemento. Aumenta el "aire interno".

```css
div {
  padding: 15px;
}
```

📌 Esto crea **15 píxeles de espacio interno** dentro del `div`, antes de llegar al borde.

### ⬛ `border`: contorno del elemento

Agrega una línea alrededor del contenido. Puedes personalizar:

- Grosor (px)
- Tipo (`solid`, `dashed`, `dotted`, etc.)
- Color

```css
h1 {
  border: 3px solid #F25C05;
}
```

📌 Esto crea un borde naranja sólido de 3 píxeles alrededor del encabezado.

## 🛠️ Propiedades combinadas

Puedes usar **4 valores** para controlar cada lado (arriba, derecha, abajo, izquierda):

```css
margin: 10px 20px 30px 40px;
/* top, right, bottom, left */
```

También puedes usar abreviaciones:

```css
padding: 20px;           /* todos los lados iguales */
margin: 10px 15px;       /* vertical | horizontal */
```

## 🎨 Ejemplo visual de combinación

```css
<div class="caja">
  <p>¡Estoy bien espaciado y bordeado!</p>
</div>

```

```css
.caja {
  background-color: #FEC52E;
  color: #1B1F3B;
  padding: 20px;
  margin: 30px;
  border: 5px dashed #278CE7;
}
```

🎯 **Resultado esperado:**
 Una caja con fondo amarillo, texto azul oscuro, 20px de espacio interno, 30px de espacio externo, y un borde azul con líneas punteadas.

### 🧪 Herramienta visual:

Usa el inspector del navegador y activa el modo "caja" para ver los márgenes, paddings y bordes en colores.

 🔍 Chrome: clic derecho → **Inspeccionar** → pestaña "Estilos" → hover sobre `.element`.

## 🧩 Bonus: Box Model resumido

![Inspeccionar el modelo de cajas de un elemento utilizando Firefox DevTools](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Styling_basics/Box_model/box-model-devtools.png)

### 📌 Práctica rápida: Tarjeta espaciada

```html
<div class="tarjeta">
  <h2>Nombre del Proyecto</h2>
  <p>Descripción breve con espacio y borde.</p>
</div>
```

```css
.tarjeta {
  background-color: #ffffff;
  padding: 25px;
  margin: 30px auto;
  border: 2px solid #3D3D3D;
  width: 80%;
  border-radius: 10px;
}
```

🎯 Resultado esperado: una tarjeta centrada, con aire interno y externo, bordes suaves y un aspecto limpio y profesional.

# **PRACTICAS**

### 🧱 1. Caja Súper Espaciada

**Objetivo**: Aplicar `margin` para separar cajas.

#### HTML

```html
<div class="espaciada">Caja 1</div>
<div class="espaciada">Caja 2</div>
```

#### CSS

```css
.espaciada {
  margin: 20px;
  padding: 10px;
  background-color: #FFF;
  border: 2px solid #00B16A;
}
```

### 🧴 2. Padding para tu Caja Favorita

**Objetivo**: Agregar relleno interno para mejor legibilidad.

#### HTML

```html
<div class="acolchada">
  <p>Este texto respira gracias al padding. 💨</p>
</div>
```

#### CSS

```css
.acolchada {
  padding: 25px;
  background-color: #F8F8F8;
  border: 1px solid #CCC;
}
```

### 🖼️ 3. Bordeando con Estilo

**Objetivo**: Personalizar bordes.

#### HTML

```html
<p class="con-borde">¡Este párrafo tiene estilo! 🎀</p>
```

#### CSS

```css
.con-borde {
  border: 4px dashed #6C3FB6;
  padding: 10px;
  background-color: #E0E0E0;
}
```



![Recurso 1PiePagina](./assets/Recurso%201PiePagina.png)

