/**
 * Animaciones Premium para NEVORA 
 * Desarrollado con GSAP (GreenSock Animation Platform)
 */

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

window.addEventListener('load', () => {
    // Referencias a elementos
    const title = document.querySelector('.hero-titulo');
    const lema = document.querySelector('.hero-lema');
    const divisor = document.querySelector('.hero-divisor');
    const navItems = document.querySelectorAll('.nav-enlace, .btn-reservar, .nav-marca, .destinos-contenedor');
    const scrollLabel = document.querySelector('.etiqueta-scroll');
    const scrollLine = document.querySelector('.linea-scroll');
    const scrollArrow = document.querySelector('.icono-flecha');
    
    if (!title) return;

    // --- 1. Preparación: Dividir el título en letras individuales ---
    const text = title.textContent.trim();
    title.innerHTML = text.split('').map(letter => 
        letter === ' ' ? '&nbsp;' : `<span class="letter" style="display:inline-block; transition: color 0.3s ease;">${letter}</span>`
    ).join('');

    const letters = title.querySelectorAll('.letter');

    // --- 2. Estado Inicial (Oculto) ---
    gsap.set(letters, { y: 40, opacity: 0, rotateX: -90 });
    gsap.set(lema, { y: 20, opacity: 0 });
    gsap.set(divisor, { scaleX: 0, transformOrigin: "center" });
    gsap.set(navItems, { y: -20, opacity: 0 });
    // Añadir estado inicial para la imagen del header y el scroll indicator
    gsap.set('.hero-bg-imagen', { scale: 1.3, opacity: 0, filter: "blur(20px)" });
    gsap.set(scrollLabel, { y: 20, opacity: 0 });
    gsap.set(scrollLine, { scaleY: 0, transformOrigin: "top" });
    if (scrollArrow) gsap.set(scrollArrow, { opacity: 0, y: -10 });

    // --- 3. Timeline de Carga (Intro) ---
    const tl = gsap.timeline({ 
        defaults: { ease: "expo.out" },
        onComplete: () => {
            // Flecha: rebote vertical continuo
            if (scrollArrow) {
                gsap.to(scrollArrow, {
                    y: 10,
                    duration: 1,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }

            // Etiqueta "Descubrir": respiración de halo dorado
            if (scrollLabel) {
                gsap.to(scrollLabel, {
                    filter: "drop-shadow(0 0 18px rgba(230, 195, 100, 0.95)) drop-shadow(0 0 6px rgba(255, 230, 120, 0.6))",
                    duration: 2.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        }
    });

    // Animación de entrada de la imagen principal
    tl.to('.hero-bg-imagen', {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 2.5,
        ease: "power3.out"
    })
    .to(navItems, { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1 
    }, "-=1.5") // Iniciar antes de que la imagen termine
    .to(letters, { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        duration: 1.5, 
        stagger: 0.05,
        ease: "back.out(1.7)"
    }, "-=1.0")
    .to(lema, { 
        y: 0, 
        opacity: 1, 
        duration: 1 
    }, "-=1")
    .to(divisor, { 
        scaleX: 1, 
        duration: 2,
        ease: "power4.inOut"
    }, "-=1.2")
    .to(scrollLabel, {
        y: 0,
        opacity: 1,
        duration: 1
    }, "-=1.0")
    .to(scrollLine, {
        scaleY: 1,
        duration: 1.5,
        ease: "power3.inOut"
    }, "-=0.5");
    
    if (scrollArrow) {
        tl.to(scrollArrow, {
            opacity: 1,
            y: 0,
            duration: 1
        }, "-=1.0");
    }

    // --- 4. Interacción Mouse (Hover) ---
    // Creamos un efecto de "ola" cuando el cursor pasa por encima del título
    title.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        
        letters.forEach(letter => {
            const rect = letter.getBoundingClientRect();
            const letterX = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - letterX);
            
            // Si el cursor está cerca de la letra, aplicamos un transform dinámico
            if (distance < 100) {
                const scale = 1 + (100 - distance) / 200; // Máximo 1.5
                const yShift = (100 - distance) / 5; // Máximo -20px
                
                gsap.to(letter, {
                    scale: scale,
                    y: -yShift,
                    color: "#ffffff",
                    duration: 0.3,
                    overwrite: "auto"
                });
            } else {
                gsap.to(letter, {
                    scale: 1,
                    y: 0,
                    color: "var(--color-primario)",
                    duration: 0.5,
                    overwrite: "auto"
                });
            }
        });
    });

    // Resetear al salir el mouse del contenedor
    title.addEventListener('mouseleave', () => {
        gsap.to(letters, {
            scale: 1,
            y: 0,
            color: "var(--color-primario)",
            duration: 0.8,
            stagger: 0.02,
            ease: "elastic.out(1, 0.3)"
        });
    });

    // --- 5. Parallax Hero ---
    gsap.to(".hero-bg-imagen", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // ================================================================
    // SECCIÓN HABITACIONES
    // ================================================================

    // — Encabezado: etiqueta → título → descripción —
    const tlHab = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
            trigger: ".encabezado-seccion",
            start: "top 85%",
            once: true
        }
    });
    tlHab
        .from(".encabezado-seccion .etiqueta-seccion", {
            y: 24,
            autoAlpha: 0,
            letterSpacing: "1em",
            duration: 1.2
        })
        .from(".titulo-seccion", {
            y: 60,
            autoAlpha: 0,
            duration: 1.4
        }, "-=0.7")
        .from(".descripcion-seccion", {
            x: 40,
            autoAlpha: 0,
            duration: 1
        }, "-=0.9");

    // — Tarjetas: stagger con ligera rotación volumétrica —
    gsap.from(".tarjeta-habitacion", {
        y: 80,
        autoAlpha: 0,
        rotateY: 8,
        transformOrigin: "left center",
        duration: 1.4,
        stagger: 0.18,
        ease: "expo.out",
        scrollTrigger: {
            trigger: ".grilla-habitaciones",
            start: "top 85%",
            once: true
        }
    });

    // — Parallax interno de cada imagen de tarjeta —
    document.querySelectorAll(".tarjeta-imagen").forEach(img => {
        gsap.to(img, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
                trigger: img.closest(".tarjeta-habitacion"),
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // — Precio badge: aparece con rebote al entrar la tarjeta —
    gsap.from(".tarjeta-precio", {
        scale: 0.6,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.18,
        ease: "back.out(2)",
        delay: 0.3,
        scrollTrigger: {
            trigger: ".grilla-habitaciones",
            start: "top 85%",
            once: true
        }
    });

    // ================================================================
    // SECCIÓN RESTAURANTE
    // ================================================================

    // — Parallax en la imagen de fondo —
    gsap.to(".restaurante-fondo-imagen", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
            trigger: ".seccion-restaurante",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // — Contenido: cascada elegante —
    const tlRest = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
            trigger: ".restaurante-contenido",
            start: "top 80%",
            once: true
        }
    });
    tlRest
        .from(".restaurante-contenido .etiqueta-seccion", {
            y: 30,
            autoAlpha: 0,
            letterSpacing: "1.2em",
            duration: 1.4
        })
        .from(".restaurante-titulo", {
            y: 80,
            autoAlpha: 0,
            scale: 0.92,
            duration: 1.6,
            ease: "expo.out"
        }, "-=0.8")
        .from(".restaurante-descripcion", {
            y: 40,
            autoAlpha: 0,
            duration: 1.1
        }, "-=1.0")
        .from(".btn-reservacion", {
            y: 28,
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.9,
            ease: "back.out(1.8)"
        }, "-=0.7");

    // — Brillo pulsante en el overlay del restaurante al entrar en vista —
    ScrollTrigger.create({
        trigger: ".seccion-restaurante",
        start: "top 60%",
        once: true,
        onEnter: () => {
            gsap.fromTo(".restaurante-fondo-overlay",
                { opacity: 0.6 },
                { opacity: 1, duration: 2, ease: "power2.inOut" }
            );
        }
    });

    // ================================================================
    // SECCIÓN NOSOTROS
    // ================================================================

    // — Columna imagen: borde esquina → imagen con clip-path → año —
    const tlNosImg = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
            trigger: ".nosotros-col-imagen",
            start: "top 80%",
            once: true
        }
    });
    tlNosImg
        .from(".nosotros-borde-esquina", {
            scale: 0,
            autoAlpha: 0,
            transformOrigin: "top left",
            duration: 1.2,
            ease: "power3.out"
        })
        .fromTo(".nosotros-imagen-wrap",
            { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 0 },
            { clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, duration: 1.6, ease: "expo.inOut" },
            "-=0.6"
        )
        .from(".nosotros-imagen-wrap", {
            x: -50,
            duration: 1.6,
            ease: "expo.out"
        }, "<");

    // — Año: aparece con un contador dramático —
    const añoEl = document.querySelector(".nosotros-año");
    if (añoEl) {
        ScrollTrigger.create({
            trigger: ".nosotros-col-imagen",
            start: "top 75%",
            once: true,
            onEnter: () => {
                const obj = { val: 1800 };
                gsap.to(obj, {
                    val: 1892,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        añoEl.textContent = Math.floor(obj.val);
                    }
                });
                gsap.fromTo(añoEl,
                    { autoAlpha: 0, y: 30 },
                    { autoAlpha: 1, y: 0, duration: 1.4, ease: "power3.out" }
                );
            }
        });
    }

    // — Columna texto: cascada de elementos —
    const tlNosTxt = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
            trigger: ".nosotros-col-texto",
            start: "top 80%",
            once: true
        }
    });
    tlNosTxt
        .from(".nosotros-col-texto .etiqueta-seccion", {
            y: 24,
            autoAlpha: 0,
            letterSpacing: "1em",
            duration: 1.2
        })
        .from(".nosotros-titulo", {
            y: 60,
            autoAlpha: 0,
            duration: 1.4
        }, "-=0.6")
        .from(".nosotros-parrafos p", {
            y: 35,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.22
        }, "-=0.8")
        .from(".nosotros-divisor", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.2,
            ease: "power4.inOut"
        }, "-=0.3")
        .from(".nosotros-enlace", {
            x: -24,
            autoAlpha: 0,
            duration: 0.9
        }, "-=0.7");

    // — Parallax sutil en la imagen de nosotros al hacer scroll —
    gsap.to(".nosotros-imagen", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
            trigger: ".nosotros-col-imagen",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    ScrollTrigger.refresh();
});
