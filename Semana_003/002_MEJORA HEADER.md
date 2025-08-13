# 💡MEJORA HEADER

## 🧩 Ejemplo 1: **Header con tabla HTML (estructura clásica)**

> Ideal para aprender la estructura tipo filas y columnas 📊. Se recomienda solo para maquetación educativa o casos muy simples.

### ✅ Código HTML:

```html
<header>
  <table style="width: 100%; background-color: #f25c05; color: white;">
    <tr>
      <td style="padding: 10px;">📧 info@example.com</td>
      <td style="padding: 10px; text-align: center;">🕒 Lunes a Viernes: 8 am - 6 pm</td>
      <td style="padding: 10px; text-align: right;">📞 (012) 345-67-89</td>
    </tr>
  </table>
</header>
```

### 💡 UX Comentarios:

- Fácil de entender para principiantes.
- No es responsivo automáticamente (debes usar media queries).
- ✅ Bueno para mails y mensajes simples.

## 🧩 Ejemplo 2: **Header con Flexbox y diseño moderno**

> Muy usado hoy en día por su **adaptabilidad y control total del espacio**. Perfecto para mobile-first 🧠📱.

### ✅ Código HTML:

```html
<header class="header-flex">
  <div class="item">📧 info@example.com</div>
  <div class="item">🕒 Lun-Vie: 8 am - 6 pm</div>
  <div class="item">📞 (012) 345-67-89</div>
</header>
```

### ✅ CSS:

```css
.header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1b1f3b;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  flex-wrap: wrap;
}

.header-flex .item {
  margin: 5px;
}
```

### 💡 UX Comentarios:

- Se adapta automáticamente a diferentes pantallas ✅
- Espaciado y alineación controlables
- Ideal para **componentes tipo barra superior o navbar secundaria**

## 🧩 Ejemplo 3: **Header con CSS Grid tipo banner publicitario**

> Diseñado para distribuir contenido visualmente llamativo (como íconos + CTA). Excelente para segmentar múltiples bloques de info. 🔳

### ✅ HTML:

```html
<header class="header-grid">
  <div class="logo">🔧 HANDSYMAN</div>
  <div class="info">📧 info@example.com<br>🕒 8 am - 6 pm</div>
  <div class="cta">📞 (012) 345-67-89<br><button>Contáctanos</button></div>
</header>
```

### ✅ CSS:

```css
.header-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  background-color: #fec52e;
  padding: 15px;
  gap: 10px;
  align-items: center;
  color: #1b1f3b;
  font-weight: bold;
}

.header-grid button {
  background-color: #1b1f3b;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  margin-top: 5px;
}
```

### 💡 UX Comentarios:

- Permite contenido combinado (texto + botón + íconos).
- Muy visual y jerárquico.
- ✅ Excelente para **header informativo + acción rápida.**