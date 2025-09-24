

![Recurso 2foto001](https://github.com/Grandote58/grandote58-web-codex/blob/main/Simulacion_002/assets/Recurso%202foto001.png)

# **🧰 “¡Sube ese peso!”**

## Simulación interactiva de polea (HTML5 + Bootstrap + CSS + JS)


 **Tema:** ¿Cuánta fuerza necesitas para levantar un objeto con una **polea fija**?

## 🎯 Objetivos de aprendizaje

1. **Comprender** qué hace una polea fija (cambia la dirección de la fuerza, **no** reduce la fuerza ideal).

2. **Calcular** la fuerza necesaria para levantar un objeto:
   $$
   F ≈ m * g
   $$
    (y cómo crece por rozamiento).

3. **Construir** una mini-simulación web paso a paso (HTML, CSS y JavaScript).

4. **Experimentar** variando masa y rozamiento para observar cómo cambia la fuerza y el movimiento.

   

> [!IMPORTANT]
>
> #### **Meta final:**
>
> Al terminar, tendrás una **página web interactiva** que muestra una polea, un peso y controles para **probar fuerzas** y ver si el objeto sube o no.


![image-20250923172903702](https://github.com/Grandote58/grandote58-web-codex/blob/main/Simulacion_002/assets/image-20250923172903702.png)


## 🧪 Concepto físico, fácil

Usaremos una **polea fija**. Ventaja mecánica ideal: 
$$
VM = 1
$$
Fuerza ideal para levantar:
$$
𝐹ideal = 𝑚 ⋅ 𝑔
(con 𝑔 = 9.81m/s2 g=9.81 m/s2)
$$
Si hay **rozamiento** (pérdidas en la cuerda/rueda), modelaremos:
$$
Fnecesaria ≈ m ⋅ g⋅(1+μ)
$$
donde μ es un número entre 0 y 0.3 ( 0% –30% extra).

## 📁 Paso 0. Estructura de archivos

Crea una carpeta, por ejemplo `simulacion-polea/`, con:

```css
simulacion-polea/
│  index.html
│  styles.css
│  app.js
└─ img/
   └─ polea.png  (opcional: o usa el dibujo SVG incluido)
```

## 


![Recurso 4foto0021](https://github.com/Grandote58/grandote58-web-codex/blob/main/Simulacion_002/assets/Recurso%204foto0021-1758666451954-3.png)
