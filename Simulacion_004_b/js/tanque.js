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