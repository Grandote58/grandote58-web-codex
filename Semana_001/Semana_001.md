![Mesa de trabajo 1HtmlTypota](E:/Grandote58/GR58_Facebook/2x/Mesa%20de%20trabajo%201HtmlTypota.png)

# 📅 Semana 1: **🧱 "¡Construyendo los Cimientos del Web!"**

### 🎯 **Objetivos de la semana**

1. **Comprender y aplicar la estructura semántica de una página web** utilizando etiquetas HTML5 modernas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).

   

2. **Iniciar proyectos web organizados en Visual Studio Code**, aplicando buenas prácticas en la creación de archivos y carpetas.

### ✅ **Metas de aprendizaje**

Al finalizar la semana, el estudiante podrá:

- Redactar y estructurar correctamente un documento HTML5 semántico funcional.
- Identificar y aplicar el propósito de cada sección del sitio web.
- Usar Visual Studio Code como entorno de desarrollo con configuración mínima efectiva.
- Organizar archivos y carpetas de su proyecto de forma profesional y escalable. 📂✨

### **✅ Caja de Herramientas: Visual Studio Code 🔧**

**Visual Studio Code (VS Code)** será nuestro taller de construcción. Es un editor de código gratuito, ligero y muy potente.

- **Instalación:** Descárgalo desde [code.visualstudio.com](https://code.visualstudio.com/) e instálalo.
- **Configuración Inicial:**
  - **Auto Guardado:** Ve a `Archivo > Auto Guardado` para que no pierdas ningún cambio.
  - **Extensiones recomendadas (¡Instálalas!):** Haz clic en el ícono de bloques 🧩 en la barra lateral izquierda y busca:
    - `Live Server:` Te permite abrir tu página en un servidor local que se actualiza automáticamente cada vez que guardas. ¡Magia pura!
    - `Prettier - Code formatter:` Mantiene tu código ordenado y legible de forma automática.
    - `Material Icon Theme:` Asigna iconos bonitos a tus carpetas y archivos, facilitando la navegación visual.

## 🧠 **Contenido estructurado paso a paso**

#### **1️⃣ ¿Qué es HTML5 y por qué usarlo?**

- HTML (HyperText Markup Language) es el lenguaje que estructura la información de una página web.
- HTML5 introduce etiquetas **semánticas** que **dan significado al contenido**, facilitando el SEO, la accesibilidad y el mantenimiento del código. 🧩

#### **2️⃣ Estructura básica de un documento HTML5**

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mi Primera Página</title>
  </head>
  <body>
    <!-- Aquí va el contenido visible -->
  </body>
</html>
```

#### **3️⃣ Etiquetas semánticas principales y sus funciones 📚**

| Etiqueta    | Propósito                                                    |
| ----------- | ------------------------------------------------------------ |
| `<header>`  | Cabecera del sitio: nombre, logo, navegación principal       |
| `<nav>`     | Menú de navegación                                           |
| `<main>`    | Contenido principal único de la página                       |
| `<section>` | Bloque temático dentro de `<main>`                           |
| `<article>` | Contenido independiente y reutilizable (ej: un post, una noticia) |
| `<aside>`   | Contenido adicional o complementario (ej: barra lateral)     |
| `<footer>`  | Pie de página con datos de contacto, créditos, enlaces legales, etc. |

Ahora, crea el archivo `index.html`. Dentro, escribiremos el esqueleto semántico. Cada etiqueta tiene un propósito claro:

HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Primera Página Web</title>
</head>
<body>

    <header>
        </header>

    <nav>
        </nav>

    <main>
        <section>
            <article>
                </article>
        </section>

        <aside>
            </aside>
    </main>

    <footer>
        </footer>

</body>
</html>
```

🔍 ¡Estas etiquetas ayudan a los buscadores y lectores de pantalla a entender la estructura del contenido!

#### **4️⃣ Estructura de carpetas del proyecto en Visual Studio Code 💻**

```text
/semana01-html
├── index.html
└── /assets
    └── /img        ← Aquí pondremos las imágenes más adelante
```

📌 Consejo: Mantén una estructura **ordenada y predecible** desde el principio.

#### **5️⃣ Configuración inicial de Visual Studio Code ⚙️**

**Extensiones recomendadas:**

✅ *Live Server* – Visualiza tu página en tiempo real

✅ *Prettier* – Formatea tu código automáticamente

✅ *HTML Snippets* – Atajos para escribir etiquetas más rápido



**Atajos útiles:**

- `! + Tab` → Genera la estructura básica de HTML5
- `Ctrl + S` → Guarda tu documento (¡hazlo seguido!)
- `Alt + Shift + F` → Formatea el código (si tienes Prettier)

## 💡 Ejemplos prácticos

### 🧪 **Ejercicio 1: "Crea tu primer CV Web"** 👤💼

**🎯 Propósito:** Aplicar etiquetas semánticas para estructurar una página con información personal básica.

#### ✏️ Instrucciones paso a paso:

1. Abre Visual Studio Code y crea una carpeta llamada `semana01`.
2. Dentro, crea un archivo `index.html`.
3. Usa `! + Tab` para generar la estructura base.
4. Rellena con las siguientes secciones:

```html
<body>
  <header>
    <h1>Laura Ramírez</h1>
    <p>Diseñadora UX | Frontend Developer</p>
  </header>

  <nav>
    <ul>
      <li><a href="#">Inicio</a></li>
      <li><a href="#">Portafolio</a></li>
      <li><a href="#">Contacto</a></li>
    </ul>
  </nav>

  <main>
    <section>
      <h2>Sobre mí</h2>
      <p>Soy una desarrolladora web apasionada por la experiencia de usuario...</p>
    </section>

    <section>
      <h2>Habilidades</h2>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>📧 laura.ramirez@mail.com | 📞 +123 456 789</p>
  </footer>
</body>
```

#### ✅ Resultado esperado:

Una página básica con estructura clara, navegación y presentación personal.

### 🧪 **Ejercicio 2: "Página de Bienvenida a tu Portafolio"** 👋🌐

**🎯 Propósito:** Reforzar el uso de las etiquetas `<aside>`, `<article>` y la estructura semántica general.

#### ✏️ Instrucciones paso a paso:

1. En la misma carpeta, crea un nuevo archivo llamado `portafolio.html`.
2. Construye la siguiente estructura semántica:

```html
<body>
  <header>
    <h1>Bienvenid@ a mi Portafolio</h1>
  </header>

  <nav>
    <a href="index.html">Inicio</a> |
    <a href="#">Proyectos</a> |
    <a href="#">Sobre mí</a>
  </nav>

  <main>
    <article>
      <h2>Proyecto Destacado</h2>
      <p>Mi último trabajo fue una app de tareas hecha con JavaScript puro.</p>
    </article>

    <aside>
      <h3>¿Sabías qué? 🤓</h3>
      <p>El uso de HTML semántico mejora la accesibilidad web en un 80%.</p>
    </aside>
  </main>

  <footer>
    <p>© 2025 Laura Ramírez. Todos los derechos reservados.</p>
  </footer>
</body>
```

#### ✅ Resultado esperado:

Una página organizada con artículo principal y contenido adicional en `<aside>`.

### ✅ **Resumen visual de la semana**

📌 **Etiquetas aprendidas:** `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`

 🛠️ **Herramientas usadas:** Visual Studio Code, Live Server

 📁 **Carpetas creadas:** `index.html`, `assets/img`

 🎯 **Competencias desarrolladas:** Maquetación básica, estructura semántica, orden de trabajo profesional



![Recurso 1PiePagina](./assets/Recurso%201PiePagina.png)
