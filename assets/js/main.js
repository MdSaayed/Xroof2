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
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-start][data-end]');

  const animateCounter = (el) => {
    const start = parseFloat(el.dataset.start) || 0;
    const end = parseFloat(el.dataset.end) || 0;
    const duration = parseFloat(el.dataset.duration) || 2000; // ms
    const format = el.dataset.format || 'k'; // default to k
    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1); // 0 → 1
      const value = start + (end - start) * progress;

      // Determine display based on format
      if (format === 'k') {
        el.innerText = (value / 1000).toFixed(1) + 'k';
      } else if (format === 'full') {
        el.innerText = Math.round(value);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure exact final value
        if (format === 'k') {
          el.innerText = (end / 1000).toFixed(1) + 'k';
        } else if (format === 'full') {
          el.innerText = Math.round(end);
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
