/*------------------------------------------------------------------
Template Name: 
Template URL:  
Description:  
Author:
Author URL: 
Version: 1.0
-------------------------------------------------------------------

JS INDEX
===================

1. Reuseable Animation
2. 


------------------------------------------------------------------*/

/* =============================
* 20. Card Stagger
============================= */
gsap.registerPlugin(ScrollTrigger);

function animateCards(className) {
    const cards = document.querySelectorAll('.' + className);

    cards.forEach((card) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'play none none none',
            }
        });
    });

    ScrollTrigger.refresh();
}

function animateCards(className) {
    const cards = document.querySelectorAll('.' + className);

    // Mobile-friendly initial state
    gsap.set(cards, {
        opacity: 0,
        y: 80,
        rotation: 1
    });

    cards.forEach((card) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'bottom 60%',
                toggleActions: 'play none none none',
                invalidateOnRefresh: true // ✅ mobile orientation/resize fix
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    animateCards('services__card');
    animateCards('why-choose-us__card');
    animateCards('projects__card');
    animateCards('team__member');
    animateCards('testimonials__card');
    animateCards('faq__item');
    animateCards('blog-card');
    animateCards('pricing__card');
    animateCards('services__item');
    animateCards('blog__card');

    setTimeout(() => ScrollTrigger.refresh(), 300);

    window.addEventListener('resize', () => ScrollTrigger.refresh());
    window.addEventListener('orientationchange', () => ScrollTrigger.refresh());
});


// opacity: 0;
// transform: translateY(80px) rotate(1deg);
// transition: transform 0.3s, box - shadow 0.3s, background 0.3s;



/* =============================
* 1. Reuseable Animation
============================= */


function fadeAnimation(type, selectors, options = {}) {
    const selectorArray = Array.isArray(selectors) ? selectors : [selectors];

    const presets = {
        "fade-in": { opacity: 0, y: 30 },
        "fade-up": { opacity: 0, y: 80 },
        "fade-left": { opacity: 0, x: -80 },
        "fade-right": { opacity: 0, x: 80 },
        "slide-left": { opacity: 0, x: -300 },
        "slide-right": { opacity: 0, x: 300 },
        "slide-up": { opacity: 0, y: 300 },
        "slide-down": { opacity: 0, y: -300 },
        "zoom-in": { opacity: 0, scale: 0.8 },
        "zoom-out": { opacity: 0, scale: 1.2 }
    };

    const fromConfig = presets[type] || presets["fade-in"];

    selectorArray.forEach(selector => {
        const elements = document.querySelectorAll("." + selector);
        if (!elements.length) return;

        elements.forEach((el, index) => {
            gsap.fromTo(
                el,
                {
                    ...fromConfig,
                    ...options.from
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none none",
                        ...options.scrollTrigger
                    },
                    ...options.to
                }
            );
        });
    });
}

function elementMove(selectors) {
    // Check if single string diya hoy, array e convert koro
    if (typeof selectors === "string") {
        selectors = [selectors];
    }

    selectors.forEach(selector => {
        const elements = document.querySelectorAll("." + selector);
        elements.forEach(el => {
            gsap.fromTo(el,
                { y: -5 },
                {
                    y: 5,
                    duration: 1,
                    ease: "power1.inOut",
                    repeat: -1,
                    yoyo: true
                }
            );
        });
    });
}








function parallax(selector, axis = "y", strength = 100, duration = 1.2) {
    const elements = document.querySelectorAll("." + selector);
    elements.forEach(el => {
        gsap.fromTo(el, { [axis]: strength, opacity: 0 }, {
            [axis]: 0, opacity: 1, ease: "power2.out", duration: duration,
            scrollTrigger: { trigger: el, start: "top 85%", scrub: true }
        });
    });
}

function hoverEffect(selector, effect = "scale", amount = 1.1, duration = 0.3) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        el.addEventListener("mouseenter", () => { gsap.to(el, { scale: effect === "scale" ? amount : 1, rotate: effect === "rotate" ? 5 : 0, duration: duration, ease: "power2.out" }); });
        el.addEventListener("mouseleave", () => { gsap.to(el, { scale: 1, rotate: 0, duration: duration, ease: "power2.out" }); });
    });
}

function textRevealNested(selector, type = "char", duration = 0.8) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(el => {
        function wrapText(node) {
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== "") {
                    const text = child.textContent;
                    let wrapped = "";
                    if (type === "char") {
                        wrapped = text.split("").map(c => c === " " ? "&nbsp;" : `<span class="char">${c}</span>`).join("");
                    } else {
                        wrapped = text.split(" ").map(w => `<span class="word">${w}&nbsp;</span>`).join("");
                    }
                    const temp = document.createElement("span");
                    temp.innerHTML = wrapped;
                    child.parentNode.replaceChild(temp, child);
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    wrapText(child); // recurse into nested span
                }
            });
        }
        wrapText(el);

        const targets = el.querySelectorAll(".char, .word");
        gsap.from(targets, {
            y: 50,
            opacity: 0,
            stagger: 0.05,
            duration: duration,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%"
            }
        });
    });
}


function floatEffect(selector, distance = 20, duration = 2, rotate = false) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => { gsap.to(el, { y: `+=${distance}`, rotation: rotate ? 10 : 0, duration: duration, repeat: -1, yoyo: true, ease: "sine.inOut" }); });
}

function counterAnim(selector, values) {
    document.querySelectorAll(selector).forEach((counter, i) => {
        gsap.to(counter, { textContent: values[i] || 1000, duration: 2, snap: { textContent: 1 }, ease: "power1.inOut", scrollTrigger: { trigger: counter, start: "top 80%" } });
    });
}

function mouseParallax(selector, strength = 30) {
    const parallaxBox = document.querySelector(selector);
    document.addEventListener("mousemove", e => {
        const x = (window.innerWidth / 2 - e.pageX) / strength;
        const y = (window.innerHeight / 2 - e.pageY) / strength;
        gsap.to(parallaxBox, { x: x, y: y, duration: 0.5, ease: "power2.out" });
    });
}

// Extra animations
function pulse(selector, duration = 0.8, scale = 1.1) { gsap.to(selector, { scale: scale, duration: duration, repeat: -1, yoyo: true, ease: "power1.inOut" }); }
function shake(selector, duration = 0.1, amount = 10) { gsap.to(selector, { x: `+=${amount}`, duration: duration, repeat: -1, yoyo: true, ease: "power1.inOut" }); }
function spin(selector, duration = 2) { gsap.to(selector, { rotation: 360, duration: duration, repeat: -1, ease: "linear" }); }



document.addEventListener('DOMContentLoaded', function () {

    /* =============================
    * Helper Function
    ============================= */
    function elementExists(classNames) {
        if (!Array.isArray(classNames)) classNames = [classNames];
        return classNames.some(cls => document.querySelector(`.${cls}`));
    }

    /* =============================
    * 1. Hero One Area
    ============================= */
    if (elementExists(['hero--style-1'])) {
        fadeAnimation('fade-up', ['hero__title', 'hero__desc', 'hero__btn', 'hero__subtitle-wrap', 'hero__img-wrap', 'hero__form-wrap', 'hero__stats-item']);
        elementMove(['hero__shape-arrow']);
    }

    /* =============================
    * 2. About One Area
    ============================= */
    if (elementExists(['about--style-1'])) {
        fadeAnimation('fade-left', ['about__img-wrap', 'about__stat']);
        fadeAnimation('fade-up', ['about__subtitle-wrap', 'about__title', 'about__desc', 'services__item', 'about__btn-wrap']);
    }

    /* =============================
    * 3. Services One Area
    ============================= */
    if (elementExists(['services--style-1'])) {
        fadeAnimation('fade-up', ['services__top-subtitle-wrap', 'services__top-title', 'services__top-desc', 'services__card']);
    }

    /* =============================
    * 4. Why Choose Us One Area
    ============================= */
    if (elementExists(['why-choose-us--style-1'])) {
        fadeAnimation('fade-up', ['why-choose-us__subtitle-wrap', 'why-choose-us__title', 'why-choose-us__desc', 'why-choose-us__btn-wrap']);
        fadeAnimation('zoom-in', ['why-choose-us__award']);
    }

    /* =============================
    * 5. Project One Area
    ============================= */
    if (elementExists(['projects--style-1'])) {
        fadeAnimation('fade-up', ['projects__subtitle-wrap', 'projects__title', 'projects__desc', 'projects__btn']);
    }

    /* =============================
    * 6. Achievement One Area
    ============================= */
    if (elementExists(['achievement--style-1'])) {
        fadeAnimation('fade-up', ['achievement__left', 'achievement__subtitle-wrap', 'achievement__title', 'achievement__desc', 'achievement__stats', 'achievement__btn']);
        elementMove(['achievement__phn-number', 'achievement__home-icon', 'achievement__video-icon']);
    }

    /* =============================
    * 7. Team One Area
    ============================= */
    if (elementExists(['team--style-1'])) {
        fadeAnimation('fade-up', ['team__subtitle-wrap', 'team__title', 'team__desc', 'team__btn']);
    }

    /* =============================
    * 8. Testimonials One Area
    ============================= */
    if (elementExists(['testimonials--style-1'])) {
        fadeAnimation('fade-up', ['testimonials__subtitle-wrap', 'testimonials__title', 'testimonials__desc']);
    }

    /* =============================
    * 9. Pricing One Area
    ============================= */
    if (elementExists(['pricing--style-1'])) {
        fadeAnimation('fade-up', ['pricing__subtitle-wrap', 'pricing__title', 'pricing__desc']);
    }

    /* =============================
    * 10. Faq One Area
    ============================= */
    if (elementExists(['faq'])) {
        fadeAnimation('fade-up', ['faq__subtitle-wrap', 'faq__title', 'faq__desc']);
    }

    /* =============================
    * 11. Blog One Area
    ============================= */
    if (elementExists(['blog--style-1'])) {
        fadeAnimation('fade-up', ['blog__subtitle-wrap', 'blog__title', 'blog__desc', 'blog__btn']);
    }

    /* =============================
    * 12. Footer One Area
    ============================= */
    if (elementExists(['footer--style-1'])) {
        fadeAnimation('fade-up', ['footer__cta-title', 'footer__cta-desc', 'footer__cta-btn', 'footer__cta-bg']);
    }

    /* =============================
    * 12. Heo Two Area
    ============================= */
    if (elementExists(['hero--style-2'])) {
        fadeAnimation('fade-up', ['hero__stat', 'hero__nav', 'hero__img-wrapper']);
        fadeAnimation('zoom-out', ['hero__bg-text'], {
            to: {
                duration: 2,
                ease: "power1.inOut"
            },
            scrollTrigger: {
                start: "top 80%"
            }
        });
    }

    /* =============================
    * 12. About Two Area
    ============================= */
    if (elementExists(['about--style-2'])) {
        fadeAnimation('fade-up', ['about__title', 'about__desc', 'about__solution-text', 'about__feature']);
    }

    /* =============================
    * 12. Services Two Area
    ============================= */
    if (elementExists(['services--style-2'])) {
        fadeAnimation('fade-up', ['services__subtitle', 'services__title', 'services__desc', 'stat__number', 'stat__text']);
        fadeAnimation('fade-right', ['about__stat']);
        fadeAnimation('zoom-in', ['about__image'], {
            to: {
                ease: "power1.inOut"
            },
            scrollTrigger: {
                start: "top 80%"
            }
        });
    }

    /* =============================
    * 12. Services Two Area
    ============================= */
    if (elementExists(['projects--style-2'])) {
        fadeAnimation('fade-up', ['projects__subtitle', 'projects__title', 'projects__desc', 'projects__slider', 'slider__nav']);
    }

    /* =============================
    * 12. Started One Area
    ============================= */
    if (elementExists(['started--style-1'])) {
        fadeAnimation('fade-up', ['started__title', 'statistics__item']);
    }

    /* =============================
    * 12. Work Process One Area
    ============================= */
    if (elementExists(['work-process--style-1'])) {
        fadeAnimation('fade-up', ['work-process__title', 'work-process__desc', 'step-card']);
    }

    /* =============================
    * 12. Team Two Area
    ============================= */
    if (elementExists(['team--style-2'])) {
        fadeAnimation('fade-up', ['team__title', 'team__desc', 'team__right']);
    }

    /* =============================
    * 12. testimonials Two Area
    ============================= */
    if (elementExists(['testimonials--style-2'])) {
        fadeAnimation('fade-up', ['testimonials__subtitle', 'testimonials__title', 'testimonials__desc', 'testimonials__right']);
    }

    /* =============================
    * 12. Services three Area
    ============================= */
    if (elementExists(['services--style-3'])) {
        fadeAnimation('fade-left', ['services__top ']);

        if (elementExists(['services__video-bottom'])) {
            fadeAnimation('fade-up', ['services__video-text', 'services__video-btn']);
        }
    }

    /* =============================
    * 12. Blog Two Area
    ============================= */
    if (elementExists(['blog--style-2'])) {
        fadeAnimation('fade-up', ['blog__title', 'blog__desc', 'blog__btn',]);
    }
    
    /* =============================
    * 12. Hero Three Area
    ============================= */
    if (elementExists(['blog--style-2'])) {
        fadeAnimation('fade-up', ['blog__title', 'blog__desc', 'blog__btn',]);
    }



});


