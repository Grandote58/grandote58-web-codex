# 🧠 Sección — Entidades: **Tank** y **Bullet**

------

### 🔸 1) Clase **Bullet** — “la bala”

**Qué es:** un objeto muy liviano con posición, ángulo y velocidad.
**Por qué importa:** muchas instancias conviven en pantalla; su simplicidad evita lag.

```js
class Bullet {
  constructor(x, y, angle) {
    this.x = x; this.y = y;     // posición
    this.angle = angle;         // dirección de movimiento
    this.speed = 5;             // px por frame
    this.size = 6;              // radio visual
  }
  update() {                    // avanzar en línea recta
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }
  draw(ctx) {                   // círculo gris oscuro
    ctx.fillStyle = '#343a40';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
```

Esta implementación usa trigonometría básica para desplazar la bala cada frame. main

**💡 Mini-reto:** cambia `this.size` a `4` y `this.speed` a `6` para un “sentir” más rápido. ¿Afecta la dificultad?

### 🔷 2) Clase **Tank** — “el actor principal”

#### 2.1 Propiedades y constructor

```js
export class Tank {
  constructor(x, y, image, isAI=false, size=35, imageOffset={x:0,y:0}, imageRotation=0) {
    this.x = x; this.y = y;
    this.image = image;
    this.width = size; this.height = size;
    this.imageOffset = imageOffset;
    this.imageRotation = imageRotation || 0; // alinear sprite ↔ ángulo
    this.angle = 0; this.speed = 2;
    this.bullets = []; this.hits = 0;
    this.isAI = isAI;

    // Parámetros de IA
    this.aiDecisionTimer = 0;
    this.aiDirection = this.angle;
    this.aiSightRange = 400;
    this.aiShootCooldown = 30;
    this.aiShootTimer = 0;
  }
}
```

Notas clave:

- `imageRotation` compensa sprites que “apuntan hacia arriba” por defecto (se usa `π/2`).
- `isAI` diferencia lógica de jugador/IA.
- `aiSightRange`/`aiShootCooldown` controlan visión y cadencia de la IA. main

#### 2.2 Dibujado del tanque (rotación centrada)

```js
draw(ctx) {
  ctx.save();
  ctx.translate(this.x + this.width/2 + (this.imageOffset.x||0),
                this.y + this.height/2 + (this.imageOffset.y||0));
  ctx.rotate(this.angle + this.imageRotation);
  ctx.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
  ctx.restore();
  this.bullets.forEach(b => b.draw(ctx));
}
```

Se traslada al **centro del tanque** y luego se rota para que el sprite quede alineado con el ángulo lógico. Después se dibujan todas sus balas. main

#### 2.3 Actualización por frame

```js
update(walls, playerTank) {
  if (this.isAI) this.updateAI(walls, playerTank); // decidir y disparar
  this.bullets.forEach(b => b.update());           // mover balas
  // limpiar balas fuera del canvas
  this.bullets = this.bullets.filter(b => 
    b.x >= -10 && b.x <= (Tank._canvasWidth||800)+10 &&
    b.y >= -10 && b.y <= (Tank._canvasHeight||600)+10
  );
  // mantener dentro de límites (si existen)
  if (Tank._canvasWidth && Tank._canvasHeight) this.clampToBounds(Tank._canvasWidth, Tank._canvasHeight);
}
```

- Se elimina **basura fuera de pantalla** para no degradar rendimiento.
- `clampToBounds` evita que un tanque se salga del canvas. tanque tanque

#### 2.4 Límites del canvas (estático)

```js
static setCanvasBounds(w, h) { Tank._canvasWidth = w; Tank._canvasHeight = h; }
clampToBounds(w, h) {
  const maxX = w - this.width, maxY = h - this.height;
  if (this.x < 0) this.x = 0; if (this.y < 0) this.y = 0;
  if (this.x > maxX) this.x = maxX; if (this.y > maxY) this.y = maxY;
}
```

Se configura una vez desde `main.js` y cada tanque se auto-contiene. tanque tanque

### 🛰️ 3) Movimiento y colisiones con muros

#### 3.1 Movimiento “inteligente” con pequeños desvíos

```js
move(speed, walls) {
  const newX = this.x + Math.cos(this.angle) * speed;
  const newY = this.y + Math.sin(this.angle) * speed;
  if (!this.checkWallCollision(newX, newY, walls)) {
    this.x = newX; this.y = newY; return true;
  }
  // si choca: prueba ángulos alternos para evitar atascarse
  const tryAngles = [this.angle + 0.5, this.angle - 0.5, this.angle + 1.0, this.angle - 1.0];
  for (let a of tryAngles) {
    const tx = this.x + Math.cos(a) * speed;
    const ty = this.y + Math.sin(a) * speed;
    if (!this.checkWallCollision(tx, ty, walls)) { this.x = tx; this.y = ty; this.angle = a; return true; }
  }
  // como último recurso, retrocede un poco
  const backSpeed = -Math.sign(speed) * Math.abs(speed) * 0.5;
  const bx = this.x + Math.cos(this.angle) * backSpeed;
  const by = this.y + Math.sin(this.angle) * backSpeed;
  if (!this.checkWallCollision(bx, by, walls)) { this.x = bx; this.y = by; return true; }
  return false;
}
```

Este patrón evita que el tanque “se pegue” a un muro buscando **ángulos alternativos** y retroceso. laberinto

#### 3.2 Detección de choque contra muros (AABB)

```js
checkWallCollision(x, y, walls) {
  const hitBox = { x, y, width: this.width, height: this.height };
  return walls.some(w =>
    hitBox.x < w.x + w.width &&
    hitBox.x + hitBox.width > w.x &&
    hitBox.y < w.y + w.height &&
    hitBox.y + hitBox.height > w.y
  );
}
```

Se usa **colisión de rectángulos** (rápida y suficiente para sprites cuadrados). tanque

#### 3.3 Empuje para separar tanques (anti-atasco)

```js
pushBack(dx, dy, walls) {
  const distance = Math.sqrt(dx*dx + dy*dy) || 1;
  const nx = dx / distance, ny = dy / distance;
  const sep = Math.max(4, Math.min(20, Math.ceil(distance)));
  const newX = this.x - nx * sep, newY = this.y - ny * sep;
  if (!this.checkWallCollision(newX, newY, walls)) { this.x = newX; this.y = newY; return true; }
  const altX = this.x + nx * sep, altY = this.y + ny * sep;
  if (!this.checkWallCollision(altX, altY, walls)) { this.x = altX; this.y = altY; return true; }
  return false;
}
```

Se calcula una normal y se empuja en sentido opuesto; si no se puede, prueba al revés. tanque

### 🎯 4) Disparo y utilidades de control

#### 4.1 Disparar con límite de balas activas

```js
shoot() {
  if (this.bullets.length < 3) {               // máx. 3 balas
    const muzzleOffset = Math.max(this.width, this.height)/2 + 4;
    const bx = this.x + this.width/2  + Math.cos(this.angle) * muzzleOffset;
    const by = this.y + this.height/2 + Math.sin(this.angle) * muzzleOffset;
    this.bullets.push(new Bullet(bx, by, this.angle));
  }
}
```

Genera la bala **al frente del cañón** para que no colisione con el propio tanque al salir. tanque

#### 4.2 Giro rápido a 90° (táctica E-key)

```js
rotate90() {
  const dir = Math.random() < 0.5 ? 1 : -1;
  this.angle += dir * (Math.PI / 2);
  if (this.angle > Math.PI) this.angle -= 2*Math.PI;
  if (this.angle < -Math.PI) this.angle += 2*Math.PI;
}
```

Útil para **escapar** o **rematar** en pasillos; normaliza el ángulo para evitar desbordes. tanque

### 🤖 5) IA del tanque enemigo (visión + decisión + disparo)

#### 5.1 Ciclo de IA por frame

```js
updateAI(walls, playerTank) {
  this.aiDecisionTimer--;
  this.aiShootTimer = Math.max(0, this.aiShootTimer - 1);

  // Línea de visión y distancia al jugador
  const centerX = this.x + this.width/2, centerY = this.y + this.height/2;
  const pX = playerTank.x + playerTank.width/2, pY = playerTank.y + playerTank.height/2;
  const dx = pX - centerX, dy = pY - centerY;
  const dist = Math.sqrt(dx*dx + dy*dy);

  const canSeePlayer = dist <= this.aiSightRange && this.hasLineOfSight(walls, playerTank);

  if (canSeePlayer) {
    this.aiDirection = Math.atan2(dy, dx);
    this.angle = this.aiDirection;
    if (this.aiShootTimer <= 0) { this.shoot(); this.aiShootTimer = this.aiShootCooldown; }
    this.move(this.speed, walls);   // presiona al jugador
    return;
  }

  // Exploración cuando no ve al jugador: decisiones aleatorias cada cierto tiempo…
  if (this.aiDecisionTimer <= 0) {
    this.aiDecisionTimer = 30 + Math.floor(Math.random() * 90);
    // 60% moverse aleatorio, 30% mirar al jugador, 10% quedarse/rotar
    // (implementación en archivo)
  }
}
```

La IA **prioriza**: si ve, **apunta, dispara y avanza**; si no, **patrulla/rota**. tanque

#### 5.2 Línea de visión (ray-marching simple)

```js
hasLineOfSight(walls, playerTank) {
  // Muestra puntos entre ambos tanques y corta si alguno cae dentro de un muro
  for (let i=0; i<=steps; i++) {
    const sx = fromX + dx * t, sy = fromY + dy * t;
    for (let w of walls) {
      if (sx >= w.x && sx <= w.x + w.width && sy >= w.y && sy <= w.y + w.height) return false;
    }
  }
  return true;
}
```

Es un **raycast simplificado**: rápido y suficiente para este tipo de laberintos ortogonales. laberinto

## 🧪 Micro-prácticas guiadas

1. **Balancear cadencia de IA**
    Sube `aiShootCooldown` a `45` para que dispare menos seguido y comenta el efecto en la dificultad. main
2. **Límite de balas del jugador**
    Cambia el `3` de `shoot()` por `2` y evalúa si incentiva más movimiento y menos “spam”. tanque
3. **Tanques pesados**
    Aumenta `size` en el constructor del jugador a `45` y prueba: ¿te atoras más? Observa `checkWallCollision()` y justifica. tanque
4. **Escape asistido**
    En `move()`, añade un ángulo extra de prueba `±1.2` para pasillos más cerrados y registra si reduce atascos. laberinto

### ✅ Idea-fuerza (cierre)

- **Bullet**: mínima, rápida, desechable.
- **Tank**: administra **render, movimiento, colisiones, disparo** y (si aplica) **IA**.
- Pequeñas decisiones (límites, limpieza de balas, desvío ante muros) marcan la **sensación de juego**.
   ¡Explora parámetros y documenta tus hallazgos! 💥🛠️

🔍 **Resumen Código** **tanque.js**

```javascript
// La clase Bala. Cada vez que un tanque dispara, crea una de estas.
class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 5;
        this.size = 6;
    }

    // Mueve la bala en la dirección de su ángulo.
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
    }

    // Dibuja la bala en el canvas.
    draw(ctx) {
        ctx.fillStyle = '#343a40';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// La clase Tanque. Es la plantilla para nuestro jugador y la IA.
export class Tank {
    constructor(x, y, image, isAI = false, size = 35, imageOffset = {x:0,y:0}, imageRotation = 0) {
        this.x = x;
        this.y = y;
        this.image = image;
        // size define un cuadrado para el tanque; imageOffset permite ajustar visualmente la imagen.
        this.width = size;
        this.height = size;
    this.imageOffset = imageOffset;
    // Ajuste de rotación para alinear la orientación visual de la imagen con el ángulo lógico.
    // Por ejemplo, si la imagen apunta 'arriba' por defecto, usar imageRotation = Math.PI/2.
    this.imageRotation = imageRotation || 0;
        this.angle = 0;
        this.speed = 2;
        this.bullets = [];
        this.hits = 0;
        this.isAI = isAI; // Esta propiedad diferencia al jugador de la IA.

        // Propiedades exclusivas para la IA.
        this.aiDecisionTimer = 0; // Un contador para tomar decisiones.
        this.aiDirection = this.angle; // Dirección actual objetivo de la IA
        // Propiedades para visión y disparo inmediato
        this.aiSightRange = 400; // distancia máxima de visión
        this.aiShootCooldown = 30; // frames entre disparos cuando ve al jugador
        this.aiShootTimer = 0; // contador de cooldown
    }

    // Dibuja el tanque y sus balas.
    draw(ctx) {
        // Guardamos el estado del canvas, lo movemos y rotamos para dibujar el tanque.
        ctx.save();
    ctx.translate(this.x + this.width / 2 + (this.imageOffset.x || 0), this.y + this.height / 2 + (this.imageOffset.y || 0));
    ctx.rotate(this.angle + this.imageRotation);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore(); // Restauramos el estado del canvas para no afectar otros dibujos.

        this.bullets.forEach(bullet => bullet.draw(ctx));
    }

    // Lógica que se ejecuta en cada frame del juego.
    update(walls, playerTank) {
        if (this.isAI) {
            this.updateAI(walls, playerTank);
        }
        // Mueve las balas.
        this.bullets.forEach(bullet => bullet.update());

        // Eliminar balas que salgan del área de juego para no acumularlas.
        this.bullets = this.bullets.filter(b => b.x >= -10 && b.x <= (Tank._canvasWidth || 800) + 10 && b.y >= -10 && b.y <= (Tank._canvasHeight || 600) + 10);
        // Mantener tanque dentro de los límites si se definieron.
        if (Tank._canvasWidth && Tank._canvasHeight) {
            this.clampToBounds(Tank._canvasWidth, Tank._canvasHeight);
        }
    }

    // Evita que el tanque salga del canvas.
    clampToBounds(canvasWidth, canvasHeight) {
        // Asegurar que la posición x,y mantenga el tanque totalmente dentro del canvas.
        const minX = 0;
        const minY = 0;
        const maxX = canvasWidth - this.width;
        const maxY = canvasHeight - this.height;
        if (this.x < minX) this.x = minX;
        if (this.y < minY) this.y = minY;
        if (this.x > maxX) this.x = maxX;
        if (this.y > maxY) this.y = maxY;
    }

    // Permite configurar límites globales rápidos para la clase (usado por main.js).
    static setCanvasBounds(w, h) {
        Tank._canvasWidth = w;
        Tank._canvasHeight = h;
    }

    // Inteligencia Artificial (IA) muy simple.
    updateAI(walls, playerTank) {
        // Reducimos timers
        this.aiDecisionTimer--;
        this.aiShootTimer = Math.max(0, this.aiShootTimer - 1);

        // Primero: comprobar si vemos al jugador (línea de visión simple).
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const pCenterX = playerTank.x + playerTank.width / 2;
        const pCenterY = playerTank.y + playerTank.height / 2;
        const dxToPlayer = pCenterX - centerX;
        const dyToPlayer = pCenterY - centerY;
        const distToPlayer = Math.sqrt(dxToPlayer * dxToPlayer + dyToPlayer * dyToPlayer);

        const canSeePlayer = distToPlayer <= this.aiSightRange && this.hasLineOfSight(walls, playerTank);

        // Si puede ver al jugador, apuntar y disparar inmediatamente (si el cooldown lo permite).
        if (canSeePlayer) {
            this.aiDirection = Math.atan2(dyToPlayer, dxToPlayer);
            this.angle = this.aiDirection;
            if (this.aiShootTimer <= 0) {
                this.shoot();
                this.aiShootTimer = this.aiShootCooldown;
            }
            // Además, intentar acercarse para terminar el juego.
            this.move(this.speed, walls);
            return; // priorizamos interacción directa con el jugador
        }

        // Si no ve al jugador, tomamos decisiones aleatorias periódicas.
        if (this.aiDecisionTimer <= 0) {
            // Entre 30 y 120 frames antes de la siguiente decisión.
            this.aiDecisionTimer = 30 + Math.floor(Math.random() * 90);

            // Elegir aleatoriamente: 60% moverse en dirección aleatoria, 30% girar hacia el jugador, 10% quedarse/rotar.
            const r = Math.random();
            if (r < 0.6) {
                // Nueva dirección cardinal o diagonal.
                const angles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
                this.aiDirection = angles[Math.floor(Math.random() * angles.length)];
            } else if (r < 0.9) {
                // Apuntar al jugador para intentar disparar.
                const dx = (playerTank.x + playerTank.width / 2) - (this.x + this.width / 2);
                const dy = (playerTank.y + playerTank.height / 2) - (this.y + this.height / 2);
                this.aiDirection = Math.atan2(dy, dx);
                // Disparar con cierta probabilidad.
                if (Math.random() < 0.6) this.shoot();
            } else {
                // Quedarse quieto o girar 90 grados.
                if (Math.random() < 0.5) this.rotate90();
            }
        }

        // Intentar moverse en la dirección escogida.
        this.angle = this.aiDirection;
        this.move(this.speed, walls);
    }

    // Comprobación simple de línea de visión: muestreamos puntos a lo largo de la línea
    // y verificamos si alguno cae dentro de un muro.
    hasLineOfSight(walls, target) {
        const fromX = this.x + this.width / 2;
        const fromY = this.y + this.height / 2;
        const toX = target.x + target.width / 2;
        const toY = target.y + target.height / 2;
        const dx = toX - fromX;
        const dy = toY - fromY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.ceil(dist / 8);
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const sx = fromX + dx * t;
            const sy = fromY + dy * t;
            // si el punto está dentro de algún muro, no hay visión
            for (let w of walls) {
                if (sx >= w.x && sx <= w.x + w.width && sy >= w.y && sy <= w.y + w.height) {
                    return false;
                }
            }
        }
        return true;
    }
    
    // Mueve el tanque y comprueba si choca con un muro.
    move(speed, walls) {
        const newX = this.x + Math.cos(this.angle) * speed;
        const newY = this.y + Math.sin(this.angle) * speed;

        if (!this.checkWallCollision(newX, newY, walls)) {
            this.x = newX;
            this.y = newY;
            return true;
        }
        // Si hay colisión, intentar ajustar ligeramente la dirección para evitar quedar atascado.
        // Probamos girar un poco a la derecha o izquierda.
        const tryAngles = [this.angle + 0.5, this.angle - 0.5, this.angle + 1.0, this.angle - 1.0];
        for (let a of tryAngles) {
            const tx = this.x + Math.cos(a) * speed;
            const ty = this.y + Math.sin(a) * speed;
            if (!this.checkWallCollision(tx, ty, walls)) {
                this.x = tx;
                this.y = ty;
                this.angle = a;
                return true;
            }
        }
        // Si no se pudo mover hacia adelante, intentamos retroceder un poco para evitar quedar atascado.
        const backSpeed = -Math.sign(speed) * Math.abs(speed) * 0.5; // retroceder la mitad de la velocidad
        const bx = this.x + Math.cos(this.angle) * backSpeed;
        const by = this.y + Math.sin(this.angle) * backSpeed;
        if (!this.checkWallCollision(bx, by, walls)) {
            this.x = bx;
            this.y = by;
            return true;
        }
        return false;
    }

    // Empujar hacia atrás en base a profundidad de solapamiento o vector dado.
    // Si se pasa (dx, dy) se mueve en sentido opuesto para separar.
    pushBack(dx, dy, walls) {
        // dx, dy representan cuánto se solapan (o vector entre centros). Movemos en dirección opuesta.
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = dx / distance;
        const ny = dy / distance;
        // Mover una pequeña cantidad para separar
        const sep = Math.max(4, Math.min(20, Math.ceil(distance)));
        const newX = this.x - nx * sep;
        const newY = this.y - ny * sep;
        if (!this.checkWallCollision(newX, newY, walls)) {
            this.x = newX;
            this.y = newY;
            return true;
        }
        // Si no puede moverse en esa dirección, intenta moverse en la dirección opuesta ligera.
        const altX = this.x + nx * sep;
        const altY = this.y + ny * sep;
        if (!this.checkWallCollision(altX, altY, walls)) {
            this.x = altX;
            this.y = altY;
            return true;
        }
        return false;
    }

    // Crea una nueva bala.
    shoot() {
        if (this.bullets.length < 3) { // Limita a 3 balas en pantalla a la vez.
            // Colocar la bala en la punta del cañón (delante del tanque).
            const muzzleOffset = Math.max(this.width, this.height) / 2 + 4;
            const bx = this.x + this.width / 2 + Math.cos(this.angle) * muzzleOffset;
            const by = this.y + this.height / 2 + Math.sin(this.angle) * muzzleOffset;
            this.bullets.push(new Bullet(bx, by, this.angle));
        }
    }

    // Gira 90 grados aleatoriamente a la derecha o izquierda.
    rotate90() {
        const dir = Math.random() < 0.5 ? 1 : -1;
        this.angle += dir * (Math.PI / 2);
        // Normalizar ángulo entre -PI y PI
        if (this.angle > Math.PI) this.angle -= 2 * Math.PI;
        if (this.angle < -Math.PI) this.angle += 2 * Math.PI;
    }

    // Revisa si el tanque en la posición (x, y) está chocando con algún muro.
    checkWallCollision(x, y, walls) {
        const hitBox = { x, y, width: this.width, height: this.height };
        return walls.some(wall =>
            hitBox.x < wall.x + wall.width &&
            hitBox.x + hitBox.width > wall.x &&
            hitBox.y < wall.y + wall.height &&
            hitBox.y + hitBox.height > wall.y
        );
    }
}
```



🔍 **Resumen Código** **laberinto.js**



```js
// La clase Wall (Muro) es simple, solo guarda su posición y tamaño.
class Wall {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * Genera un laberinto aleatorio y devuelve una lista de objetos "Wall".
 * Utiliza un algoritmo simple que añade muros aleatorios.
 * @param {number} width - Ancho del canvas.
 * @param {number} height - Alto del canvas.
 * @param {number} cellSize - Tamaño de cada celda del laberinto.
 * @returns {Wall[]} - Una lista con todos los muros del laberinto.
 */
export function generateMaze(width, height, cellSize) {
    // Mantener compatibilidad: si se llama sin imagen, generamos muros aleatorios.
    const walls = [];
    const numWalls = 70; // Aumenta este número para laberintos más densos.

    for (let i = 0; i < numWalls; i++) {
        // Elige una posición aleatoria en la grilla del canvas.
        const x = Math.floor(Math.random() * (width / cellSize)) * cellSize;
        const y = Math.floor(Math.random() * (height / cellSize)) * cellSize;
        walls.push(new Wall(x, y, cellSize, cellSize));
    }
    return walls;
}

/**
 * Carga una imagen de mapa, la dibuja en un canvas temporal y genera muros
 * a partir de los píxeles oscuros (o no transparentes) de la imagen.
 *
 * Convención: la imagen de mapa debe estar compuesta por píxeles claros para
 * espacio libre y píxeles oscuros (negro) para paredes. La imagen se ajusta a
 * la resolución del canvas en celdas (width/cellSize, height/cellSize).
 *
 * @param {string} imagePath - Ruta relativa a la imagen (p.ej. 'assets/m1.png')
 * @param {number} width - Ancho del canvas en px.
 * @param {number} height - Alto del canvas en px.
 * @param {number} cellSize - Tamaño de cada celda en px.
 * @returns {Promise<Wall[]>} - Promise que resuelve con la lista de muros.
 */
export async function generateMazeFromImage(imagePath, width, height, cellSize, tankSize = null) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            try {
                // Crear canvas temporal con tamaño igual al canvas del juego.
                // Dibujamos la imagen escalada al tamaño del canvas y luego muestreamos
                // el píxel central de cada celda para decidir si es pared.
                const cols = Math.floor(width / cellSize);
                const rows = Math.floor(height / cellSize);
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = width; // escala a tamaño del canvas real
                tempCanvas.height = height;
                const tctx = tempCanvas.getContext('2d');
                // Desactivar suavizado para preservar píxeles nítidos al escalar
                if (tctx.imageSmoothingEnabled !== undefined) tctx.imageSmoothingEnabled = false;

                // Dibujar la imagen escalada al tamaño del canvas de juego.
                tctx.drawImage(img, 0, 0, width, height);

                // --- Añadir dos letras centradas en la pantalla ---
                // Las letras se dibujan en negro (pared) encima de la plantilla. Aseguramos
                // un margen de celdas para que no toquen el borde y separacion entre letras.
                (function drawCenterLetters() {
                    const randLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    let letterA = randLetter();
                    let letterB = randLetter();
                    // evitar la misma letra doble
                    while (letterB === letterA) letterB = randLetter();

                    const marginCells = 2; // celdas de margen alrededor
                    const marginPx = marginCells * cellSize;

                    const availableWidth = Math.max(0, width - marginPx * 2);
                    const availableHeight = Math.max(0, height - marginPx * 2);
                    // cada letra ocupa la mitad del ancho disponible, con un pequeño espaciado de una celda
                    const letterAreaWidth = (availableWidth - cellSize) / 2;

                    // elegir tamaño de fuente que quepa en area (iterativo por si es necesario reducir)
                    let fontSize = Math.floor(Math.min(letterAreaWidth, availableHeight) * 0.9);
                    if (fontSize < 8) fontSize = 8;
                    tctx.fillStyle = 'black';
                    tctx.textBaseline = 'middle';
                    tctx.textAlign = 'center';

                    // ajustar font para que ancho del glyph quepa en letterAreaWidth
                    while (fontSize > 8) {
                        tctx.font = `${fontSize}px sans-serif`;
                        const mw = Math.max(tctx.measureText(letterA).width, tctx.measureText(letterB).width);
                        if (mw <= letterAreaWidth) break;
                        fontSize = Math.floor(fontSize * 0.9);
                    }

                    // posiciones centrales de cada letra
                    const centerY = Math.floor(height / 2);
                    const leftCenterX = Math.floor(marginPx + letterAreaWidth / 2);
                    const rightCenterX = Math.floor(marginPx + letterAreaWidth + cellSize + letterAreaWidth / 2);

                    // Dibujar letras con mayor grosor para que sean muros sólidos.
                    tctx.font = `${fontSize}px sans-serif`;
                    // Primero dibujamos un trazo (stroke) grueso y luego rellenamos.
                    const strokeWidth = Math.max(2, Math.floor(fontSize / 8));
                    tctx.lineWidth = strokeWidth;
                    tctx.strokeStyle = 'black';
                    tctx.fillStyle = 'black';
                    // Hacemos varias pasadas de stroke/ fill para engrosar trazos finos.
                    for (let dx of [-1, 0, 1]) {
                        for (let dy of [-1, 0, 1]) {
                            tctx.strokeText(letterA, leftCenterX + dx, centerY + dy);
                            tctx.strokeText(letterB, rightCenterX + dx, centerY + dy);
                        }
                    }
                    tctx.fillText(letterA, leftCenterX, centerY);
                    tctx.fillText(letterB, rightCenterX, centerY);
                })();

                // Primero muestreamos todas las celdas y calculamos su luminancia.
                // Esto nos permite detectar si la imagen está "invertida" (p.ej. fondo negro
                // con rutas claras) y corregir automáticamente.
                const luminanceThreshold = 128; // debajo de esto consideramos "oscuro"
                const invertIfMoreThan = 0.55; // si >55% de celdas son oscuras, invertimos

                const cellFlags = new Array(rows * cols); // true = oscuro (posible muro)
                let darkCount = 0;
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const sx = Math.floor(col * cellSize + cellSize / 2);
                        const sy = Math.floor(row * cellSize + cellSize / 2);
                        const cx = Math.min(Math.max(0, sx), width - 1);
                        const cy = Math.min(Math.max(0, sy), height - 1);
                        const pixel = tctx.getImageData(cx, cy, 1, 1).data;
                        const r = pixel[0], g = pixel[1], b = pixel[2], a = pixel[3];
                        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
                        const isDark = (a > 10 && luminance < luminanceThreshold);
                        cellFlags[row * cols + col] = isDark;
                        if (isDark) darkCount++;
                    }
                }

                // Si la mayoría de la imagen es oscura, probablemente la imagen esté invertida
                // (p. ej. fondo oscuro con caminos claros). En ese caso invertimos la lógica.
                const total = rows * cols;
                const useInverted = (darkCount / total) > invertIfMoreThan;

                // Construir cuadrícula booleana de muros: true = muro
                const grid = new Array(rows);
                for (let r = 0; r < rows; r++) {
                    grid[r] = new Array(cols);
                    for (let c = 0; c < cols; c++) {
                        const isDark = cellFlags[r * cols + c];
                        grid[r][c] = useInverted ? !isDark : isDark;
                    }
                }

                // Asegurar zonas de spawn libres para los tanques.
                // Calculamos el área de spawn en celdas según tankSize (si se proporcionó),
                // de modo que el tanque pueda caber sin tocar muros.
                let spawnSize = 2; // número de celdas por defecto
                if (tankSize && cellSize) {
                    spawnSize = Math.ceil(tankSize / cellSize) + 1; // dejar 1 celda extra de margen
                }
                function clearSpawnAt(rowStart, colStart) {
                    for (let r = rowStart; r < Math.min(rows, rowStart + spawnSize); r++) {
                        for (let c = colStart; c < Math.min(cols, colStart + spawnSize); c++) {
                            grid[r][c] = false;
                        }
                    }
                }
                // Player: top-left
                clearSpawnAt(0, 0);
                // AI: bottom-right
                clearSpawnAt(rows - spawnSize, cols - spawnSize);

                // Ahora comprimimos la cuadrícula de muros en rectángulos.
                // Paso 1: convertir runs horizontales por fila en rects temporales.
                const tempRects = []; // {r, c, w, h} en celdas
                for (let r = 0; r < rows; r++) {
                    let c = 0;
                    while (c < cols) {
                        if (!grid[r][c]) { c++; continue; }
                        // inicio de run
                        let startC = c;
                        while (c < cols && grid[r][c]) c++;
                        const runWidth = c - startC;
                        tempRects.push({ r, c: startC, w: runWidth, h: 1 });
                    }
                }

                // Paso 2: combinar rects verticalmente si tienen misma c y w y están contiguos en r.
                const merged = [];
                const used = new Array(tempRects.length).fill(false);
                for (let i = 0; i < tempRects.length; i++) {
                    if (used[i]) continue;
                    let base = tempRects[i];
                    let height = base.h;
                    used[i] = true;
                    for (let j = i + 1; j < tempRects.length; j++) {
                        if (used[j]) continue;
                        const t = tempRects[j];
                        if (t.c === base.c && t.w === base.w && t.r === base.r + height) {
                            // contiguo verticalmente
                            height += t.h;
                            used[j] = true;
                        }
                    }
                    merged.push({ r: base.r, c: base.c, w: base.w, h: height });
                }

                // Convertir a objetos Wall en coordenadas en px
                const walls = merged.map(rect => new Wall(rect.c * cellSize, rect.r * cellSize, rect.w * cellSize, rect.h * cellSize));

                resolve(walls);
            } catch (err) {
                reject(err);
            }
        };
        img.onerror = (e) => reject(new Error('No se pudo cargar la imagen: ' + imagePath));
    });
}

/**
 * Encuentra una posición vacía aleatoria para colocar un tanque.
 * @param {Wall[]} walls - La lista de muros existentes.
 * @param {number} canvasWidth - Ancho del canvas.
 * @param {number} canvasHeight - Alto del canvas.
 * @param {number} cellSize - Tamaño de cada celda.
 * @returns {{x: number, y: number}} - Las coordenadas de una posición vacía.
 */
export function getRandomEmptyPosition(walls, canvasWidth, canvasHeight, cellSize, tankWidth = cellSize, tankHeight = cellSize) {
    let pos;
    let isOccupied = true;

    function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
        return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    // Repite hasta encontrar una celda que no esté ocupada por un muro (tomando el tamaño del tanque en cuenta).
    const cols = Math.floor(canvasWidth / cellSize);
    const rows = Math.floor(canvasHeight / cellSize);
    const maxTries = 2000;
    let tries = 0;
    while (isOccupied && tries < maxTries) {
        const cellX = Math.floor(Math.random() * cols);
        const cellY = Math.floor(Math.random() * rows);
        pos = {
            x: cellX * cellSize,
            y: cellY * cellSize,
        };
        // Comprobar si el rectángulo del tanque en esa posición colisiona con algún muro.
        isOccupied = walls.some(wall => rectsOverlap(pos.x, pos.y, tankWidth, tankHeight, wall.x, wall.y, wall.width, wall.height));
        tries++;
    }
    // Si no encontramos posición tras muchos intentos, devolvemos (0,0) como fallback.
    if (!pos) return { x: 0, y: 0 };
    return pos;
}
```





