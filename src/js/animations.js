/**
 * Animaciones Premium para Hotel Aurélyn 
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
    const navItems = document.querySelectorAll('.nav-enlace, .btn-reservar, .nav-marca');
    
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

    // --- 3. Timeline de Carga (Intro) ---
    const tl = gsap.timeline({ 
        defaults: { ease: "expo.out" } 
    });

    tl.to(navItems, { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.1 
    })
    .to(letters, { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        duration: 1.5, 
        stagger: 0.05,
        ease: "back.out(1.7)"
    }, "-=0.5")
    .to(lema, { 
        y: 0, 
        opacity: 1, 
        duration: 1 
    }, "-=1")
    .to(divisor, { 
        scaleX: 1, 
        duration: 2,
        ease: "power4.inOut"
    }, "-=1.2");

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

    // --- 5. Animación de Scroll Suave (ScrollTrigger) ---
    // Un efecto sutil de parallax para la imagen de fondo del hero
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
});
