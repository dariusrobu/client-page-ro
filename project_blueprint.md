# <DevD> Master Blueprint & Technical DNA

Acest document reprezintă „ADN-ul” complet al proiectului **DevD**. Conține specificațiile exacte, valorile matematice și textele finale necesare pentru o reconstrucție 1:1.

---

## 1. Visual DNA (CSS Tokens)

### A. The "Liquid Glass" Core
Orice element de tip card sau panou trebuie să folosească exact aceste valori pentru a păstra aspectul premium:
```css
.liquid-glass {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.5),
        inset 0 0 24px rgba(255, 255, 255, 0.05);
    border-radius: 40px; /* Desktop */
}
```

### B. Global Backgrounds
*   **Desktop Blobs:** Trei sfere animate (`mix-blend-mode: screen`, `filter: blur(80px)`) în culorile Violet (#7c3aed) și Magenta (#ff00ff).
*   **Mobile Glow:** `radial-gradient(circle at 50% -20%, rgba(124, 58, 237, 0.3), transparent 70%)`.
*   **Noise Texture:** Base64 SVG aplicat ca overlay la 5% opacitate pentru a „lega” gradientele.

---

## 2. Copywriting & Content Map

### Hero Section
*   **Heading:** `Arhitectură Digitală de Înaltă Performanță` (Eb Garamond, Italic).
*   **Sub-heading:** `Construim site-uri care convertesc, pentru afaceri care au rămas mici pentru WordPress. 100% Cod Custom. Zero mentenanță.`

### Pricing Plans
*   **Essential:** `€299` | `Impact Imediat. Lansare Rapidă.`
*   **Bespoke:** `€449` | `Control Total. Design de Elită.`
*   **Elite:** `€799` | `Performanță Extremă. Scalabilitate.`

### Price Calculator Add-ons
*   Lansare 48h: `+€30`
*   Design Ultra: `+€49`
*   SEO & Indexare: `+€49`
*   Motion Design: `+€99`
*   CMS Dashboard: `+€149`
*   Multi-Language: `+€49`

---

## 3. Logic & Mathematical Snippets

### A. Calculator Price Logic
```javascript
function updatePrice() {
    let total = parseInt(packageSelect.value);
    checkboxes.forEach(cb => {
        if (cb.checked) total += parseInt(cb.value);
    });
    // Animate total-price element using GSAP
    gsap.to("#total-price", { innerText: total, snap: { innerText: 1 }, duration: 0.5 });
}
```

### B. Demo Modal Injection
```javascript
window.openDemo = (id) => {
    content.innerHTML = `
        <div class="fixed inset-0 bg-black"><iframe src="demos/${id}.html"></iframe></div>
        <button onclick="closeDemo()">×</button>
        <div class="fixed bottom-10 w-full flex justify-center">
            <a href="https://wa.me/..." class="btn-glass">Rezervă Acest Plan</a>
        </div>
    `;
}
```

---

## 4. Animation Configs (GSAP)

*   **SplitText Reveal:** `y: 0, opacity: 1, stagger: 0.05, ease: "power4.out"`.
*   **Scroll Reveal:** `y: 80, opacity: 0, duration: 2, ease: "power4.out"`.
*   **Tilt Effect (Desktop Only):** Max rotation `5deg` on X/Y axis based on mouse position relative to card center.

---

## 5. Assets & Prompts Reference
*   **Main Background Texture:** `ultra_premium_glassmorphism_texture_1778799423352.png` (Abstract, translucent glass textures, dark studio lighting).
*   **Icons:** Lucide-React (Search, Shield, Zap, Layers, Globe).
*   **Favicon:** `<DevD>` stylized in white on black background.
