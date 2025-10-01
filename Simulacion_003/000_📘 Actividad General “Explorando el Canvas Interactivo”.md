# 📘 Actividad General: **“Explorando el Canvas Interactivo”**

Esta actividad agrupa las tres prácticas previas:

- **Actividad: Lienzo mágico con fondo personalizado**
- **Práctica e-learning: Lienzo + Cuadrados Personalizables**
- **Práctica e-learning: Runner & Jumper: crea, anima y salta**

El propósito es que los estudiantes trabajen **en parejas** para integrar conceptos de **DOM dinámico, Canvas y animaciones en JavaScript** con un enfoque de autoaprendizaje y experimentación colaborativa.

## 🎯 Objetivos de la actividad

1. Desarrollar habilidades en la creación y personalización de `<canvas>` en proyectos web.
2. Aplicar conceptos de **dibujo dinámico**, **interacción con controles** y **animación** con JavaScript.
3. Implementar **mejoras opcionales** en el código, como estelas o saltos con teclado, fomentando la creatividad.
4. Fomentar el trabajo en equipo y la documentación clara del proceso.

## 👥 Modalidad de trabajo

- **Equipo:** 2 personas.
- **Dinámica:**
  - **Estudiante A** se encarga de la estructura (`index.html`) y estilos (`styles.css`).
  - **Estudiante B** se encarga de la lógica en `app.js` y pruebas de funcionalidad.
  - Ambos deben **documentar** y **explicar** el código en comentarios y en un breve reporte.

## 📝 Paso a paso de la actividad

1. **Revisión inicial (10 min):**
   - Lean las tres prácticas y comprendan sus objetivos.
   - Asignen los roles de Estudiante A y Estudiante B.
2. **Construcción del proyecto (60–70 min):**
   - Implementen primero la **Actividad: Lienzo mágico con fondo personalizado**.
   - Agreguen la **Práctica: Lienzo + Cuadrados Personalizables** (control de color, tamaño, posición).
   - Integren la **Práctica: Runner & Jumper** con animación lateral y salto con tecla “X”.
3. **Documentación (20 min):**
   - Expliquen en comentarios del código **qué hace cada función**.
   - Redacten un documento breve (máx. 1 página) describiendo:
     - Objetivo de la práctica.
     - Retos enfrentados.
     - Qué aprendieron trabajando en equipo.
4. **Entrega (online):**
   - Suban una carpeta comprimida `.zip` con los tres archivos (`index.html`, `styles.css`, `app.js`).
   - Adjuntar el documento en PDF con la reflexión.

## 📤 Forma de entrega

- **Formato:** Carpeta `.zip` + Documento PDF.
- **Canal:** Plataforma LMS de la institución.
- **Fecha límite:** Según calendario del curso.

## 📊 Rúbrica de evaluación

| Criterio                       | Excelente (5)                                                | Bueno (4)                                        | Aceptable (3)                                  | Insuficiente (1-2)                    |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------ | ---------------------------------------------- | ------------------------------------- |
| **Funcionamiento del código**  | Todas las prácticas integradas funcionan sin errores (crear, personalizar, animar y saltar). | Funciona en general, con pequeños errores.       | Funciona parcialmente (falta alguna práctica). | No funciona o no ejecuta.             |
| **Creatividad en mejoras**     | Implementa mejoras adicionales (estela, saltos dobles, obstáculos) de forma clara y comentada. | Implementa al menos una mejora extra.            | Intenta mejora pero incompleta.                | No hay mejoras.                       |
| **Documentación en el código** | Comentarios claros y pedagógicos en todas las funciones.     | Comentarios en la mayoría de funciones.          | Comentarios básicos en partes del código.      | No hay documentación o es muy escasa. |
| **Trabajo en equipo**          | Evidencia roles claros y colaboración (HTML/CSS y JS documentados por cada integrante). | Buena colaboración con detalles menores.         | Alguna evidencia de desequilibrio.             | No se evidencia trabajo en equipo.    |
| **Entrega y presentación**     | Entrega completa (código + PDF reflexivo) bien organizada.   | Entrega completa con mínimos errores de formato. | Entrega incompleta o desordenada.              | Entrega fuera de tiempo o faltante.   |

## ❓ Preguntas de autoevaluación

1. ¿Por qué es importante limpiar el canvas con `clearRect` antes de redibujar?
2. ¿Qué ventaja ofrece `requestAnimationFrame` sobre `setInterval`?
3. ¿Cómo garantizamos que el cuadrado no se salga del área de dibujo?

## 💡 Actividad práctica de mejora

👉 **Salto con tecla “X”**:

- Implementen una función `onKeyDownJumpX(e)` que escuche `keydown`.
- Si la tecla presionada es “X” y el cuadrado está en el suelo, aplicará un **impulso hacia arriba** y luego caerá por la **gravedad**.
- Esta función debe colocarse **debajo de los demás listeners** en `app.js`.

**Tip:** Usen variables `vy` (velocidad vertical), `GRAVITY`, y un booleano `grounded` para controlar el salto.

📌 **Resultado esperado:**

Cada equipo tendrá un proyecto funcional y documentado que muestra la evolución del uso de canvas: desde la creación básica, pasando por personalización, hasta animaciones y mejoras interactivas.

