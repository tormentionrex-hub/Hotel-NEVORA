/**
 * Animaciones Premium — Página de Restaurante
 * NEVORA | GSAP + ScrollTrigger
 *
 * Técnicas usadas (ninguna repetida de index.html):
 *   Hero         → Ken Burns zoom-out + letras con skewY
 *   Filosofía    → Wipe horizontal + word-split rotateY + mask párrafos
 *   Creaciones   → Clip-path direccional por tarjeta + número magnético
 *   La Cava      → Zoom-scale BG + blur-clear por palabras + border-draw botón
 *   Reserva CTA  → Spin-drop icono + zoom-blur título + cajas split izq/der
 */

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/* ── Utilidad: divide un elemento en palabras animables ── */
function splitWords(el) {
    const words = el.textContent.trim().split(' ');
    el.innerHTML = words
        .map(w => `<span class="sw-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="sw" style="display:inline-block;">${w}</span></span>`)
        .join(' ');
    return el.querySelectorAll('.sw');
}

window.addEventListener('load', () => {

    // ============================================================
    // 1. HERO — Ken Burns inverso + letras con skewY
    // ============================================================
    const heroTitle = document.querySelector('.hero-titulo');
    const heroLema  = document.querySelector('.hero-lema');
    const heroDivisor = document.querySelector('.hero-divisor');
    const heroBg    = document.querySelector('.hero-bg-imagen');
    const navItems  = document.querySelectorAll('.nav-enlace, .btn-reservar, .nav-marca, .destinos-contenedor');

    if (heroTitle) {
        /* split en letras con skewY (diferente a index que usa rotateX) */
        const raw = heroTitle.textContent.trim();
        heroTitle.innerHTML = raw.split('').map(ch =>
            ch === ' ' ? '&nbsp;'
                       : `<span class="hl" style="display:inline-block;">${ch}</span>`
        ).join('');
        const hLetters = heroTitle.querySelectorAll('.hl');

        gsap.set(hLetters,   { y: 70, autoAlpha: 0, skewY: 8 });
        gsap.set(heroLema,   { autoAlpha: 0, letterSpacing: '0.8em' });
        gsap.set(heroDivisor,{ scaleY: 0, transformOrigin: 'top' });
        gsap.set(heroBg,     { scale: 1.12, autoAlpha: 0, filter: 'blur(16px)' });
        gsap.set(navItems,   { y: -24, autoAlpha: 0 });

        const tlHero = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tlHero
            /* imagen: Ken Burns zoom-out */
            .to(heroBg, { scale: 1, autoAlpha: 1, filter: 'blur(0px)', duration: 3, ease: 'power2.out' })
            .to(navItems, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.07 }, '-=2')
            /* letras: skewY desaparece + suben */
            .to(hLetters, { y: 0, autoAlpha: 1, skewY: 0, duration: 1.4, stagger: 0.035, ease: 'expo.out' }, '-=1.4')
            /* lema: letter-spacing colapsa */
            .to(heroLema, { autoAlpha: 1, letterSpacing: '0.4em', duration: 1.4, ease: 'power3.out' }, '-=1.0')
            .to(heroDivisor, { scaleY: 1, duration: 2, ease: 'power4.inOut' }, '-=1.0');

        /* Parallax suave al hacer scroll */
        gsap.to(heroBg, {
            yPercent: 28,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });
    }

    // ============================================================
    // 2. FILOSOFÍA — Wipe horizontal + word-split rotateY + mask párrafos
    // ============================================================
    const filImagen    = document.querySelector('.fil-imagen');
    const filImg       = document.querySelector('.fil-img');
    const filCaja      = document.querySelector('.fil-caja');
    const filCajaTitulo = document.querySelector('.fil-caja-titulo');
    const filTitulo    = document.querySelector('.fil-titulo');
    const filParrafos  = document.querySelectorAll('.fil-parrafo');
    const filEnlace    = document.querySelector('.fil-enlace');

    if (filImagen) {
        /* ── Imagen: wipe desde la derecha (cortina horizontal) ── */
        gsap.set(filImagen, { clipPath: 'inset(0% 100% 0% 0%)' });
        gsap.set(filImg,    { scale: 1.15 });

        const tlFil = gsap.timeline({
            defaults: { ease: 'expo.inOut' },
            scrollTrigger: { trigger: '#filosofia', start: 'top 78%', once: true }
        });

        tlFil
            .to(filImagen, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8 })
            .to(filImg,    { scale: 1, duration: 1.8 }, '<');

        /* ── Caja "01 / El Origen": sube desde abajo ── */
        if (filCaja) {
            const filNumero = filCaja.querySelector('.fil-numero');
            gsap.set(filCaja, { y: 50, autoAlpha: 0 });
            tlFil
                .to(filCaja,       { y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, '-=0.8')
                .to(filCajaTitulo, { autoAlpha: 1, duration: 0.8 }, '-=0.4');

            /* Número "01": pulso de opacidad al aparecer la caja */
            if (filNumero) {
                tlFil.fromTo(filNumero,
                    { opacity: 0, scale: 1.4 },
                    { opacity: 0.2, scale: 1, duration: 1.2, ease: 'power3.out' },
                    '<'
                );
            }
        }

        /* ── Título: split por palabras con rotateY ── */
        if (filTitulo) {
            const words = splitWords(filTitulo);
            gsap.set(words, { rotateY: -70, autoAlpha: 0, transformOrigin: 'left center' });
            tlFil.to(words, { rotateY: 0, autoAlpha: 1, duration: 1.1, stagger: 0.1, ease: 'back.out(1.4)' }, '-=1.2');
        }

        /* ── Párrafos: mask de abajo hacia arriba (clip-path) ── */
        filParrafos.forEach((p, i) => {
            gsap.set(p, { clipPath: 'inset(0% 0% 100% 0%)', y: 10 });
            tlFil.to(p, {
                clipPath: 'inset(0% 0% 0% 0%)',
                y: 0,
                duration: 1.2,
                ease: 'power3.inOut'
            }, `-=${i === 0 ? 0.9 : 0.7}`);
        });

        /* ── Enlace: aparece desde izquierda + su borde crece ── */
        if (filEnlace) {
            gsap.set(filEnlace, { x: -30, autoAlpha: 0 });
            tlFil.to(filEnlace, { x: 0, autoAlpha: 1, duration: 0.9, ease: 'power3.out' }, '-=0.6');
        }

        /* ── Parallax interno de la imagen al hacer scroll ── */
        gsap.to(filImg, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
                trigger: '#filosofia',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // ============================================================
    // 3. CREACIONES DE AUTOR — Clip-path direccional por tarjeta
    //    Card 1 ← derecha  |  Card 2 ↑ abajo  |  Card 3 ← izquierda
    // ============================================================
    const sigSection = document.querySelector('#signature-creations');

    if (sigSection) {
        /* ── Encabezado: icono menú gira + h2 word-split con skewX ── */
        const sigLabel = sigSection.querySelector('span.text-primary');
        const sigH2    = sigSection.querySelector('h2');
        const sigIcon  = sigSection.querySelector('.material-symbols-outlined');

        if (sigLabel) {
            gsap.from(sigLabel, {
                autoAlpha: 0, x: -20, duration: 1,
                scrollTrigger: { trigger: sigSection, start: 'top 82%', once: true }
            });
        }
        if (sigH2) {
            const sigWords = splitWords(sigH2);
            gsap.set(sigWords, { skewX: 12, y: 50, autoAlpha: 0 });
            gsap.to(sigWords, {
                skewX: 0, y: 0, autoAlpha: 1,
                duration: 1.2, stagger: 0.12, ease: 'expo.out',
                scrollTrigger: { trigger: sigSection, start: 'top 80%', once: true }
            });
        }
        if (sigIcon) {
            gsap.from(sigIcon, {
                rotation: -120, autoAlpha: 0, scale: 0.5, duration: 1.4, ease: 'back.out(1.8)',
                scrollTrigger: { trigger: sigSection, start: 'top 80%', once: true }
            });
        }

        /* ── Número magnético en hover sobre cada tarjeta ── */
        const cards = sigSection.querySelectorAll('.signature-card');
        const directions = [
            'inset(0% 0% 0% 100%)',  /* card 1: wipe desde derecha */
            'inset(100% 0% 0% 0%)',  /* card 2: wipe desde arriba  */
            'inset(0% 100% 0% 0%)'   /* card 3: wipe desde izquierda */
        ];
        const xFrom = [-70, 0, 70];
        const yFrom = [0, 60, 0];

        cards.forEach((card, i) => {
            const img    = card.querySelector('img');
            const imgWrap = card.querySelector('.aspect-\\[3\\/4\\]') || img?.parentElement;
            const texts  = card.querySelectorAll('.dish-text');

            /* Clip-path diferente por tarjeta */
            if (imgWrap) {
                gsap.set(imgWrap, { clipPath: directions[i] });
                gsap.to(imgWrap, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.6,
                    ease: 'expo.inOut',
                    scrollTrigger: { trigger: card, start: 'top 85%', once: true }
                });
            }

            /* La tarjeta entera también entra desde su dirección */
            gsap.from(card, {
                x: xFrom[i],
                y: yFrom[i],
                autoAlpha: 0,
                duration: 1.4,
                ease: 'expo.out',
                delay: 0.2,
                scrollTrigger: { trigger: card, start: 'top 85%', once: true }
            });

            /* Textos: aparecen letra-a-letra con stagger muy rápido */
            if (texts.length) {
                gsap.from(texts, {
                    autoAlpha: 0, y: 22, duration: 0.9,
                    stagger: 0.14, ease: 'power3.out', delay: 0.5,
                    scrollTrigger: { trigger: card, start: 'top 82%', once: true }
                });
            }

            /* Parallax imagen al scroll */
            if (img) {
                gsap.to(img, {
                    yPercent: 12,
                    ease: 'none',
                    scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true }
                });
            }
        });
    }

    // ============================================================
    // 4. LA CAVA — Zoom-scale BG + blur-clear palabras + border-draw botón
    // ============================================================
    const bodega = document.getElementById('bodega');

    if (bodega) {
        const bodegaBg      = bodega.querySelector('.bodega-bg');
        const bodegaLabel   = bodega.querySelector('.bodega-label');
        const bodegaTitulo  = bodega.querySelector('.bodega-titulo');
        const bodegaDesc    = bodega.querySelector('.bodega-desc');
        const bodegaBtn     = bodega.querySelector('.bodega-btn');
        const bodegaVintage = bodega.querySelector('.bodega-vintage');

        /* ── BG: zoom lento desde 1.15 mientras se hace scroll ── */
        if (bodegaBg) {
            gsap.set(bodegaBg, { scale: 1.15 });
            gsap.to(bodegaBg, {
                scale: 1,
                ease: 'none',
                scrollTrigger: { trigger: bodega, start: 'top bottom', end: 'bottom top', scrub: true }
            });
            gsap.to(bodegaBg, {
                yPercent: 18,
                ease: 'none',
                scrollTrigger: { trigger: bodega, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }

        /* ── Label: letter-spacing colapsa + fade ── */
        if (bodegaLabel) {
            gsap.from(bodegaLabel, {
                autoAlpha: 0, letterSpacing: '0.9em', duration: 1.4, ease: 'power3.out',
                scrollTrigger: { trigger: bodega, start: 'top 75%', once: true }
            });
        }

        /* ── Título "La Cava": cada palabra entra con blur-clear ── */
        if (bodegaTitulo) {
            const cavaWords = splitWords(bodegaTitulo);
            gsap.set(cavaWords, {
                autoAlpha: 0,
                filter: 'blur(18px)',
                x: 40
            });
            gsap.to(cavaWords, {
                autoAlpha: 1,
                filter: 'blur(0px)',
                x: 0,
                duration: 1.3,
                stagger: 0.18,
                ease: 'power3.out',
                scrollTrigger: { trigger: bodega, start: 'top 72%', once: true }
            });
        }

        /* ── Descripción: fade-up por línea con clip-path ── */
        if (bodegaDesc) {
            gsap.from(bodegaDesc, {
                clipPath: 'inset(0% 0% 100% 0%)',
                y: 15,
                duration: 1.4,
                ease: 'power3.inOut',
                scrollTrigger: { trigger: bodega, start: 'top 68%', once: true }
            });
        }

        /* ── Botón: border-draw (crece desde la izquierda) ── */
        if (bodegaBtn) {
            gsap.set(bodegaBtn, { clipPath: 'inset(0% 100% 0% 0%)', autoAlpha: 1 });
            gsap.to(bodegaBtn, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'expo.inOut',
                scrollTrigger: { trigger: bodega, start: 'top 65%', once: true }
            });
        }

        /* ── Texto vintage: slide desde la derecha ── */
        if (bodegaVintage) {
            gsap.from(bodegaVintage, {
                x: 40, autoAlpha: 0, duration: 1, ease: 'power3.out', delay: 0.3,
                scrollTrigger: { trigger: bodega, start: 'top 65%', once: true }
            });
        }
    }

    // ============================================================
    // 5. RESERVA CTA — Spin-drop icono + zoom-blur título + cajas split
    // ============================================================
    const reservar = document.getElementById('reservar');

    if (reservar) {
        const ctaIcono  = reservar.querySelector('.cta-icono');
        const ctaTitulo = reservar.querySelector('.cta-titulo');
        const ctaDesc   = reservar.querySelector('.cta-desc');
        const ctaCajas  = reservar.querySelectorAll('.cta-caja');
        const ctaBtn    = reservar.querySelector('.cta-btn');

        const tlCta = gsap.timeline({
            defaults: { ease: 'expo.out' },
            scrollTrigger: { trigger: reservar, start: 'top 78%', once: true }
        });

        /* ── Icono: cae desde arriba con giro completo ── */
        if (ctaIcono) {
            gsap.set(ctaIcono, { y: -60, rotation: 270, autoAlpha: 0, scale: 0.5 });
            tlCta.to(ctaIcono, {
                y: 0, rotation: 0, autoAlpha: 1, scale: 1,
                duration: 1.4, ease: 'back.out(1.6)'
            });
        }

        /* ── Título: zoom-blur (escala grande hacia posición + blur clearing) ── */
        if (ctaTitulo) {
            gsap.set(ctaTitulo, { scale: 1.35, autoAlpha: 0, filter: 'blur(14px)' });
            tlCta.to(ctaTitulo, {
                scale: 1, autoAlpha: 1, filter: 'blur(0px)',
                duration: 1.5, ease: 'power3.out'
            }, '-=0.8');
        }

        /* ── Descripción: fade suave ── */
        if (ctaDesc) {
            gsap.set(ctaDesc, { autoAlpha: 0, y: 20 });
            tlCta.to(ctaDesc, { autoAlpha: 1, y: 0, duration: 1 }, '-=1.0');
        }

        /* ── Cajas info: split, izquierda y derecha convergen ── */
        ctaCajas.forEach((caja, i) => {
            const fromX = i === 0 ? -80 : 80;
            gsap.set(caja, { x: fromX, autoAlpha: 0 });
            tlCta.to(caja, {
                x: 0, autoAlpha: 1, duration: 1.2, ease: 'expo.out'
            }, `-=${i === 0 ? 0.6 : 1.0}`);
        });

        /* ── Botón CTA: escala desde 0.85 + brillo pulsante después ── */
        if (ctaBtn) {
            gsap.set(ctaBtn, { scale: 0.85, autoAlpha: 0 });
            tlCta.to(ctaBtn, {
                scale: 1, autoAlpha: 1, duration: 1, ease: 'back.out(1.5)'
            }, '-=0.7');

            /* Pulso de brillo continuo tras entrada */
            ScrollTrigger.create({
                trigger: reservar,
                start: 'top 60%',
                once: true,
                onEnter: () => {
                    gsap.to(ctaBtn, {
                        filter: 'brightness(1.25)',
                        duration: 1.6,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: 1.5
                    });
                }
            });
        }
    }

    ScrollTrigger.refresh();
});
