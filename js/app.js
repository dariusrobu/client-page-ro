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
        document.querySelectorAll('.liquid-glass:not(.no-tilt)').forEach(card => {
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

    // 8. Demo Modal Logic
    const demoData = {
        essential: {
            title: "Arhitectura Essential",
            desc: "Lansare rapidă. Impact imediat. Ideal pentru prezență locală sau portofolii personale.",
            features: ["Design One-Page Scroll", "Performanță Brută (100/100)", "Zero Mentenanță", "Mobile-First Design", "Optimizare SEO de Bază"],
            demo: "Structură: Hero -> Despre -> Servicii -> Contact"
        },
        bespoke: {
            title: "Arhitectura Bespoke",
            desc: "Control total. Design de elită. Soluția optimă pentru afaceri în plină expansiune.",
            features: ["Structură Multi-Page (până la 6)", "Panou de Administrare Custom", "Strategie Copywriting", "Animații Premium GSAP", "Integrări Social Media"],
            demo: "Structură: Multi-Section + Blog + Dashboard Administrare"
        },
        elite: {
            title: "Arhitectura Elite",
            desc: "Performanță extremă. Scalabilitate. Soluții complexe pentru viziuni mari.",
            features: ["Aplicație Web / E-Commerce", "Bază de Date Avansată", "Integrări API & Plăți", "Branding & Logo Design", "Suport Prioritar 30 zile"],
            demo: "Structură: Arhitectură Cloud + Magazin / Platformă Personalizată"
        }
    };

    window.openDemo = (id) => {
        const modal = document.getElementById('demo-modal');
        const content = document.getElementById('modal-content');

        if (!modal || !content) return;

        // Reset content and inject truly fullscreen iframe
        content.innerHTML = `
            <div class="fixed inset-0 w-full h-full bg-black">
                <iframe src="demos/${id}.html" class="w-full h-full border-none" id="demo-iframe"></iframe>
            </div>
            <!-- Close Button for Mobile -->
            <button onclick="closeDemo()" class="fixed top-6 right-6 z-[100] w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white text-xl">×</button>
            
            <!-- Centered CTA Button -->
            <div class="fixed bottom-10 left-0 w-full flex justify-center px-6 z-50">
                <a href="https://wa.me/40758462498" class="btn-glass px-10 py-5 text-[10px] font-heading font-black uppercase tracking-[0.4em] italic shadow-2xl whitespace-nowrap">Rezervă Acest Plan</a>
            </div>
        `;

        // Update modal container classes for fullscreen
        content.className = "w-full h-full relative z-10 opacity-0";
        
        modal.classList.remove('hidden');
        gsap.to(content, { opacity: 1, duration: 0.8, ease: "power2.out" });
        lenis.stop(); 
    };

    window.closeDemo = () => {
        const modal = document.getElementById('demo-modal');
        const content = document.getElementById('modal-content');

        gsap.to(content, { opacity: 0, y: 50, duration: 0.5, ease: "power2.in", onComplete: () => {
            modal.classList.add('hidden');
            lenis.start();
        }});
    };

    // 9. Entrance Timeline (Triggered after loader)
    const startHeroEntrance = () => {
        const tl = gsap.timeline();
        const heroTitle = document.querySelector('#viziune h1');
        const heroText = document.querySelector('#viziune p');
        const heroBtns = document.querySelectorAll('#viziune .btn-glass');

        if(heroTitle) tl.from(heroTitle, { y: 60, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.2, clearProps: "all" });
        if(heroText) tl.from(heroText, { y: 30, opacity: 0, duration: 1, ease: "power3.out", clearProps: "all" }, "-=1.1");
        if(heroBtns.length > 0) tl.from(heroBtns, { scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.1, clearProps: "all" }, "-=0.7");
    };

    // 10. Loader Logic
    const hideLoader = () => {
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => {
                loader.style.transform = 'translateY(-100%)';
                startHeroEntrance();
                setTimeout(() => {
                    document.querySelectorAll('.btn-glass').forEach(b => b.style.opacity = "1");
                }, 2000);
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }, 800);
        } else {
            startHeroEntrance();
        }
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
    }

    // Execute All
    initScrollNav();
    initCalculator();
    initMagneticButtons();
    initTiltEffect();
    initScrollReveals();
});
