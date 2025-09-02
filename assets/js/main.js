/*------------------------------------------------------------------
Template Name: Kitsolve – Business Solution HTML Template
Template URL: https://kitsolve.netlify.app
Description: Kitsolve is a clean, modern, and fully responsive HTML template designed for corporate businesses, startups, creative agencies, IT services, consulting firms, SaaS platforms, software showcases, app landing pages, marketing agencies, and digital service providers. Built on a 1920px grid, it offers a clear visual hierarchy, organized sections, and reusable components for easy editing and rapid customization.
Author: KitDokan
Author URL: https://themeforest.net/user/kitdokan
Version: 1.0
-------------------------------------------------------------------

JS INDEX
===================

1. Preloader

------------------------------------------------------------------*/


"use strict";

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
* 20. Pure Counter
============================= */
// document.addEventListener('DOMContentLoaded', () => {
//   const counters = document.querySelectorAll('[data-start][data-end]');

//   const animateCounter = (el) => {
//     const start = parseFloat(el.dataset.start) || 0;
//     const end = parseFloat(el.dataset.end) || 0;
//     const duration = parseFloat(el.dataset.duration) || 2000; // ms
//     const format = el.dataset.format || 'k'; // default to k
//     let startTime = null;

//     function animate(timestamp) {
//       if (!startTime) startTime = timestamp;
//       const progress = Math.min((timestamp - startTime) / duration, 1); // 0 → 1
//       const value = start + (end - start) * progress;

//       // Determine display based on format
//       if (format === 'k') {
//         el.innerText = (value / 1000).toFixed(1) + 'k';
//       } else if (format === 'full') {
//         el.innerText = Math.round(value);
//       }

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       } else {
//         // Ensure exact final value
//         if (format === 'k') {
//           el.innerText = (end / 1000).toFixed(1) + 'k';
//         } else if (format === 'full') {
//           el.innerText = Math.round(end);
//         }
//       }
//     }

//     requestAnimationFrame(animate);
//   };

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         animateCounter(entry.target);
//         observer.unobserve(entry.target); // animate only once
//       }
//     });
//   }, {
//     threshold: 0.5
//   });

//   counters.forEach(el => observer.observe(el));
// });

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
* 20. Glightbox
============================= */
const lightbox = GLightbox({
  selector: '.glightbox',
  autoplayVideos: true
});

/* =============================
* 20. Faq
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
* 20. Hero Two Slider
============================= */
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


/* =============================
* 20. Projects Two Slider
============================= */
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll('.projects__slider').forEach(slider => {
//     const slides = slider.querySelectorAll('.projects__slide');
//     const prevBtn = slider.parentElement.querySelector('#prevButton');
//     const nextBtn = slider.parentElement.querySelector('#nextButton');

//     if (!slider || slides.length === 0 || !prevBtn || !nextBtn) return;
//     let currentIndex = 0;
//     let visibleCount = 3;
//     let gap = 32;

//     function updateVisibleCount() {
//       const width = window.innerWidth;
//       if (width < 540) {
//         visibleCount = 1;
//         // gap = 8;
//       } else if (width < 768) {
//         visibleCount = 2;
//         gap = 16;
//       } else {
//         visibleCount = 3;
//         // gap = 32;
//       }
//     }

//     // Update slider position
//     function updateSlider() {
//       updateVisibleCount();
//       const slideWidth = slides[0].offsetWidth + gap;
//       const maxIndex = slides.length - visibleCount;
//       if (currentIndex < 0) currentIndex = 0;
//       if (currentIndex > maxIndex) currentIndex = maxIndex;
//       slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

//       slides.forEach(s => s.style.flex = `0 0 calc(100% / ${visibleCount})`);
//     }

//     nextBtn.addEventListener('click', () => {
//       currentIndex += 1;
//       updateSlider();
//     });

//     prevBtn.addEventListener('click', () => {
//       currentIndex -= 1;
//       updateSlider();
//     });

//     slides.forEach((slide) => {
//       slide.addEventListener("mouseenter", () => {
//         if (visibleCount === 1) return; // no hover effect if only 1 visible

//         const groupStart = currentIndex;
//         const groupSlides = Array.from(slides).slice(groupStart, groupStart + visibleCount);

//         // Reset only visible slides
//         groupSlides.forEach(s => s.style.flex = `0 0 calc(100% / ${visibleCount})`);

//         // Determine hovered width
//         let hoverWidth;
//         if (visibleCount === 2) hoverWidth = "0 0 75%";
//         else hoverWidth = "0 0 50%"; // default for 3 slides

//         slide.style.flex = hoverWidth;

//         // Shrink others proportionally
//         groupSlides.forEach(s => {
//           if (s !== slide) {
//             if (visibleCount === 2) s.style.flex = "0 0 25%";
//             else s.style.flex = `0 0 ${50 / (visibleCount - 1)}%`;
//           }
//         });
//       });

//       slide.addEventListener("mouseleave", () => {
//         const groupStart = currentIndex;
//         const groupSlides = Array.from(slides).slice(groupStart, groupStart + visibleCount);
//         groupSlides.forEach(s => s.style.flex = `0 0 calc(100% / ${visibleCount})`);
//       });
//     });


//     window.addEventListener('resize', updateSlider);
//     updateSlider();
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.projects__slider').forEach(slider => {
    const slides = slider.querySelectorAll('.projects__slide');
    const prevBtn = slider.parentElement.querySelector('#prevButton');
    const nextBtn = slider.parentElement.querySelector('#nextButton');

    if (!slider || slides.length === 0 || !prevBtn || !nextBtn) return;
    let currentIndex = 0;
    let visibleCount = 3;
    let gap = 32; // Default gap

    function updateVisibleCountAndGap() {
      const width = window.innerWidth;
      if (width < 540) {
        visibleCount = 1;
        gap = 8;
      } else if (width < 768) {
        visibleCount = 2;
      } else if (width < 1200) {
        gap = 16;
      } else {
        visibleCount = 3;
        gap = 32;
      }
    }

    function updateSlider() {
      updateVisibleCountAndGap();  

      const slideOuterWidth = slides[0].offsetWidth + gap;
      const maxIndex = slides.length - visibleCount;

      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > maxIndex) currentIndex = maxIndex;

      slider.style.transform = `translateX(-${currentIndex * slideOuterWidth}px)`;

      slides.forEach(s => {
        s.style.flexBasis = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;
        s.style.marginRight = `${gap}px`; 
      });
      const lastVisibleSlideInGroup = Array.from(slides)[currentIndex + visibleCount - 1];
      if (lastVisibleSlideInGroup) {
        lastVisibleSlideInGroup.style.marginRight = '0px';
      }
    }

    nextBtn.addEventListener('click', () => {
      currentIndex += 1;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex -= 1;
      updateSlider();
    });

    slides.forEach((slide) => {
      slide.addEventListener("mouseenter", () => {
        if (visibleCount === 1) return;  

        const groupStart = currentIndex;
        const groupSlides = Array.from(slides).slice(groupStart, groupStart + visibleCount);

        let hoveredSlideGrowthPercentage = 0;  
        if (visibleCount === 2) {
          hoveredSlideGrowthPercentage = 25;  
        } else if (visibleCount === 3) {
          hoveredSlideGrowthPercentage = 25; 
        }

        const baseFlexBasisCalc = `calc((100% - ${gap * (visibleCount - 1)}px) / ${visibleCount})`;

        const hoveredFlexBasisCalc = `calc(${baseFlexBasisCalc} + ${hoveredSlideGrowthPercentage}%)`;

        const nonHoveredFlexBasisCalc = `calc(${baseFlexBasisCalc} - ${hoveredSlideGrowthPercentage / (visibleCount - 1)}%)`;


        groupSlides.forEach(s => {
          if (s === slide) {
            s.style.flexBasis = hoveredFlexBasisCalc;
          } else {
            s.style.flexBasis = nonHoveredFlexBasisCalc;
          }
        });
      });

      slide.addEventListener("mouseleave", () => {
        updateSlider();
      });
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();  
  });
});