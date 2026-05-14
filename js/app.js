/**
 * DevD Romania | Logic & Animations
 * Senior Full-Stack Architect Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 1. Liquid Background Animation (Blobs)
    const animateBlobs = () => {
        gsap.to("#blob1", { x: '40vw', y: '20vh', duration: 25, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to("#blob2", { x: '-30vw', y: '30vh', duration: 30, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to("#blob3", { x: '20vw', y: '-40vh', duration: 22, repeat: -1, yoyo: true, ease: "sine.inOut" });
    };

    // 2. Global Reveal Animations
    const initReveals = () => {
        const isMobile = window.innerWidth < 768;
        gsap.utils.toArray(".reveal").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: isMobile ? "top 92%" : "top 95%",
                    toggleActions: "play none none none"
                },
                duration: isMobile ? 1.2 : 1.6,
                y: isMobile ? 40 : 60,
                opacity: 0,
                ease: "power3.out",
                clearProps: "all" // Ensure styles are cleared after animation
            });
        });
    };

    // 3. 3D Tilt Effect for Glass Cards
    const initTiltEffect = () => {
        document.querySelectorAll('.liquid-glass').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.6,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.4)"
                });
            });
        });
    };

    // 4. Terminal Typewriter Logic
    const initTerminal = () => {
        const term = document.getElementById('terminal');
        if (!term) return;

        const codeLines = [
            "// Building Modern Architecture...",
            "export default function HeroSection() {",
            "  return (",
            "    <section className='relative h-screen bg-black overflow-hidden'>",
            "      <div className='max-w-7xl mx-auto px-6 py-20'>",
            "        <h1 className='text-8xl font-black tracking-tighter'>",
            "          Precision Engineering",
            "        </h1>",
            "      </div>",
            "    </section>",
            "  );",
            "}",
            "[BUILD SUCCESSFUL] in 0.7s",
            "> Next.js core optimized",
            "> Sanity CMS schema active",
            "> Deployment ready for Vercel Edge"
        ];

        let lineIdx = 0;
        const typeTerm = () => {
            if (lineIdx < codeLines.length) {
                const div = document.createElement('div');
                div.className = 'mb-1 opacity-0';
                if(codeLines[lineIdx].includes('[BUILD')) div.className = 'mb-1 opacity-0 text-white font-black';
                if(codeLines[lineIdx].startsWith('>')) div.className = 'mb-1 opacity-0 text-white/60 italic';
                div.textContent = codeLines[lineIdx];
                term.appendChild(div);
                gsap.to(div, { opacity: 1, x: 5, duration: 0.3 });
                lineIdx++;
                setTimeout(typeTerm, 150);
            }
        };

        ScrollTrigger.create({
            trigger: "#terminal",
            onEnter: typeTerm
        });
    };

    // 5. Price Calculator Logic
    const initCalculator = () => {
        const pkg = document.getElementById('calc-package');
        const xtras = document.querySelectorAll('.calc-extra');
        const total = document.getElementById('total-price');
        
        if (!pkg || !total) return;

        const updatePrice = () => {
            let sum = parseInt(pkg.value);
            xtras.forEach(x => { if(x.checked) sum += parseInt(x.value); });
            total.textContent = sum;
        };

        pkg.addEventListener('change', updatePrice);
        xtras.forEach(x => x.addEventListener('change', updatePrice));
    };

    // 6. Mobile Menu Logic
    const initMobileMenu = () => {
        const toggle = document.getElementById('menu-toggle');
        const close = document.getElementById('menu-close');
        const menu = document.getElementById('mobile-menu');
        const links = document.querySelectorAll('.mobile-link');

        if (!toggle || !menu) return;

        const openMenu = () => {
            menu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            menu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        };

        toggle.addEventListener('click', openMenu);
        if (close) close.addEventListener('click', closeMenu);
        links.forEach(l => l.addEventListener('click', closeMenu));
    };

    // Execute All
    // animateBlobs();
    // initReveals();
    // initTiltEffect();
    // initTerminal();
    initCalculator();
    initMobileMenu();
});
