# **Actividad:** *Batalla de Tanques: de cero a jugable (HTML5 + Canvas + JS modular)*



![image-20251015125147497](C:\Users\juanc\OneDrive\Escritorio\CurseJavaScrip_Simulacion\Simulacion_004_b\assets\image-20251015125147497.png)



<img src="C:\Users\juanc\OneDrive\Escritorio\CurseJavaScrip_Simulacion\Simulacion_004_b\assets\image-20251015125158662.png" alt="image-20251015125158662" style="zoom:80%;" />



![image-20251015125212941](C:\Users\juanc\OneDrive\Escritorio\CurseJavaScrip_Simulacion\Simulacion_004_b\assets\image-20251015125212941.png)

## **Objetivos de aprendizaje**

1. Estructurar un mini-proyecto web con **HTML5, CSS y JavaScript modular**.
2. Renderizar sprites y muros en **canvas** y controlar movimiento con teclado.
3. Implementar **disparo, balas, colisiones** y un **HUD** básico.
4. Generar **laberintos** (aleatorios o desde **imágenes de mapa**) y comprender cómo “muros” se traducen a colisiones.
5. Programar una **IA sencilla**: línea de visión, patrullaje y disparo con cooldown.

**Meta al completar la actividad**

- Entregar un juego **jugable** donde el jugador (azul) derrota a la IA (verde) con 3 impactos; incluye **pantalla modal** de bienvenida/fin, **HUD de golpes**, **colisiones correctas** y **laberinto** cambiante. (Lógica principal en `main.js`, entidades en `tanque.js`, laberinto en `laberinto.js`.) main tanque laberinto

## 3) Estructura de archivos del proyecto

```css
/ (raíz)
├─ index.html          # Maquetación, modal de inicio, canvas y HUD  (Bootstrap)
├─ css/
│  └─ style.css        # Tema, contenedor, HUD y marcador de impactos
├─ js/
│  ├─ main.js          # Bucle de juego, entrada de teclado, HUD, colisiones
│  ├─ tanque.js        # Clases Tank y Bullet: movimiento, IA, disparo, dibujo
│  └─ laberinto.js     # Muros (Wall), generadores de laberinto y spawn aleatorio
└─ assets/
   ├─ tank1.png        # Sprite jugador
   ├─ tank2.png        # Sprite IA
   ├─ m1.png..m4.png   # Mapas de laberinto (plantillas por imagen)
   └─ m4.png           # Textura de muro
```

> **Referencias clave:** `index.html` define el **canvas**, el **modal** y carga `main.js` como **módulo ES**; `style.css` estiliza HUD/escena; `main.js` inicia juego, **loop**, entrada y HUD; `tanque.js` contiene **Tank**/**Bullet**; `laberinto.js` genera **muros** y posiciones libres. index style main tanque laberinto

## 🎯 **Sección A — Maquetación y arranque (HTML + Bootstrap + Canvas)**

### 🧩 **Objetivo de la sección**

Comprender cómo se estructura la base del proyecto en **HTML5 y Bootstrap**, aprender a crear un entorno visual limpio para el juego y preparar los elementos que conectarán con JavaScript: el **canvas**, el **HUD** y el **modal de inicio**.

## 🧱 1. Estructura base del documento HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Batalla de Tanques Aleatoria</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
```

### 🧠 **Aprendizaje clave**

- Se declara el **lenguaje** (`lang="es"`) para accesibilidad y SEO.
- Se vincula **Bootstrap 5.3.3**, que facilita el uso de componentes responsivos como modales y botones.
- Se incluye el archivo `style.css`, donde se define el estilo del HUD, el fondo y el canvas.
   *(Recuerda: este archivo se encuentra en la carpeta `/css` y debe mantenerse con el mismo nombre.)*

## 🕹️ 2. Contenedor principal del juego

```html
<div class="game-container">
  <div class="hud">
    <div>
      <h5>Tu Tanque (Azul)</h5>
      <div id="player-hits" class="hits-display"></div>
    </div>
    <div>
      <h5>Tanque Enemigo (Verde)</h5>
      <div id="ai-hits" class="hits-display"></div>
    </div>
  </div>
  <canvas id="gameCanvas"></canvas>
</div>
```

### 🧩 **Explicación**

- **`.game-container`**: es el marco visual del juego, con fondo claro y bordes redondeados.

- **`.hud` (Head-Up Display)**: muestra la vida o golpes recibidos.

  - `#player-hits` y `#ai-hits` serán actualizados dinámicamente por `main.js` mediante la función `updateHUD()`.

- **`<canvas>`**: es el “lienzo” donde se dibujan el tanque, las balas y el laberinto.
   En `main.js`, se obtiene así:

  ```javascript
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;
  ```

  Esto establece un área fija de **800×600 píxeles**, óptima para juegos 2D simples.

🎓 **Aprendizaje activo**
 Prueba a cambiar el tamaño del canvas y observa cómo se ajusta la jugabilidad.
 Por ejemplo:

```javascript
canvas.width = 1000; 
canvas.height = 700;
```

## 💬 3. Modal de bienvenida e instrucciones

```html
<div class="modal fade" id="gameModal" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-bg-dark">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">¡Bienvenido a la Batalla de Tanques!</h5>
      </div>
      <div class="modal-body" id="modalBody">
        <p><strong>Objetivo:</strong> Golpea al tanque enemigo 3 veces para ganar.</p>
        <p><strong>Controles:</strong></p>
        <ul>
          <li><strong>Moverse:</strong> Teclas W, A, S, D</li>
          <li><strong>Disparar:</strong> Barra Espaciadora</li>
        </ul>
        <p>¡Cada vez que juegues el laberinto será diferente!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary w-100" id="startGameBtn">¡Comenzar a Jugar!</button>
      </div>
    </div>
  </div>
</div>
```

### 💡 **Análisis didáctico**

- Usa **Bootstrap Modal** para mostrar instrucciones iniciales sin necesidad de recargar la página.

- El botón `#startGameBtn` activa el evento en `main.js`:

  ```js
  const startGameBtn = document.getElementById('startGameBtn');
  const modal = new bootstrap.Modal(document.getElementById('gameModal'));
  startGameBtn.addEventListener('click', init);
  ```

  Esto cierra el modal y **llama a la función `init()`**, que inicia la generación del laberinto, los tanques y el bucle principal del juego.

🎯 **Ejercicio práctico**
 Agrega una línea nueva dentro de `<div class="modal-body">`:

```html
<p>Consejo: ¡Evita disparar contra los muros, desperdiciarás tus balas!</p>
```

Guarda y comprueba que aparece correctamente al inicio del juego.

## 🧩 4. Inclusión de scripts al final del `body`

```js
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script type="module" src="js/main.js"></script>
```

### 🔍 **Concepto pedagógico**

- El primer script carga **Bootstrap JS** (necesario para abrir/cerrar el modal).
- El segundo importa el módulo `main.js`, desde donde se orquesta el juego:
  - Configura el canvas.
  - Carga imágenes (`tank1.png`, `tank2.png`, `m4.png`).
  - Genera el laberinto.
  - Controla la IA, las colisiones y el HUD.

📘 **Reflexión**
 Esta separación modular es fundamental para un proyecto escalable:

- `index.html` → interfaz visual.
- `style.css` → presentación visual.
- `main.js` → lógica del juego.



```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Batalla de Tanques Aleatoria</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div class="game-container">
        <div class="hud">
            <div>
                <h5>Tu Tanque (Azul)</h5>
                <div id="player-hits" class="hits-display"></div>
            </div>
            <div>
                <h5>Tanque Enemigo (Verde)</h5>
                <div id="ai-hits" class="hits-display"></div>
            </div>
        </div>
        
        <canvas id="gameCanvas"></canvas>
    </div>
    
    <div class="modal fade" id="gameModal" data-bs-backdrop="static" data-bs-keyboard="false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content text-bg-dark">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">¡Bienvenido a la Batalla de Tanques!</h5>
          </div>
          <div class="modal-body" id="modalBody">
            <p><strong>Objetivo:</strong> Golpea al tanque enemigo 3 veces para ganar.</p>
            <p><strong>Controles:</strong></p>
            <ul>
                <li><strong>Moverse:</strong> Teclas W, A, S, D</li>
                <li><strong>Disparar:</strong> Barra Espaciadora</li>
            </ul>
            <p>¡Cada vez que juegues el laberinto será diferente!</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary w-100" id="startGameBtn">¡Comenzar a Jugar!</button>
          </div>
        </div>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

