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