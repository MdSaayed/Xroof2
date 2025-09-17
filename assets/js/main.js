/*------------------------------------------------------------------
Template Name: XRoof — Roofing Services HTML Template
Template URL: https://xroof.netlify.app
Description:  XRoof — Roofing Services HTML Template is a clean, modern, and fully responsive template designed specifically for roofing companies, contractors, and construction businesses. Built with the latest technologies, XRoof helps you showcase your services, projects, and team in a professional way that builds trust with customers.
Whether you’re a roofing contractor, construction service provider, or repair specialist, XRoof provides all the essential pages and components to launch your website quickly and easily. With a well-structured codebase, developers can customize it effortlessly, while end-users enjoy a smooth, fast, and mobile-friendly browsing experience.
Author: RoxThemes
Author URL: https://kits.roxthemes.com/babio
Version: 1.0
-------------------------------------------------------------------

JS INDEX
===================

1. Preloader
2. Dynamically set BG
3. Hero Bg Slider Home Two
4. Counter
5. Glightbox
6. Faq
7. Hero Two Slider
8. Projects Two Slider
9. Team Two
10. Team Three
11. Award Area
12. Contact form input date
13. Offcanvas
14. Info Panel
15. Nav Arrow Toggle
16. Services Video
17. Scroll Progress Circle
18. Hero Two bg Animation

------------------------------------------------------------------*/

"use strict";

/* =============================
* 1. Preloader
============================= */
document.addEventListener('DOMContentLoaded', function () {
  var preloader = document.querySelector(".preloader");

  if (!preloader) return;

  setTimeout(() => {
    preloader.style.display = "none";
  }, 300);
});

/* =============================
* 2. Dynamically set BG
============================= */
document.addEventListener("DOMContentLoaded", function () {
  const bgDivs = document.querySelectorAll("[data-bg-img]");
  if (bgDivs.length > 0) {
    bgDivs.forEach((div) => {
      const bgImg = div.getAttribute("data-bg-img");
      if (bgImg) {
        div.style.background = `url(${bgImg})`;
        div.style.backgroundSize = "cover";
        div.style.backgroundPosition = "center";
        div.style.zIndex = "999";
      }
    });
  }
});

/* =============================
* 3. Hero Bg Slider Home Two
============================= */
document.addEventListener("DOMContentLoaded", function () {
  const bgSliderContainer = document.querySelector("#hero-banner-2");
  const heroSection = document.querySelector("#hero-2");

  if (!bgSliderContainer || !heroSection) {
    return;
  }

  const bgSlider = tns({
    container: "#hero-banner-2",
    items: 1,
    slideBy: "page",
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayButtonOutput: false,
    controls: false,
    nav: true,
    loop: true,
    mouseDrag: false,
    touch: false,
    speed: 1000,
  });

  function updateHeroBackground(index) {
    const currentSlide = document.querySelectorAll("#hero-banner-2 .hero__bg-slide")[index];
    if (!currentSlide) return;
    const bg = currentSlide.getAttribute("data-bg");
    if (bg) {
      heroSection.style.backgroundImage = `url(${bg})`;
    }
  }

  updateHeroBackground(bgSlider.getInfo().index);

  bgSlider.events.on("indexChanged", function (info) {
    updateHeroBackground(info.index);
  });

  const prevBtn = document.querySelector("#hero-2 .hero__btn--prev");
  const nextBtn = document.querySelector("#hero-2 .hero__btn--next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      bgSlider.goTo("prev");
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      bgSlider.goTo("next");
    });
  }
});

/* =============================
* 4. Counter
============================= */
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-start][data-end]');

  const animateCounter = (el) => {
    const start = parseFloat(el.dataset.start) || 0;
    const end = parseFloat(el.dataset.end) || 0;
    const duration = parseFloat(el.dataset.duration) || 2000; // ms
    const format = el.dataset.format || 'short'; // default short (k)
    const suffix = el.dataset.suffix || ''; // optional suffix
    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1); // 0 → 1
      const value = start + (end - start) * progress;

      // Determine display based on format
      if (format === 'full') {
        el.innerText = Math.round(value) + suffix;
      } else {
        el.innerText = (value / 1000).toFixed(1) + 'k' + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure exact final value
        if (format === 'full') {
          el.innerText = Math.round(end) + suffix;
        } else {
          el.innerText = (end / 1000).toFixed(1) + 'k' + suffix;
        }
      }
    }

    requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(el => observer.observe(el));
});

/* =============================
* 5. Glightbox
============================= */
const lightbox = GLightbox({
  selector: '.glightbox',
  autoplayVideos: true
});

/* =============================
* 6. Faq
============================= */
document.querySelectorAll('.faq__item').forEach(item => {
  const button = item.querySelector('.faq__question-wrap');
  const answer = item.querySelector('.faq__answer');

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq__item').forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq__answer').style.height = 0;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.height = "auto";
    }
  });
});

/* =============================
* 7. Hero Two Slider
============================= */
const hero_two_slider = document.querySelector('#hero-two-slider');

if (hero_two_slider) {
  const hero_two_slider = tns({
    container: '#hero-two-slider',
    items: 1,
    slideBy: 'page',
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayButtonOutput: false,
    controls: false,
    nav: false,
    loop: true,
    lazyload: true,
    gutter: 10
  });
}

/* =============================
* 8. Projects Two Slider
============================= */
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector('#project-slider-1');
  if (!slider) return;

  const slides = slider.querySelectorAll('.projects__slide');
  const prevBtn = slider.parentElement.querySelector('#prevButton');
  const nextBtn = slider.parentElement.querySelector('#nextButton');

  if (slides.length === 0 || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let visibleCount = 3;
  let gap = 32;

  function updateVisibleCountAndGap() {
    const width = window.innerWidth;
    if (width < 540) {
      visibleCount = 1;
      gap = 8;
    } else if (width < 768) {
      visibleCount = 2;
      gap = 12;
    } else if (width < 1200) {
      visibleCount = 3;
      gap = 20;
    } else {
      visibleCount = 3;
      gap = 32;
    }
  }

  function updateSlider() {
    updateVisibleCountAndGap();

    slider.style.display = "flex";
    slider.style.transition = "transform 0.5s ease";

    slides.forEach((s, i) => {
      s.style.flex = `0 0 calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
      s.style.marginRight = (i === slides.length - 1) ? "0px" : `${gap}px`;
    });

    const slideOuterWidth = slides[0].offsetWidth + gap;

    if (currentIndex < 0) {
      currentIndex = slides.length - visibleCount;
    }
    if (currentIndex > slides.length - visibleCount) {
      currentIndex = 0;
    }

    slider.style.transform = `translateX(-${currentIndex * slideOuterWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
  });

  slides.forEach((slide) => {
    slide.addEventListener("mouseenter", () => {
      if (visibleCount === 1) return;

      const groupStart = currentIndex;
      const groupSlides = Array.from(slides).slice(groupStart, groupStart + visibleCount);

      const growPercent = 20;
      const baseFlex = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
      const hoveredFlex = `calc(${baseFlex} + ${growPercent}%)`;
      const nonHoveredFlex = `calc(${baseFlex} - ${growPercent / (visibleCount - 1)}%)`;

      groupSlides.forEach(s => {
        s.style.flexBasis = (s === slide) ? hoveredFlex : nonHoveredFlex;
      });
    });

    slide.addEventListener("mouseleave", () => {
      updateSlider();
    });
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
});

/* =============================
* 9. Team Two
============================= */
const team_slider_element = document.querySelector('#team-2');
document.addEventListener("DOMContentLoaded", function () {
  if (team_slider_element) {
    const wrapper = document.querySelector('.team__cards');
    const slides = document.querySelectorAll('.team__card');
    const prevBtn = document.getElementById("team-prev-btn");
    const nextBtn = document.getElementById("team-next-btn");

    let currentIndex = 0;
    let visibleCount = 3;
    let gap = 32;
    let isHovering = false;

    function updateVisibleCountAndGap() {
      const width = window.innerWidth;

      if (width >= 1441) {
        visibleCount = 3;
        gap = 32;
      }
      else if (width >= 1220 && width <= 1440) {
        visibleCount = 2;
        gap = 24;
      }
      else if (width >= 1025 && width < 1220) {
        visibleCount = 3;
        gap = 28;
      }
      else if (width >= 541 && width <= 1024) {
        visibleCount = 2;
        gap = 16;
      }
      else {
        visibleCount = 1;
        gap = 10;
      }
    }

    function updateSlider() {
      updateVisibleCountAndGap();
      const containerWidth = wrapper.parentElement.offsetWidth;
      const totalGapWidth = gap * (visibleCount - 1);
      const availableWidth = containerWidth - totalGapWidth;

      if (currentIndex > slides.length - visibleCount) {
        currentIndex = slides.length - visibleCount;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }

      slides.forEach((slide, index) => {
        slide.classList.remove('active');

        // Set margins
        slide.style.marginRight = (index < slides.length - 1) ? gap + 'px' : '0';

        // Set flex-basis for all slides
        if (index >= currentIndex && index < currentIndex + visibleCount) {
          if (visibleCount === 3) {
            slide.style.flexBasis = (availableWidth * (index === currentIndex ? 0.5 : 0.25)) + 'px';
          } else if (visibleCount === 2) {
            slide.style.flexBasis = (availableWidth * (index === currentIndex ? 0.6 : 0.4)) + 'px';
          } else {
            slide.style.flexBasis = availableWidth + 'px';
          }
        } else {
          slide.style.flexBasis = (availableWidth / visibleCount) + 'px';
        }
      });

      // Add active class to the first visible slide only when not hovering
      if (!isHovering && slides[currentIndex]) {
        slides[currentIndex].classList.add('active');
      }

      let offset = 0;
      for (let i = 0; i < currentIndex; i++) {
        const nonVisibleBaseWidth = (containerWidth - gap * (visibleCount - 1)) / visibleCount;
        offset += nonVisibleBaseWidth + gap;
      }

      wrapper.style.transform = `translateX(-${offset}px)`;
    }

    // Function to handle hover state
    function handleHover(hoveredSlide) {
      const containerWidth = wrapper.parentElement.offsetWidth;
      const totalGapWidth = gap * (visibleCount - 1);
      const availableWidth = containerWidth - totalGapWidth;

      const hoveredIndex = Array.from(slides).indexOf(hoveredSlide);
      const startOfVisibleGroup = currentIndex;

      slides.forEach((slide, index) => {
        slide.classList.remove('active');
      });

      const group = Array.from(slides).slice(startOfVisibleGroup, startOfVisibleGroup + visibleCount);
      if (visibleCount === 2) {
        group.forEach(s => s.style.flexBasis = (s === hoveredSlide ? availableWidth * 0.6 : availableWidth * 0.4) + 'px');
      } else if (visibleCount === 3) {
        group.forEach(s => s.style.flexBasis = (s === hoveredSlide ? availableWidth * 0.5 : availableWidth * 0.25) + 'px');
      }
    }

    slides.forEach(slide => {
      slide.addEventListener('mouseenter', () => {
        isHovering = true;
        handleHover(slide);
      });

      slide.addEventListener('mouseleave', () => {
        isHovering = false;
        updateSlider();
      });
    });

    nextBtn.addEventListener('click', () => {
      isHovering = false;
      currentIndex++;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      isHovering = false;
      currentIndex--;
      updateSlider();
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
  }
});

/* =============================
* 10. Team Three
============================= */
const team_slider_three = document.querySelector('#team-slider-3');

if (team_slider_three) {
  const teamSliderThree = tns({
    container: '#team-slider-3 .team-slider__wrapper',
    items: 1,
    slideBy: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayButtonOutput: false,
    controls: true,
    nav: false,
    loop: true,
    lazyload: true,
    gutter: 32,
    prevButton: document.getElementById('team-slider-3-prev'),
    nextButton: document.getElementById('team-slider-3-next'),
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1200: { items: 3 },
      1920: { items: 4 }
    }
  });
}

/* =============================
* 11. Award Area
============================= */
const awardItems = document.querySelectorAll('.award__item');

if (awardItems) {
  awardItems.forEach(item => {
    item.addEventListener('click', () => {
      awardItems.forEach(el => el.classList.remove('award__item--active'));
      item.classList.add('award__item--active');
    });
  });
}

/* =============================
* 12. Contact form input date
============================= */
document.addEventListener('DOMContentLoaded', function () {
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("dateInput");

  if (dateInput) {
    dateInput.value = today;
  }
});

/* =============================
* 13. Offcanvas
============================= */
document.addEventListener('DOMContentLoaded', function () {
  const offcanvas = document.querySelector('.offcanvas');
  const offcanvasToggle = document.querySelector('#offcanvas-toggle');
  const offcanvasClose = document.querySelector('#offcanvas-close');
  const offcanvasNavMenu = document.querySelector('#offcanvas-nav-menu');
  const body = document.body;

  if (offcanvas) {
    const overlay = document.createElement('div');
    overlay.classList.add('offcanvas-overlay');
    document.body.appendChild(overlay);

    const openOffcanvas = () => {
      offcanvas.classList.add('active');
      overlay.classList.add('offcanvas-overlay---active');
      body.classList.add('offcanvas-active');
    };

    const closeOffcanvas = () => {
      offcanvas.classList.remove('active');
      overlay.classList.remove('offcanvas-overlay---active');
      body.classList.remove('offcanvas-active');
    };

    offcanvasToggle.addEventListener('click', openOffcanvas);

    if (offcanvasClose) {
      offcanvasClose.addEventListener('click', closeOffcanvas);
    }

    overlay.addEventListener('click', closeOffcanvas);

    const parentLinks = offcanvasNavMenu.querySelectorAll('.nav__item-has-children > .nav__link');
    parentLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('active');

        const submenu = this.nextElementSibling;
        if (submenu) {
          submenu.classList.toggle('active');
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (offcanvas.classList.contains('active') && !offcanvas.contains(e.target) && !offcanvasToggle.contains(e.target) && !overlay.contains(e.target)) {
        closeOffcanvas();
      }
    });

    const navLinks = offcanvasNavMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        const parentItem = this.parentElement;
        if (!parentItem.classList.contains('nav__item-has-children')) {
          closeOffcanvas();
        }
      });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1200 && offcanvas.classList.contains('active')) {
        closeOffcanvas();
      }

      if (window.innerWidth > 1200) {
        document.querySelectorAll('.nav__item-has-children > .nav__link').forEach(link => {
          link.classList.remove('active');
        });
        document.querySelectorAll('.nav__submenu').forEach(submenu => {
          submenu.classList.remove('active');
        });
      }
    });
  }
});

/* =============================
* 14. Info Panel
============================= */
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("info-toggle"); // main toggle
  const toggleBtnClose = document.getElementById("info-toggle-close"); // secondary toggle/close
  const closeBtn = document.getElementById("offcanvas-toggle-close"); // inside panel close button
  const infoPanel = document.getElementById("info-panel"); // the panel itself

  if (infoPanel) {

    // Open/Toggle panel with main button
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        infoPanel.classList.toggle("active");
      });
    }

    // Close panel with secondary toggle button
    if (toggleBtnClose) {
      toggleBtnClose.addEventListener("click", function (e) {
        e.stopPropagation();
        infoPanel.classList.remove("active");
      });
    }

    // Close panel with inside close button
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        infoPanel.classList.remove("active");
      });
    }

    // Prevent closing when clicking inside panel
    infoPanel.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    // Close panel when clicking outside
    document.addEventListener("click", function () {
      infoPanel.classList.remove("active");
    });
  }
});

/* =============================
* 15. Nav Arrow Toggle
============================= */
document.addEventListener("DOMContentLoaded", function () {
  const arrow = document.querySelector('.nav__arrow');
  const menuWrap = document.querySelector('.nav__menu');
  const breakpoint = 768; 

  if (!arrow || !menuWrap) return;

  let lastKnownWidth = 0;

  // Function to calculate and set the menu's width
  const setMenuWidth = () => {
    // Temporarily set width to 'auto' to get the true scrollWidth
    menuWrap.style.width = 'auto';
    lastKnownWidth = menuWrap.scrollWidth;
    // Set the fixed width back
    menuWrap.style.width = lastKnownWidth + 'px';
  };

  const handleResize = () => {
    // Hide the menu if the screen is smaller than the breakpoint
    if (window.innerWidth < breakpoint) {
      menuWrap.classList.add('hide');
      menuWrap.style.width = '0';
      menuWrap.style.padding = '0';
      menuWrap.style.visibility = 'hidden';
    } else {
      menuWrap.classList.remove('hide');
      menuWrap.style.visibility = 'visible';
      menuWrap.style.overflow = 'visible';
      menuWrap.style.padding = '0 2rem';
      setMenuWidth(); // Recalculate and set the full width
    }
  };

  // Initial setup on page load
  menuWrap.style.transition = 'width 0.5s ease, padding 0.5s ease';
  handleResize(); // Initial check

  arrow.addEventListener('click', () => {
    if (menuWrap.classList.contains('hide')) {
      menuWrap.style.visibility = 'visible';
      menuWrap.classList.remove('hide');
      menuWrap.style.overflow = 'hidden';
      menuWrap.style.width = '0';
      menuWrap.style.padding = '0';

      requestAnimationFrame(() => {
        menuWrap.style.width = lastKnownWidth + 'px';
        menuWrap.style.padding = '0 2rem';
      });

      setTimeout(() => {
        menuWrap.style.overflow = 'visible';
      }, 500);
    } else {
      // Hide menu
      lastKnownWidth = menuWrap.scrollWidth;
      menuWrap.style.overflow = 'hidden';
      menuWrap.style.width = '0';
      menuWrap.style.padding = '0';
      setTimeout(() => {
        menuWrap.style.visibility = 'hidden';
        menuWrap.classList.add('hide');
      }, 500);
    }
  });

  // Recalculate width on resize
  window.addEventListener('resize', handleResize);
});

/* =============================
* 16. Services Video
============================= */
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("bgVideo");
  const playBtn = document.getElementById("playBtn");

  if (!video || !playBtn) return;

  const playIcon = `
    <svg width="31" height="35" viewBox="0 0 31 35" fill="none">
      <path d="M30.6092 17.4998L0.445408 34.9149V0.0847454L30.6092 17.4998Z" fill="white" />
    </svg>`;
  const pauseIcon = `
    <svg width="31" height="35" viewBox="0 0 31 35" fill="none">
      <rect x="2" y="2" width="10" height="31" fill="white"/>
      <rect x="19" y="2" width="10" height="31" fill="white"/>
    </svg>`;

  playBtn.innerHTML = playIcon;

  playBtn.addEventListener("click", () => {
    if (video.paused) {
      video.muted = false;
      video.play();
      playBtn.innerHTML = pauseIcon;
    } else {
      video.pause();
      playBtn.innerHTML = playIcon;
    }
  });
});

/* =============================
* 20. Project filter
============================= */
document.addEventListener("DOMContentLoaded", function () {
  const grid = document.querySelector('#projects-grid');

  if (!grid) return;

  const iso = new Isotope(grid, {
    itemSelector: '[data-category]',
    layoutMode: 'fitRows',
    percentPosition: true,
    transitionDuration: '0.6s'

  });

  const filterButtons = document.querySelectorAll('.projects__filter-item');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('projects__filter-item--active'));
      this.classList.add('projects__filter-item--active');

      const filterValue = this.getAttribute('data-filter');
      if (filterValue === '*') {
        iso.arrange({ filter: '*' });
      } else {
        iso.arrange({ filter: `[data-category="${filterValue}"]` });
      }
    });
  });
});

/* =============================
* 17. Scroll Progress Circle
============================= */
 function initCircularProgress() {
  // Create container div
  const container = document.createElement('div');
  container.classList.add('progress-circle');

  // Create SVG
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');

  // Background circle
  const bgCircle = document.createElementNS(svgNS, 'circle');
  bgCircle.setAttribute('class', 'progress-circle-bg');
  bgCircle.setAttribute('cx', 50);
  bgCircle.setAttribute('cy', 50);
  bgCircle.setAttribute('r', 40);

  // Progress circle
  const progressCircle = document.createElementNS(svgNS, 'circle');
  progressCircle.setAttribute('class', 'progress-circle-progress');
  progressCircle.setAttribute('cx', 50);
  progressCircle.setAttribute('cy', 50);
  progressCircle.setAttribute('r', 40);

  // Text
  const progressText = document.createElementNS(svgNS, 'text');
  progressText.setAttribute('class', 'progress-circle-text');
  progressText.setAttribute('x', 50);
  progressText.setAttribute('y', 50);
  progressText.setAttribute('text-anchor', 'middle');
  progressText.setAttribute('dy', '0.3em');
  progressText.textContent = '0%';

  // Append elements
  svg.appendChild(bgCircle);
  svg.appendChild(progressCircle);
  svg.appendChild(progressText);
  container.appendChild(svg);
  document.body.appendChild(container);

  // Setup circular stroke
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  // Scroll event
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight);

    const offset = circumference - (scrollPercent * circumference);
    progressCircle.style.strokeDashoffset = offset;

    progressText.textContent = `${Math.round(scrollPercent * 100)}%`;
  });
}
initCircularProgress();

/* =============================
* 18. Hero Two bg Animation
============================= */
document.addEventListener("DOMContentLoaded", function () {
  if (typeof particlesJS !== "undefined" && document.getElementById("hero-particles")) {
    particlesJS("hero-particles", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
});



