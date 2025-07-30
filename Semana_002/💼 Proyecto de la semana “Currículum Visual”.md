# 💼 **Proyecto de la semana: “Currículum Visual”**

### 🎨 **Nombre del proyecto:**

**“Currículum Visual” – Tu primera identidad profesional en la web**

### 🎯 **Objetivos del proyecto:**

1. Aplicar los fundamentos de CSS para diseñar una página web estilizada y semánticamente organizada.
2. Desarrollar un currículum profesional responsivo utilizando HTML5 y propiedades clave del Box Model.

### 📈 **Metas de aprendizaje:**

Al finalizar este proyecto, el estudiante será capaz de:

- Construir una estructura HTML5 semántica para presentar información personal y profesional.
- Aplicar selectores, propiedades de estilo, colores, unidades y márgenes para mejorar la presentación.
- Comprender cómo el **modelo de caja (Box Model)** influye en el diseño y distribución de contenido.
- Utilizar Visual Studio Code para escribir, organizar y visualizar su código.

### 🧱 **Estructura del proyecto paso a paso:**

#### 1️⃣ **Diseña la estructura semántica**

Crea un archivo `index.html` y organiza el contenido utilizando etiquetas como:

```html
<header></header>
<nav></nav>
<main>
  <section></section>
  <article></article>
</main>
<footer></footer>
```

💡 *Usa comentarios en HTML para identificar secciones del currículum: Datos personales, Formación, Experiencia, Habilidades, Contacto.*

#### 2️⃣ **Agrega contenido profesional**

Dentro de tu estructura HTML, incluye:

- Tu nombre completo y profesión.
- Foto de perfil (puede ser una imagen de ejemplo).
- Breve resumen personal.
- Formación académica.
- Experiencia laboral (real o simulada).
- Habilidades técnicas y blandas.
- Enlaces a redes o portafolio (pueden ser ficticios).

#### 3️⃣ **Aplica estilos con CSS**

Crea un archivo `style.css` y enlázalo desde el HTML.

Utiliza:

- **Selectores por etiqueta y clase**
- Propiedades como `color`, `font-family`, `background-color`
- **Box Model:** `margin`, `padding`, `border`, `width`, `height`
- Unidades como `px`, `em`, `%`

```css
body {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
}

.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}
```

#### 4️⃣ **Maqueta con Box Model**

Usa `div`, `section` o `article` con clases como `.card`, `.bloque`, `.perfil`, y personalízalos con:

- Bordes decorativos
- Separaciones armónicas
- Colores bien combinados (usa paletas suaves o del branding de Grandote58)

#### 5️⃣ **Versión básica responsiva**

Agrega esta línea al `<head>` para adaptarlo a móviles:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Y utiliza `max-width`, `media queries`, o unidades `%` para que se vea bien en pantallas pequeñas.

#### 6️⃣ **Previsualiza y ajusta**

Usa Visual Studio Code y su extensión Live Server para ver cambios en tiempo real. Ajusta márgenes, paddings, alineaciones y colores.

### 🧪 **Entrega final esperada:**

Un archivo comprimido `.zip` que contenga:

- `index.html`
- `style.css`
- Carpeta `img/` con foto de perfil (puede ser de ejemplo)

### 🎓 **Criterios de evaluación:**

| Criterio                         | Puntaje     |
| -------------------------------- | ----------- |
| Estructura semántica clara       | 20 pts      |
| Contenido profesional completo   | 20 pts      |
| Aplicación del Box Model         | 20 pts      |
| Estilo visual coherente y limpio | 20 pts      |
| Responsividad básica funcional   | 20 pts      |
| **Total**                        | **100 pts** |