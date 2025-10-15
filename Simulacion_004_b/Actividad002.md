# 🎨 **Sección B — Estilos y HUD (CSS)**

### 🎯 **Objetivo de la sección**

1. Aprender cómo los estilos CSS dan forma visual al juego, definiendo el ambiente, los colores y la presentación del HUD (**Head-Up Display**).
2. Al finalizar esta sección, comprenderás cómo personalizar el entorno visual del canvas, mejorar la experiencia del jugador y reforzar tu comprensión sobre el diseño de interfaces con **Bootstrap + CSS personalizado**.

## 🧩 1. Estilos generales del cuerpo (`body`)

```css
body {
    background-color: #212529; /* Gris oscuro de Bootstrap */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
}
```

### 💡 **Análisis didáctico**

- **🎨 Fondo:** se usa el color `#212529`, un gris oscuro del tema *Bootstrap Dark*, ideal para resaltar el área del juego.
- **📏 Centrado absoluto:** con `display: flex`, `justify-content: center` y `align-items: center`, el juego se centra **horizontal y verticalmente** en la pantalla.
- **📐 Altura completa:** `height: 100vh` ocupa el 100% de la ventana visible.
- **🧹 Sin márgenes:** `margin: 0` elimina espacios por defecto del navegador.

🎓 **Ejercicio:**

 Cambia el fondo del `body` a un tono más llamativo y observa el efecto:

```css
background-color: #1a1a40; /* Azul espacial */
```

👉 Reflexiona: ¿mejora la visibilidad del canvas y del HUD?

## 🧱 2. Contenedor principal del juego (`.game-container`)

```css
.game-container {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
}
```

### 💡 **Análisis visual**

- **🧩 Fondo claro:** `#f8f9fa` crea contraste con el fondo oscuro del body.
- **📦 `padding`:** deja un margen interno que da “aire” visual al HUD y canvas.
- **🔵 Bordes redondeados:** `border-radius: 0.5rem` suaviza la caja.
- **🌑 Sombra externa:** da una sensación de profundidad y enfoque central, imitando un panel de control.

🎯 **Tarea práctica:**
 Agrega un borde visible al contenedor:

```css
border: 2px solid #495057; /* Gris metálico */
```

📘 Reflexiona: ¿cómo afecta la estética general?

## 🖼️ 3. Área del juego (`#gameCanvas`)

```css
#gameCanvas {
    background-color: #ced4da; /* Gris claro para el área de juego */
    border: 3px solid #495057; /* Borde gris oscuro */
    display: block; /* Elimina espacio extra debajo del canvas */
}
```

### ⚙️ **Aprendizaje técnico**

- **🎨 Fondo:** color neutro para destacar los tanques y los muros.
- **🧱 Borde:** delimita claramente el área jugable.
- **📐 `display: block`:** evita espacios indeseados que a veces aparecen con elementos `inline`.

🧩 **Tip para personalización:**
 Puedes cambiar el color del borde a un tono “militar”:

```css
border: 3px solid #556b2f; /* Verde oliva */
```

## 🧭 4. Panel de información HUD (`.hud`)

```css
.hud {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.25rem;
    color: #343a40;
}
```

### 🧠 **Concepto clave**

El **HUD** (Head-Up Display) es la interfaz que informa al jugador sin interrumpir el juego.

- **📊 Flexbox:** organiza dos secciones (Jugador y Enemigo) una a cada lado.
- **📦 `padding`:** espacio interno que separa texto y marcadores.
- **🎨 Color:** `#343a40`, un gris oscuro que mantiene contraste sobre el fondo claro.

🧠 **Reflexión:**
 El HUD debe ser **informativo pero no distractor**. La elección de tonos neutros logra ese balance.

🎓 **Actividad sugerida:**
 Cambia la alineación del HUD a centrado para analizar la diferencia:

```css
justify-content: center;
gap: 2rem;
```

## ❤️ 5. Marcadores de impactos (`.hits-display` y `.hit-marker`)

```css
.hits-display {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    min-height: 24px;
    margin-top: 0.25rem;
}

/* Marcador de golpe recibido */
.hit-marker {
    width: 24px;
    height: 24px;
    background-color: #dc3545; /* Rojo de Bootstrap */
    border-radius: 50%;
    border: 2px solid #8e2d3a;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.4);
}
```

### 💥 **Explicación visual**

- Cada **.hit-marker** representa un **golpe recibido**.
- Aparecen dinámicamente mediante la función `updateHUD()` en `main.js`, que crea un círculo rojo cada vez que un tanque recibe daño.
- El **sombreado interno (box-shadow)** genera efecto tridimensional.

🧠 **Ejercicio de aprendizaje activo**
 Cambia el color del marcador enemigo a verde en tu CSS:

```css
.hit-marker.enemy {
    background-color: #198754; /* Verde Bootstrap */
}
```

Y en `main.js`, podrías aplicar la clase `.enemy` cuando el golpe pertenece al tanque IA (¡pequeño reto para ti! 💪).

## ✨ 6. Relación CSS ↔ HTML ↔ JS

| Elemento             | CSS               | HTML                           | JS (función)                       |
| -------------------- | ----------------- | ------------------------------ | ---------------------------------- |
| Contenedor del juego | `.game-container` | `<div class="game-container">` | No aplica                          |
| HUD                  | `.hud`            | `<div class="hud">`            | `updateHUD()` actualiza los golpes |
| Canvas               | `#gameCanvas`     | `<canvas id="gameCanvas">`     | Se dibuja con `ctx.drawImage()`    |
| Marcadores           | `.hit-marker`     | `<div id="player-hits">`       | `updateHUD()` genera dinámicamente |

📘 **Conclusión práctica:**

 CSS define la “apariencia”, pero la **interactividad real** del HUD (mostrar golpes) ocurre en `main.js`.

 Esto demuestra cómo HTML, CSS y JS trabajan en conjunto en una arquitectura **modular y didáctica**.



🔍 **Resumen Código**

```css
body {
    background-color: #212529; /* Gris oscuro de Bootstrap */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
}

.game-container {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
}

#gameCanvas {
    background-color: #ced4da; /* Gris claro para el área de juego */
    border: 3px solid #495057; /* Borde gris oscuro */
    display: block; /* Elimina espacio extra debajo del canvas */
}

.hud {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.25rem;
    color: #343a40;
}

.hits-display {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    min-height: 24px; /* Para que no salte el layout */
    margin-top: 0.25rem;
}

/* Marcador de golpe recibido */
.hit-marker {
    width: 24px;
    height: 24px;
    background-color: #dc3545; /* Rojo de Bootstrap */
    border-radius: 50%;
    border: 2px solid #8e2d3a;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.4);
}
```

