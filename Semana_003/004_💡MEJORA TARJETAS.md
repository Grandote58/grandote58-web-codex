
![Portada](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_002/assets/Mesa%20de%20trabajo%201HtmlTypota.png)


# 💡MEJORA TARJETAS

## 1. 🧲 **Tarjeta con efecto Hover "Flipping Card" (Volteo 3D)**

> Ideal para mostrar más información al pasar el cursor sin ocupar más espacio.

### 🔧 Código HTML:

```html
<div class="tarjeta-volteo">
  <div class="tarjeta-inner">
    <div class="tarjeta-frente">
      <h4>🔧 Reparación Express</h4>
      <p>Soluciones rápidas para tu hogar.</p>
    </div>
    <div class="tarjeta-dorso">
      <p>Garantía, agilidad y soporte personalizado.</p>
      <a href="#" class="btn btn-warning">Ver más</a>
    </div>
  </div>
</div>
```

### 🎨 CSS:

```css
.tarjeta-volteo {
  perspective: 1000px;
  width: 300px;
  height: 200px;
  margin: 20px auto;
}

.tarjeta-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.tarjeta-volteo:hover .tarjeta-inner {
  transform: rotateY(180deg);
}

.tarjeta-frente, .tarjeta-dorso {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
}

.tarjeta-frente {
  background-color: #f9f9f9;
}

.tarjeta-dorso {
  background-color: #fec52e;
  color: #1b1f3b;
  transform: rotateY(180deg);
}
```

## 2. 🪞 **Tarjeta con imagen tipo "Glassmorphism"**

> Tarjeta moderna con efecto de vidrio difuminado, ideal para destacar sobre fondos con fotos o videos.

### 🔧 HTML:

```html
<div class="tarjeta-glass">
  <img src="tools.png" alt="Herramientas">
  <div class="contenido">
    <h5>Instalaciones Eléctricas</h5>
    <p>Trabajos seguros y certificados.</p>
    <a href="#" class="btn btn-light">Solicitar</a>
  </div>
</div>
```

### 🎨 CSS:

```css
.tarjeta-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  padding: 20px;
  width: 300px;
  margin: 20px auto;
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.tarjeta-glass img {
  width: 50px;
  margin-bottom: 10px;
}
```

## 3. 🎨 **Tarjeta animada con entrada desde los lados**

> Tarjeta que **entra con animación** al hacer scroll o al cargar la página.

### 🔧 HTML:

```html
<div class="tarjeta-deslizante">
  <h3>🧼 Limpieza Profesional</h3>
  <p>Ambientes limpios y seguros garantizados.</p>
  <a href="#" class="btn btn-outline-light">Agendar ahora</a>
</div>
```

### 🎨 CSS:

```css
.tarjeta-deslizante {
  background-color: #278ce7;
  color: white;
  padding: 20px;
  width: 280px;
  border-radius: 10px;
  transform: translateX(-100%);
  animation: entrar 1.2s ease-out forwards;
  opacity: 0;
}

@keyframes entrar {
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

## 4. 🧱 **Tarjeta con Grid y botón flotante**

> Excelente para organizar iconos, títulos y botones en una **estructura clara y adaptable**, ideal para dashboards o listados.

### 🔧 HTML:

```html
<div class="tarjeta-grid">
  <div class="icono">🛠️</div>
  <div class="texto">
    <h5>Mantenimiento General</h5>
    <p>Revisión completa de tu inmueble.</p>
  </div>
  <div class="accion">
    <a href="#" class="btn btn-sm btn-dark">Ver más</a>
  </div>
</div>
```

### 🎨 CSS:

```css
.tarjeta-grid {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  align-items: center;
  gap: 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  max-width: 400px;
  margin: 15px auto;
}

.tarjeta-grid .icono {
  font-size: 32px;
}

.tarjeta-grid .texto h5 {
  margin: 0;
}

.tarjeta-grid .accion {
  text-align: right;
}
```

## 🧠 ¿Cómo usarlas?

| Tipo de Tarjeta    | Ideal para...                                | Requiere JS |
| ------------------ | -------------------------------------------- | ----------- |
| Volteo 3D          | Mostrar detalles ocultos                     | No          |
| Glassmorphism      | Fondos con video o imágenes                  | No          |
| Deslizante animada | Interacción con scroll o entradas llamativas | No          |
| Grid estructurada  | Listas de servicios o categorías ordenadas   | No          |


![Pie](https://github.com/Grandote58/grandote58-web-codex/blob/main/Semana_002/assets/Recurso%201PiePagina.png)
