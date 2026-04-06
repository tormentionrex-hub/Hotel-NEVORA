# GSAP Skills — Guía de Uso Rápido

Este directorio contiene los archivos necesarios para implementar animaciones premium con **GSAP (GreenSock Animation Platform)**, organizados a partir del repositorio oficial de habilidades de GSAP para IA.

## 📂 Estructura de Archivos
- **`gsap.min.js`**: El núcleo de la librería GSAP (v3.12.5).
- **`ScrollTrigger.min.js`**: Plugin oficial para animaciones basadas en el scroll.
- **`gsap-styles.css`**: Estilos base para elementos animados (extraídos de los ejemplos).
- **`main-example.js`**: Ejemplo de uso canónico de tweens, timelines y ScrollTrigger.

## 🛠️ Cómo Invocarlo
Para usar estas animaciones en tu página (por ejemplo, en `index.html`), sigue estos pasos:

### 1. Incluye los scripts en tu HTML
Añade estas líneas justo antes de que termine el tag `</body>`:

```html
<!-- Importar GSAP y plugins -->
<script src="./skills/gsap.min.js"></script>
<script src="./skills/ScrollTrigger.min.js"></script>

<!-- Tu script personalizado -->
<script>
  // Registrar el plugin de ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Ejemplo de animación rápida
  gsap.to(".mi-elemento", {
      x: 100,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
          trigger: ".mi-elemento",
          start: "top 80%",
          scrub: true
      }
  });
</script>
```

### 2. Ejemplo de Timeline (Animaciones Secuenciadas)
```javascript
const tl = gsap.timeline();
tl.to(".logo", { y: -50, opacity: 1, duration: 0.5 })
  .to(".menu", { x: 0, opacity: 1 }, "-=0.2") // Empieza 0.2s antes
  .to(".hero-text", { scale: 1.1, ease: "back.out" });
```

---
*Nota: Estos archivos fueron descargados y organizados automáticamente a partir del repo `greensock/gsap-skills`.*
