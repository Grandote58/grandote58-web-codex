# **🚀 Proyecto: Landing Page Conversor de Temperatura**

*(HTML5 + Bootstrap 5 + CSS + JavaScript)*

## 📂 Paso 1: Crear la estructura del proyecto

Antes de escribir código, vamos a organizar el proyecto en carpetas para que sea **ordenado y profesional**.

```
/proyecto-temperatura
│── index.html        # Página principal
│── /css
│    └── styles.css   # Estilos personalizados
│── /js
│    └── script.js    # Lógica con JavaScript
```

👉 **Propósito:** separar responsabilidades:

- **HTML** → estructura y contenido.
- **CSS** → diseño y estilo visual.
- **JS** → lógica y comportamiento interactivo.

## 🏗️ Paso 2: Construir el archivo `index.html`

Este será el **esqueleto de la página**. Aquí usamos **Bootstrap 5** para no preocuparnos por estilos complejos y ganar rapidez.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Conversor de Temperatura 🌡️</title>

  <!-- 🔹 Cargamos Bootstrap 5 desde CDN (estilos y componentes predefinidos) -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- 🔹 Nuestro archivo de estilos -->
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- 🔹 ENCABEZADO -->
  <header class="bg-dark text-white text-center py-4">
    <h1>🌡️ Conversor de Temperatura</h1>
    <p>Convierte entre Celsius y Kelvin fácilmente 🚀</p>
  </header>
```

👉 Aquí ya tenemos:

- El **DOCTYPE** que indica HTML5.
- Configuración de idioma (`lang="es"`).
- Bootstrap cargado desde internet.
- Nuestro `styles.css` que personalizará algunos estilos.
- Un encabezado con clases de **Bootstrap** (`bg-dark`, `text-white`, `text-center`, `py-4`).

### Ahora agregamos la **sección principal** con el formulario:

```html
  <!-- 🔹 SECCIÓN PRINCIPAL -->
  <main class="container my-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- Tarjeta para agrupar el formulario -->
        <div class="card shadow-lg p-4">
          <h2 class="text-center mb-3">Conversión 📏</h2>
          
          <!-- Formulario con ID (para que JS lo reconozca) -->
          <form id="tempForm">
            <!-- Campo para ingresar valor -->
            <div class="mb-3">
              <label for="valor" class="form-label">Ingrese el valor de temperatura</label>
              <input type="number" class="form-control" id="valor" placeholder="Ej: 25" required>
            </div>

            <!-- Selector de escala -->
            <div class="mb-3">
              <label for="escala" class="form-label">Seleccione la escala</label>
              <select id="escala" class="form-select" required>
                <option value="C">Celsius (°C)</option>
                <option value="K">Kelvin (K)</option>
              </select>
            </div>

            <!-- Botón de envío -->
            <button type="submit" class="btn btn-primary w-100">Convertir 🔄</button>
          </form>

          <!-- Resultado que se mostrará dinámicamente -->
          <div id="resultado" class="alert alert-info mt-4 text-center d-none"></div>
        </div>
      </div>
    </div>
  </main>
```

👉 Aquí ocurre lo importante:

- El formulario tiene un **ID `tempForm`** → JS lo usará para capturar el evento de envío.
- El campo de entrada (`id="valor"`) recibe el número.
- El `select` (`id="escala"`) permite elegir entre Celsius o Kelvin.
- El div `resultado` está oculto con `d-none` hasta que tengamos algo que mostrar.

### Finalmente el **pie de página y scripts**:

```html
  <!-- 🔹 PIE DE PÁGINA -->
  <footer class="bg-dark text-white text-center py-3">
    <p>Desarrollado con ❤️ usando Bootstrap 5 y JavaScript</p>
  </footer>

  <!-- Script de Bootstrap (interactividad de componentes como modales, menús, etc.) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  
  <!-- Nuestro JavaScript personalizado -->
  <script src="js/script.js"></script>
</body>
</html>
```

## 🎨 Paso 3: Crear el archivo `css/styles.css`

```css
/* Fondo con degradado */
body {
  background: linear-gradient(to right, #74ebd5, #9face6);
  font-family: 'Arial', sans-serif;
}

/* Tarjeta con bordes redondeados */
.card {
  border-radius: 15px;
  background-color: #ffffffcc; /* Blanco con transparencia */
}

/* Botón personalizado */
.btn-primary {
  background-color: #0077b6;
  border: none;
}
.btn-primary:hover {
  background-color: #023e8a;
}
```

👉 **Propósito:** Bootstrap nos da un diseño base, pero con CSS podemos personalizar colores y estilos para que se vea único.

## ⚙️ Paso 4: Crear el archivo `js/script.js`

Aquí es donde ocurre la **magia del cálculo**.

```javascript
// ✅ Capturamos el formulario con su ID
document.getElementById("tempForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que la página se recargue automáticamente

  // ✅ 1. Obtener valores ingresados por el usuario
  let valor = parseFloat(document.getElementById("valor").value); // El número de temperatura
  let escala = document.getElementById("escala").value;           // La escala seleccionada
  let resultadoDiv = document.getElementById("resultado");        // El área donde mostramos el resultado

  let resultado = "";

  // ✅ 2. Realizar la conversión según la escala seleccionada
  if (escala === "C") {
    // Fórmula: K = C + 273.15
    let kelvin = valor + 273.15;
    resultado = `${valor} °C = ${kelvin.toFixed(2)} K`;
  } else if (escala === "K") {
    // Fórmula: C = K - 273.15
    let celsius = valor - 273.15;
    resultado = `${valor} K = ${celsius.toFixed(2)} °C`;
  }

  // ✅ 3. Mostrar el resultado en pantalla
  resultadoDiv.textContent = resultado;       // Insertamos el texto en el div
  resultadoDiv.classList.remove("d-none");    // Quitamos la clase que lo oculta
});
```

### 🧩 Explicación del flujo en JS

1. **Detectamos el evento**:
   - `addEventListener("submit", function(event){...})` → escuchamos cuando el usuario hace clic en el botón *Convertir*.
   - `event.preventDefault();` → bloqueamos el comportamiento normal del formulario (recargar página).
2. **Recibimos los parámetros (inputs)**:
   - `valor` → el número que escribió el usuario.
   - `escala` → la opción elegida (C o K).
3. **Aplicamos las fórmulas**:
   - Si elige Celsius → sumamos `273.15` para obtener Kelvin.
   - Si elige Kelvin → restamos `273.15` para obtener Celsius.
4. **Mostramos el resultado**:
   - Lo escribimos dentro de `resultadoDiv` con `textContent`.
   - Quitamos la clase `d-none` para que aparezca en pantalla.

## 🧪 Paso 5: Prueba en navegador

1. Abre `index.html` en Chrome o Firefox.
2. Escribe `25` y selecciona **Celsius** → deberías ver `25 °C = 298.15 K`.
3. Escribe `300` y selecciona **Kelvin** → deberías ver `300 K = 26.85 °C`.

