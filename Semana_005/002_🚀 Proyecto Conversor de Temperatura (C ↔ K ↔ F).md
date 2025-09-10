# **🚀 Proyecto: Conversor de Temperatura (C ↔ K ↔ F)**

## 🔹 Paso 1: Estructura básica del proyecto

Primero creamos la carpeta principal con subcarpetas para organizar los archivos.

```css
/proyecto-temperatura-2
│── index.html        # Página principal
│── /css
│    └── styles.css   # Estilos personalizados
│── /js
     └── script.js    # Lógica en JavaScript
```

👉 **Buena práctica:** separar HTML, CSS y JS hace que el proyecto sea más ordenado y profesional.

## 🔹 Paso 2: Construcción del `index.html`

El **HTML** es el **esqueleto de la página**. Vamos a dividirlo en secciones.

### 2.1 Estructura inicial de un HTML5

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conversor Completo 🌡️</title>
  
  <!-- Bootstrap (estilos predefinidos) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- Nuestro CSS -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
```

👉 **Explicación**:

- `<!DOCTYPE html>` → le dice al navegador que es HTML5.
- `<html lang="es">` → idioma español.
- `<meta charset="UTF-8">` → permite usar tildes y ñ.
- `<meta name="viewport">` → hace que la web sea responsiva en móviles.
- `<link>` → carga **Bootstrap** (librería CSS) y **nuestro CSS**.

### 2.2 Encabezado

```html
<header class="bg-dark text-white text-center py-4">
  <h1 class="animate-text">🌡️ Conversor Completo</h1>
  <p>Convierte entre Celsius, Kelvin y Fahrenheit 🔄</p>
</header>
```

👉 Aquí usamos **clases de Bootstrap**:

- `bg-dark` → fondo negro.
- `text-white` → texto blanco.
- `text-center` → texto centrado.
- `py-4` → padding vertical (espaciado).

El `h1` tendrá animación (CSS).

### 2.3 Sección principal con el formulario

```html
<main class="container my-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-lg p-4">
        <h2 class="text-center mb-3">Haz tu conversión 📏</h2>

        <!-- Formulario -->
        <form id="tempForm">
          <div class="mb-3">
            <label for="valor" class="form-label">Ingrese el valor</label>
            <input type="number" class="form-control" id="valor" placeholder="Ej: 32" required>
          </div>

          <div class="mb-3">
            <label for="escala" class="form-label">Seleccione la escala</label>
            <select id="escala" class="form-select" required>
              <option value="C">Celsius (°C)</option>
              <option value="K">Kelvin (K)</option>
              <option value="F">Fahrenheit (°F)</option>
            </select>
          </div>

          <button type="submit" class="btn btn-success w-100">Convertir 🔄</button>
        </form>

        <!-- Resultado -->
        <div id="resultado" class="alert alert-info mt-4 text-center d-none"></div>
      </div>
    </div>
  </div>
</main>
```

👉 **Claves aquí**:

- El formulario tiene **id="tempForm"** → lo usaremos en **JavaScript** para detectar el envío.
- El input `id="valor"` recoge el número.
- El select `id="escala"` recoge la unidad (C, K o F).
- El div `id="resultado"` empezará oculto (`d-none`) y aparecerá con el resultado.

### 2.4 Pie de página + scripts

```html
<footer class="bg-dark text-white text-center py-3">
  <p>Práctica educativa con ❤️ usando Bootstrap + JS</p>
</footer>

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>
```

👉 Aquí se cargan los **scripts**:

- Primero **Bootstrap JS**.
- Luego **nuestro script.js** (donde está la lógica).

⚡ **Importante**: el script se coloca al final del `<body>` para que el HTML cargue primero y luego se ejecute el JS.

## 🔹 Paso 3: CSS (`styles.css`)

```css
/* Fondo animado */
body {
  background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fad390, #6a11cb);
  background-size: 400% 400%;
  animation: moverFondo 12s ease infinite;
  font-family: Arial, sans-serif;
}

@keyframes moverFondo {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Animación del título */
.animate-text {
  animation: flotar 3s ease-in-out infinite;
}
@keyframes flotar {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
```

👉 Tenemos **dos animaciones**:

1. `moverFondo`: hace que el fondo cambie suavemente.
2. `flotar`: el título sube y baja.

## 🔹 Paso 4: JavaScript (`script.js`)

Ahora conectamos **HTML con JS**.

```javascript
// Escuchamos el evento "submit" del formulario con id="tempForm"
document.getElementById("tempForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que la página se recargue al enviar

  // 1️⃣ Capturamos los valores del formulario
  let valor = parseFloat(document.getElementById("valor").value); // Número ingresado
  let escala = document.getElementById("escala").value;           // Escala seleccionada
  let resultadoDiv = document.getElementById("resultado");        // Div donde mostramos resultado
  let resultado = "";

  // 2️⃣ Aplicamos conversiones según la escala seleccionada
  if (escala === "C") {
    let kelvin = valor + 273.15;
    let fahrenheit = (valor * 9/5) + 32;
    resultado = `${valor} °C = ${kelvin.toFixed(2)} K | ${fahrenheit.toFixed(2)} °F`;
  } 
  else if (escala === "K") {
    let celsius = valor - 273.15;
    let fahrenheit = (celsius * 9/5) + 32;
    resultado = `${valor} K = ${celsius.toFixed(2)} °C | ${fahrenheit.toFixed(2)} °F`;
  } 
  else if (escala === "F") {
    let celsius = (valor - 32) * 5/9;
    let kelvin = celsius + 273.15;
    resultado = `${valor} °F = ${celsius.toFixed(2)} °C | ${kelvin.toFixed(2)} K`;
  }

  // 3️⃣ Mostramos el resultado en pantalla
  resultadoDiv.textContent = resultado;    // Insertamos el texto
  resultadoDiv.classList.remove("d-none"); // Lo hacemos visible
});
```

## 🔹 Paso 5: Comunicación entre HTML y JS

1. **El usuario interactúa con HTML** → escribe un número y elige una escala.
2. **JS captura esos datos** con `document.getElementById("valor").value` y `document.getElementById("escala").value`.
3. **JS calcula** usando las fórmulas matemáticas.
4. **JS devuelve el resultado al HTML** → con `resultadoDiv.textContent = resultado;`.
5. El div `resultado`, que estaba oculto con `d-none`, aparece y muestra el mensaje.

## 🧪 Ejemplo de uso

- Si escribo `0` y selecciono **Celsius**, el sistema muestra:
   `0 °C = 273.15 K | 32.00 °F`
- Si escribo `100` y selecciono **Fahrenheit**:
   `100 °F = 37.78 °C | 310.93 K`