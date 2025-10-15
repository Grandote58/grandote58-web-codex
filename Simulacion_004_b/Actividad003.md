# 🎨 Sección — Estilos y HUD (CSS)

### 1) 🌌 Lienzo general (body)

- Centra el juego en pantalla, da look & feel “oscuro” y elimina márgenes del navegador.

  ```css
  body {
    background-color: #212529;
    display: flex; justify-content: center; align-items: center;
    height: 100vh; margin: 0; font-family: sans-serif;
  }
  ```

  Esto nos garantiza una **experiencia enfocada**: el juego queda en el centro, sin scrolls ni distracciones. style

### 2) 🧱 Contenedor del juego

- Caja clara con padding, bordes redondeados y sombra: mejora contraste y legibilidad del HUD.

  ```css
  .game-container {
    background-color: #f8f9fa;
    padding: 1rem; border-radius: .5rem;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.5);
  }
  ```

  Útil para “separar” visualmente el juego del fondo oscuro. style

### 3) 🖼️ Área de juego (canvas)

- Fondo gris claro + borde oscuro → delimita el espacio jugable y facilita percibir colisiones.

  ```css
  #gameCanvas {
    background-color: #ced4da;
    border: 3px solid #495057;
    display: block;
  }
  ```

  El `display: block` elimina un espacio fantasma debajo del canvas. style

### 4) 🧾 HUD (marcadores)

- Barra superior con títulos y contadores de golpes de cada tanque.

  ```css
  .hud {
    display: flex; justify-content: space-between;
    padding: .5rem .25rem; color: #343a40;
  }
  .hits-display {
    display: flex; justify-content: center; gap: .5rem;
    min-height: 24px; margin-top: .25rem;
  }
  ```

  El `min-height` evita que el layout “salte” cuando aparecen los marcadores. style

### 5) 🔴 “Burbujas” de golpe recibido

- Elementos circulares rojos que se añaden dinámicamente al recibir impactos.

  ```css
  .hit-marker {
    width: 24px; height: 24px;
    background-color: #dc3545; border-radius: 50%;
    border: 2px solid #8e2d3a; box-shadow: inset 0 0 5px rgba(0,0,0,.4);
  }
  ```

  Se actualizan desde JS con `updateHUD()`. style

#### 🧪 Mini-prácticas (rápidas)

- **Accesibilidad:** sube el contraste del borde del canvas y evalúa legibilidad.
- **Feedback visual:** cambia `background-color` del canvas al recibir impacto (agrega/quita clase con JS).
- **Tema:** crea una clase `.theme-dark` para `.game-container` y alterna tema con un botón.

## 🧠 Sección C — Bucle de juego, teclado y dibujado (JS principal)

### 1) ⚙️ Arranque y estado global

- Canvas, constantes, Bootstrap Modal, imágenes y estado. `main.js`

  ```js
  import { generateMaze, getRandomEmptyPosition, generateMazeFromImage } from './laberinto.js';
  import { Tank } from './tanque.js';
  
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800; canvas.height = 600;
  const CELL_SIZE = 40;
  
  const modal = new bootstrap.Modal(document.getElementById('gameModal'));
  const startGameBtn = document.getElementById('startGameBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  
  let player, ai, walls, keys = {};
  let gameOver = false;
  
  const playerImage = new Image(); playerImage.src = 'assets/tank1.png';
  const aiImage = new Image(); aiImage.src = 'assets/tank2.png';
  const wallTexture = new Image(); wallTexture.src = 'assets/m4.png';
  ```

  Esta sección fija **tamaño lógico** del juego, registra referencias al **modal** y prepara sprites/texture. main

### 2) 🧭 `init()` — Preparar una partida

- Genera laberinto (desde imagen o aleatorio), busca celdas libres y centra los tanques.

  ```js
  async function init() {
    gameOver = false;
    const tankSize = Math.max(24, CELL_SIZE - 8);
  
    const mapIndex = Math.floor(Math.random()*4)+1;
    const mapPath = `assets/m${mapIndex}.png`;
    try {
      walls = await generateMazeFromImage(mapPath, canvas.width, canvas.height, CELL_SIZE, tankSize);
    } catch { walls = generateMaze(canvas.width, canvas.height, CELL_SIZE); }
  
    const playerPos = getRandomEmptyPosition(...);
    const aiPos = getRandomEmptyPosition(...);
  
    function centerInCell(pos, size){ return { x: pos.x + CELL_SIZE/2 - size/2, y: pos.y + CELL_SIZE/2 - size/2 }; }
    const pC = centerInCell(playerPos, tankSize);
    let aC = centerInCell(aiPos, tankSize);
  
    // Corrige solapes o spawns dentro de muros con intentos adicionales…
    // (reubicación defensiva)
  }
  ```

  Con esto garantizamos **spawn seguro** y **escenario distinto** cada partida. main

- Instancia de tanques y límites:

  ```js
  const imageRotation = Math.PI/2;
  player = new Tank(pC.x, pC.y, playerImage, false, tankSize, imageOffset, imageRotation);
  ai     = new Tank(aC.x, aC.y, aiImage, true,  tankSize, imageOffset, imageRotation);
  Tank.setCanvasBounds(canvas.width, canvas.height);
  gameLoop();
  ```

  La **rotación base** alinea el sprite con su ángulo lógico. Se arranca el bucle. main

### 3) ⏱️ Game Loop — `gameLoop()`, `update()`, `draw()`

- Estructura estándar 60 FPS aprox.:

  ```js
  function gameLoop(){
    if (gameOver) return;
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }
  ```

  `update()` gestiona **entrada, IA, colisiones**; `draw()` pinta **muros, tanques, HUD**. main main main

### 4) 🎮 Entrada — teclado y acciones

- Escuchas globales + disparo (evita scroll por Space):

  ```js
  window.addEventListener('keydown', e => {
    const key = e.key.toLowerCase(); keys[key] = true;
    if (e.code === 'Space' || key === 'space' || key === ' ') { e.preventDefault(); player.shoot(); }
  });
  window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });
  startGameBtn.addEventListener('click', () => { modal.hide(); init(); });
  modal.show(); // al cargar
  ```

  `Space` dispara; el modal inicia la partida con `init()`. main

- **Mapeo continuo** (WASD/Flechas) y giro 90° en `handleInput()`:

  ```js
  if (keys['w']||keys['arrowup'])    player.move(player.speed, walls);
  if (keys['s']||keys['arrowdown'])  player.move(-player.speed/2, walls);
  if (keys['a']||keys['arrowleft'])  player.angle -= .08;
  if (keys['d']||keys['arrowright']) player.angle += .08;
  if (keys['e']) { keys['e'] = false; player.rotate90 && player.rotate90(); }
  ```

  Se privilegia **avance/retroceso** y **rotación suave**; `E` añade un **giro táctico**. main

### 5) 🧱 Colisiones y fin de juego

- Revisa impactos bala↔muro, bala↔tanque; 3 golpes = fin.

  ```js
  checkBulletHits(attacker, target){
    // si bala toca muro → eliminar; si entra en radio del tanque → ++hits
    if (target.hits >= 3) endGame(attacker===player ? "¡Felicitaciones, Ganaste!" : "Juego Finalizado");
  }
  function checkCollisions(){ checkBulletHits(player, ai); checkBulletHits(ai, player); resolveTankCollisions(); }
  function endGame(msg){ gameOver=true; modalTitle.textContent=msg; modalBody.innerHTML="¿Quieres jugar otra vez?"; startGameBtn.textContent="Jugar de Nuevo"; modal.show(); }
  ```

  Muestra el **modal final** y permite reiniciar. main main main

### 6) 🖌️ Dibujo — muros, tanques y HUD

- Limpia, dibuja muros con **textura** (fallback a color), tanques y actualiza HUD:

  ```js
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (wallTexture.complete && wallTexture.naturalWidth){
    walls.forEach(w=>ctx.drawImage(wallTexture, w.x,w.y,w.width,w.height));
  } else {
    ctx.fillStyle='#6c757d'; walls.forEach(w=>ctx.fillRect(w.x,w.y,w.width,w.height));
  }
  player.draw(ctx); ai.draw(ctx); updateHUD();
  ```

  La textura por celda conserva la **alineación con la grilla** del laberinto. main

- **HUD dinámico** (se rellena con “burbujas” rojas):

  ```js
  function updateHUD(){
    playerHitsDiv.innerHTML = Array(player.hits).fill('<div class="hit-marker"></div>').join('');
    aiHitsDiv.innerHTML      = Array(ai.hits).fill('<div class="hit-marker"></div>').join('');
  }
  ```

  Conecta el CSS de `.hit-marker` con la **lógica de impactos**. main

### 🧪 Micro-desafíos de práctica (para afianzar)

1. **Balanceo:** reduce `player.speed` a `1.6` y sube `ai.aiShootCooldown` a `45` (en `tanque.js`) → ¿la partida se vuelve más táctica? Explica. tanque
2. **UX de disparo:** añade un pequeño “cooldown” al jugador (p.ej., variable `playerShootCD`) y bloquea `shoot()` si >0.
3. **Efecto impacto:** cambia temporalmente el color de fondo del canvas en `checkBulletHits()` al registrar un golpe.

### 🧩 Idea clave (resumen)

- **`init()`** crea mundo y coloca entidades 👉 **`gameLoop()`** llama **`update()`** (mover/IA/colisiones) y **`draw()`** (render y HUD) 👉 **Eventos** de teclado alimentan `keys` 👉 **`handleInput()`** mueve al jugador 👉 **HUD** refleja daños en tiempo real.
   Con este flujo ya dominas el **esqueleto** de un arcade 2D con **canvas + JS**.



🔍 **Resumen Código**

```js
import { generateMaze, getRandomEmptyPosition, generateMazeFromImage } from './laberinto.js';
import { Tank } from './tanque.js';

// --- CONFIGURACIÓN INICIAL ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;
const CELL_SIZE = 40; // Tamaño de cada celda del laberinto (y de los muros).

const modal = new bootstrap.Modal(document.getElementById('gameModal'));
const startGameBtn = document.getElementById('startGameBtn');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

// --- ESTADO DEL Juego ---
let player, ai, walls, keys = {};
let gameOver = false;

// Cargar las imágenes para los tanques.
const playerImage = new Image();
playerImage.src = 'assets/tank1.png';
const aiImage = new Image();
aiImage.src = 'assets/tank2.png';
// Cargar textura de pared (usaremos m4.png tal como indicaste)
const wallTexture = new Image();
wallTexture.src = 'assets/m4.png';


// --- FUNCIONES PRINCIPALES ---

/** Inicia o reinicia el juego. */
async function init() {
    gameOver = false;
    // 1. Elegir tamaño del tanque basado en la celda para mejor ajuste visual.
    const tankSize = Math.max(24, CELL_SIZE - 8); // evita tanques muy pequeños

    // 2. Genera un nuevo laberinto: elegimos aleatoriamente una de las imágenes m1..m4
    const mapIndex = Math.floor(Math.random() * 4) + 1; // 1..4
    const mapPath = `assets/m${mapIndex}.png`;
    try {
        walls = await generateMazeFromImage(mapPath, canvas.width, canvas.height, CELL_SIZE, tankSize);
    } catch (err) {
        console.error('Error cargando mapa desde imagen, usando generador aleatorio:', err);
        walls = generateMaze(canvas.width, canvas.height, CELL_SIZE);
    }

    const playerPos = getRandomEmptyPosition(walls, canvas.width, canvas.height, CELL_SIZE, tankSize, tankSize);
    const aiPos = getRandomEmptyPosition(walls, canvas.width, canvas.height, CELL_SIZE, tankSize, tankSize);
    // Centrar la posición dentro de la celda para mayor fluidez y según el tamaño real.
    function centerInCell(pos, size) {
        return {
            x: pos.x + CELL_SIZE / 2 - size / 2,
            y: pos.y + CELL_SIZE / 2 - size / 2
        };
    }
    const pC = centerInCell(playerPos, tankSize);
    let aC = centerInCell(aiPos, tankSize);
    // Evitar solape inicial entre player y ai: si están muy cerca, desplazar la IA.
    const dx = pC.x - aC.x;
    const dy = pC.y - aC.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 60) {
        // mover la IA a una celda adyacente libre (intentar varias veces)
        let tries = 0;
        while (tries < 10 && dist < 60) {
            const newPos = getRandomEmptyPosition(walls, canvas.width, canvas.height, CELL_SIZE, tankSize, tankSize);
            aC = centerInCell(newPos);
            const ndx = pC.x - aC.x;
            const ndy = pC.y - aC.y;
            if (Math.sqrt(ndx * ndx + ndy * ndy) >= 60) break;
            tries++;
        }
    }

    // Defensive: si por alguna razón el tanque sigue dentro de un muro, intentar reposicionarlo
    function isTankCollidingAt(x, y) {
        return walls.some(w => x < w.x + w.width && x + tankSize > w.x && y < w.y + w.height && y + tankSize > w.y);
    }
    // Reubicar player si colisiona
    let repTries = 0;
    while (isTankCollidingAt(pC.x, pC.y) && repTries < 20) {
        const newPos = getRandomEmptyPosition(walls, canvas.width, canvas.height, CELL_SIZE, tankSize, tankSize);
        const np = centerInCell(newPos, tankSize);
        pC.x = np.x; pC.y = np.y;
        repTries++;
    }
    repTries = 0;
    while (isTankCollidingAt(aC.x, aC.y) && repTries < 20) {
        const newPos = getRandomEmptyPosition(walls, canvas.width, canvas.height, CELL_SIZE, tankSize, tankSize);
        const np = centerInCell(newPos, tankSize);
        aC.x = np.x; aC.y = np.y;
        repTries++;
    }

    // Opcional: ajustar imageOffset si las imágenes no están centradas exactamente.
    const imageOffset = { x: 0, y: 0 };
    // Si las imágenes de los tanques apuntan hacia arriba por defecto, aplicamos un ajuste
    // para que el ángulo lógico (0 = derecha) coincida con la dirección visual.
    const imageRotation = Math.PI / 2; // gira 90 grados
    player = new Tank(pC.x, pC.y, playerImage, false, tankSize, imageOffset, imageRotation);
    ai = new Tank(aC.x, aC.y, aiImage, true, tankSize, imageOffset, imageRotation); // El "true" lo marca como IA.

    // Configurar límites globales para que los tanques y balas no salgan del canvas.
    Tank.setCanvasBounds(canvas.width, canvas.height);

    // 3. Comienza el bucle principal del juego.
    gameLoop();
}

/** El bucle que se ejecuta en cada frame (unas 60 veces por segundo). */
function gameLoop() {
    if (gameOver) return; // Si el juego terminó, no hacer nada.

    update(); // Actualiza la lógica (movimiento, IA, colisiones).
    draw();   // Dibuja todo en la pantalla.
    
    // Pide al navegador que vuelva a llamar a gameLoop para el siguiente frame.
    requestAnimationFrame(gameLoop);
}

/** Actualiza el estado de todos los elementos del juego. */
function update() {
    handleInput(); // Revisa las teclas que el jugador presiona.
    player.update(walls);
    ai.update(walls, player); // La IA necesita saber dónde está el jugador para apuntarle.
    checkCollisions();
}

/** Dibuja todos los elementos en el canvas. */
function draw() {
    // Limpia toda la pantalla.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibuja los muros del laberinto.
    if (wallTexture && wallTexture.complete && wallTexture.naturalWidth) {
        // Dibujar la textura repetida por celda para mantenerla alineada con la grilla.
        walls.forEach(wall => {
            try {
                ctx.drawImage(wallTexture, wall.x, wall.y, wall.width, wall.height);
            } catch (e) {
                // En caso de error, fallback a rectángulo.
                ctx.fillStyle = '#6c757d';
                ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
            }
        });
    } else {
        ctx.fillStyle = '#6c757d'; // Color gris oscuro de Bootstrap.
        walls.forEach(wall => ctx.fillRect(wall.x, wall.y, wall.width, wall.height));
    }

    // Dibuja los tanques (y sus balas).
    player.draw(ctx);
    ai.draw(ctx);
    
    // Actualiza los marcadores de golpes.
    updateHUD();
}

// --- FUNCIONES AUXILIARES ---

/** Revisa qué teclas está presionando el jugador para mover su tanque. */
function handleInput() {
    // Movimiento con WASD o flechas.
    if (keys['w'] || keys['arrowup']) player.move(player.speed, walls);
    if (keys['s'] || keys['arrowdown']) player.move(-player.speed / 2, walls); // Ir para atrás más lento.
    if (keys['a'] || keys['arrowleft']) player.angle -= 0.08; // Rotar a la izquierda.
    if (keys['d'] || keys['arrowright']) player.angle += 0.08; // Rotar a la derecha.

    // Tecla adicional para girar 90 grados (por ejemplo, 'e').
    if (keys['e']) {
        // girar una vez por pulsación: consumimos el flag para que no gire continuamente.
        keys['e'] = false;
        player.rotate90 && player.rotate90();
    }
}

/** Revisa si las balas de un tanque golpean a otro, o a un muro. */
function checkCollisions() {
    // Revisa las balas del jugador.
    checkBulletHits(player, ai);
    // Revisa las balas de la IA.
    checkBulletHits(ai, player);

    // Resolver colisiones entre tanques (si se solapan, separarlos automáticamente).
    resolveTankCollisions();
}

function resolveTankCollisions() {
    // Centros de los tanques
    const pCx = player.x + player.width / 2;
    const pCy = player.y + player.height / 2;
    const aCx = ai.x + ai.width / 2;
    const aCy = ai.y + ai.height / 2;
    const dx = pCx - aCx;
    const dy = pCy - aCy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = (player.width + ai.width) / 2;
    if (dist < minDist && dist > 0) {
        // Profundidad de solapamiento
        const overlap = minDist - dist;
        // Empujar ambos tanques en sentidos opuestos proporcionalmente.
        // player se empuja en dirección (dx, dy), ai en (-dx, -dy)
        player.pushBack(-dx, -dy, walls);
        ai.pushBack(dx, dy, walls);
        // También ajustar posiciones ligeramente si siguen solapados
        if (Math.sqrt((player.x + player.width/2 - (ai.x + ai.width/2))**2 + (player.y + player.height/2 - (ai.y + ai.height/2))**2) < minDist) {
            // último intento: mover cada uno la mitad del overlap a lo largo de la normal
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            player.x += nx * (overlap / 2);
            player.y += ny * (overlap / 2);
            ai.x -= nx * (overlap / 2);
            ai.y -= ny * (overlap / 2);
        }
    }
}

function checkBulletHits(attacker, target) {
    // Iteramos al revés para poder eliminar balas sin romper el índice.
    for (let i = attacker.bullets.length - 1; i >= 0; i--) {
        const bullet = attacker.bullets[i];
        // ¿La bala chocó con un muro? Usamos la comprobación de punto.
        if (walls.some(w => bullet.x >= w.x && bullet.x <= w.x + w.width && bullet.y >= w.y && bullet.y <= w.y + w.height)) {
            attacker.bullets.splice(i, 1);
            continue;
        }

        // ¿La bala chocó con el tanque objetivo?
        const dx = bullet.x - (target.x + target.width / 2);
        const dy = bullet.y - (target.y + target.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < target.width / 2) {
            attacker.bullets.splice(i, 1);
            target.hits++;
            if (target.hits >= 3) {
                endGame(attacker === player ? "¡Felicitaciones, Ganaste!" : "Juego Finalizado");
            }
        }
    }
}

/** Actualiza la interfaz para mostrar los golpes recibidos. */
function updateHUD() {
    const playerHitsDiv = document.getElementById('player-hits');
    const aiHitsDiv = document.getElementById('ai-hits');
    
    // Crea un "div" por cada golpe recibido.
    playerHitsDiv.innerHTML = Array(player.hits).fill('<div class="hit-marker"></div>').join('');
    aiHitsDiv.innerHTML = Array(ai.hits).fill('<div class="hit-marker"></div>').join('');
}

/** Termina el juego y muestra el mensaje final. */
function endGame(message) {
    gameOver = true;
    modalTitle.textContent = message;
    modalBody.innerHTML = "¿Quieres jugar otra vez?";
    startGameBtn.textContent = "Jugar de Nuevo";
    modal.show();
}

// --- EVENTOS DE TECLADO Y BOTÓN ---

// Guarda la tecla presionada.
window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    keys[key] = true;
    // Disparar con la barra espaciadora (evitamos que ' ' se convierta en ' ' string inesperado).
    if (e.code === 'Space' || key === 'space' || key === ' ') {
        e.preventDefault();
        player.shoot();
    }
});

// Borra la tecla cuando se suelta.
window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// El botón del modal inicia el juego.
startGameBtn.addEventListener('click', () => {
    modal.hide();
    init();
});

// --- INICIO DEL JUEGO ---
// Muestra el modal con las instrucciones la primera vez que se carga la página.
modal.show();
```

