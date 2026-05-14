/**
 * DevD Romania | Advanced Interactive Logic
 * Senior Full-Stack Architect Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 3. Magnetic Buttons Logic
    const initMagneticButtons = () => {
        const buttons = document.querySelectorAll('.btn-glass');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.35,
                    y: y * 0.35,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    };

    // 4. 3D Glass Tilt Logic
    const initTiltEffect = () => {
        document.querySelectorAll('.liquid-glass').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 25;
                const rotateY = (centerX - x) / 25;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.02,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.4)"
                });
            });
        });
    };

    // 5. Advanced Scroll Reveals (Staggered)
    const initScrollReveals = () => {
        gsap.utils.toArray(".reveal").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });
    };

    // 6. Scroll-Based Navigation Logic
    const initScrollNav = () => {
        const nav = document.getElementById('main-nav');
        if (!nav) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 150) {
                nav.style.transform = 'translate(-50%, -180%)';
            } else {
                nav.style.transform = 'translate(-50%, 0)';
            }
            lastScrollY = currentScrollY;
        });
    };

    // 7. Price Calculator Logic
    const initCalculator = () => {
        const pkg = document.getElementById('calc-package');
        const xtras = document.querySelectorAll('.calc-extra');
        const total = document.getElementById('total-price');
        
        if (!pkg || !total) return;

        const updatePrice = () => {
            let sum = parseInt(pkg.value);
            xtras.forEach(x => { if(x.checked) sum += parseInt(x.value); });
            
            // Animation for total price change
            gsap.to(total, {
                textContent: sum,
                duration: 0.6,
                snap: { textContent: 1 },
                ease: "power1.out"
            });
        };

        pkg.addEventListener('change', updatePrice);
        xtras.forEach(x => x.addEventListener('change', updatePrice));
    };

    // 8. Entrance Timeline (Triggered after loader)
    const startHeroEntrance = () => {
        const tl = gsap.timeline();
        
        // Target specifically the hero content to avoid affecting the Nav
        const heroTitle = document.querySelector('#viziune h1');
        const heroText = document.querySelector('#viziune p');
        const heroBtns = document.querySelectorAll('#viziune .btn-glass');

        if(heroTitle) tl.from(heroTitle, { y: 60, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2, clearProps: "all" });
        if(heroText) tl.from(heroText, { y: 30, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" }, "-=1.1");
        if(heroBtns.length > 0) tl.from(heroBtns, { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.1, clearProps: "all" }, "-=0.7");
    };

    // 9. Loader Logic
    const hideLoader = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.transform = 'translateY(-100%)';
                
                // Fire animations
                startHeroEntrance();
                
                // Failsafe: Ensure buttons are visible even if GSAP fails
                setTimeout(() => {
                    document.querySelectorAll('.btn-glass').forEach(b => b.style.opacity = "1");
                }, 2000);

                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }, 800);
        } else {
            // If no loader, just show everything
            startHeroEntrance();
        }
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

    // Execute All
    // animateBlobs();
    initScrollNav();
    initCalculator();
});
