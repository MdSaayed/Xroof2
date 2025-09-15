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
2. Card Stagger
3. Hero One Area
4. 


------------------------------------------------------------------*/
gsap.registerPlugin(ScrollTrigger);

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

function animateCards(className) {
    const cards = document.querySelectorAll('.' + className);
    if (!cards || cards.length === 0) return;

    gsap.set(cards, {
        opacity: 0,
        y: 80,
    });

    cards.forEach((card) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none none',
                markers: false
            },
            onComplete: () => card.classList.add('animated')
        });
    });

    ScrollTrigger.refresh();
}

/* =============================
* 2. Card Stagger
============================= */
document.addEventListener('DOMContentLoaded', function () {
    [
        'services__card',
        'why-choose-us__card',
        'projects__card',
        'team__member',
        'testimonials__card',
        'faq__item',
        'blog-card',
        'pricing__card',
        'services__item',
        'blog__card',
        'process-item',
        'blog__list-item'
    ].forEach(className => animateCards(className));

    setTimeout(() => ScrollTrigger.refresh(), 300);

    window.addEventListener('resize', () => ScrollTrigger.refresh());
    window.addEventListener('orientationchange', () => ScrollTrigger.refresh());
});

/* =============================
* 20. Fade Animation
============================= */
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
    if (elementExists(['hero--style-3'])) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

        // Top area
        tl.from(".hero__subtitle", { y: -30, opacity: 0 })
            .from(".hero__review-area", { y: -30, opacity: 0 }, "-=0.5");

        // Headings
        tl.from(".hero__title", { scale: 0.8, opacity: 0, stagger: 0.3 }, "-=0.3");

        // Description + Button
        tl.from(".hero__desc", { y: 40, opacity: 0 }, "-=0.5")
            .from(".hero__btn", { y: 40, opacity: 0 }, "-=0.7");

        // Video thumbnail
        tl.from(".hero__video-wrap", { scale: 0.7, opacity: 0, duration: 1.2 }, "-=0.5");

        // Social icons stagger
        tl.fromTo(
            ".hero__socials-link",
            { x: 40, opacity: 0 },   // starting state
            { x: 0, opacity: 1, stagger: 0.2, duration: 0.6 }, // ending state
            "-=0.5"
        );
    }

    /* =============================
    * 12. About Three Area
    ============================= */
    if (elementExists(['about--style-3'])) {
        fadeAnimation('fade-up', ['about__title', 'about__desc', 'about__btn-wrap', 'about__solution', 'about__img', 'year__img-wrap', 'about__stat']);
    }

    /* =============================
    * 12. Services Four Area
    ============================= */
    if (elementExists(['services--style-4'])) {
        fadeAnimation('fade-up', ['services__title', 'services__desc', 'services__btn-all']);
    }

    /* =============================
    * 12. Project Three Area
    ============================= */
    if (elementExists(['projects--style-3'])) {
        fadeAnimation('fade-up', ['projects__title', 'projects__desc', 'projects__header-btn']);
        fadeAnimation('zoom-in', ['projects__item']);
    }

    /* =============================
    * 12. Work Process Two Area
    ============================= */
    if (elementExists(['work-process--style-2'])) {
        fadeAnimation('fade-up', ['work-process__title']);
        fadeAnimation('zoom-in', ['work-process__img-wrap']);
    }

    /* =============================
    * 12. Team Three Area
    ============================= */
    if (elementExists(['team--style-3'])) {
        fadeAnimation('fade-up', ['team__title', 'team__desc', 'team__header-right', 'team-slider']);
    }

    /* =============================
    * 12. Team Three Area
    ============================= */
    if (elementExists(['award--style-1'])) {
        fadeAnimation('fade-up', ['award__subtitle', 'award__title', 'award__desc', 'award__btn', 'award__list']);
    }

    /* =============================
    * 12. Contact One Area
    ============================= */
    if (elementExists(['contact--style-1'])) {
        fadeAnimation('fade-up', ['contact__title', 'contact__form-wrap', 'contact__info-title', 'contact__info-text', 'info-card']);
    }

    /* =============================
    * 12. Blog Three Area
    ============================= */
    if (elementExists(['blog--style-3'])) {
        fadeAnimation('fade-up', ['blog__title', 'blog__desc']);
    }

    /* =============================
    * 12. Blog Three Area
    ============================= */
    if (elementExists(['breadcrumbs'])) {
        fadeAnimation('fade-up', ['breadcrumbs__title','breadcrumbs__list']);
    }
});


