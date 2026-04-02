// R-SMART Website JavaScript - Awwwards Level Premium
// Modern Interactions & Animations

// ============================================
// Mobile Menu Toggle - Premium
// ============================================
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

if (mobileMenuToggle && navMenu) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileMenuToggle.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ============================================
// Premium Navbar Scroll Effect
// ============================================
const navbar = document.getElementById("navbar");
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar.style.transform = "translateY(-100%)";
    navbar.style.transition = "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});

// ============================================
// Premium Testimonials Carousel
// ============================================
class TestimonialsCarousel {
  constructor() {
    this.slides = document.querySelectorAll(".testimonial-slide");
    this.indicators = document.querySelectorAll(
      ".testimonial-indicators .indicator",
    );
    this.prevBtn = document.getElementById("testimonialPrev");
    this.nextBtn = document.getElementById("testimonialNext");
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 7000;

    if (this.slides.length === 0) return;

    this.init();
  }

  init() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    this.startAutoPlay();
  }

  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove("active");
    this.indicators[this.currentSlide].classList.remove("active");

    this.currentSlide = index;

    this.slides[this.currentSlide].classList.add("active");
    this.indicators[this.currentSlide].classList.add("active");

    this.resetAutoPlay();
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(next);
  }

  prevSlide() {
    const prev =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prev);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

// ============================================
// Premium Partners Carousel
// ============================================
class PartnersCarousel {
  constructor() {
    this.carousel = document.getElementById("partnersCarousel");
    if (!this.carousel) return;

    this.init();
  }

  init() {
    const slides = this.carousel.querySelectorAll(".partner-slide");
    slides.forEach((slide) => {
      const clone = slide.cloneNode(true);
      this.carousel.appendChild(clone);
    });

    this.carousel.addEventListener("mouseenter", () => {
      this.carousel.style.animationPlayState = "paused";
    });

    this.carousel.addEventListener("mouseleave", () => {
      this.carousel.style.animationPlayState = "running";
    });
  }
}

// ============================================
// Premium Smooth Scroll
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ============================================
// Premium AOS (Animate On Scroll)
// ============================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aos-animate");

      // Stagger effect for grid items
      if (
        entry.target.parentElement.classList.contains("features-grid") ||
        entry.target.parentElement.classList.contains("services-grid") ||
        entry.target.parentElement.classList.contains("values-grid")
      ) {
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
      }
    }
  });
}, observerOptions);

document.querySelectorAll("[data-aos]").forEach((el) => {
  observer.observe(el);
});

// ============================================
// Premium Counter Animation
// ============================================
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2500;
  const startTime = performance.now();

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out-expo)
    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(target * easeOutExpo);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(updateCounter);
};

const statNumbers = document.querySelectorAll(".stat-number");
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        entry.target.classList.add("animated");
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

statNumbers.forEach((stat) => {
  statsObserver.observe(stat);
});

// ============================================
// Premium Parallax Effects
// ============================================
let parallaxTicking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;

  // Hero shapes parallax
  const hero = document.querySelector(".hero-carousel, .hero");
  if (hero) {
    const shapes = hero.querySelectorAll(".shape");
    shapes.forEach((shape, index) => {
      const speed = 0.2 + index * 0.1;
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Section parallax
  document.querySelectorAll(".section-padding").forEach((section, index) => {
    if (index % 2 === 0) {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        const speed = 0.08;
        const yPos = (rect.top - window.innerHeight) * speed;
        section.style.transform = `translateY(${yPos}px)`;
      }
    }
  });

  parallaxTicking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!parallaxTicking) {
      window.requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  },
  { passive: true },
);

// ============================================
// Premium Contact Form
// ============================================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Gönderiliyor...";
      submitBtn.disabled = true;

      fetch('/api/send-mail', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
          if (result.success) {
              console.log('Email sent successfully:', result);
              showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
              contactForm.reset();
          } else {
              throw new Error('Server error');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          showNotification('Bir hata oluştu. Lütfen tekrar deneyin veya telefon ile bize ulaşın.', 'error');
      })
      .finally(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
      });
    });
}

// ============================================
// Premium Notification System
// ============================================
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, 4000);
}

// ============================================
// Premium Button Ripple Effect
// ============================================
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (this.type === "submit" || this.classList.contains("btn-loading")) {
      return;
    }

    if (this.href && this.href.includes("#")) {
      return;
    }

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    this.appendChild(ripple);

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    setTimeout(() => {
      ripple.remove();
    }, 700);
  });
});

// ============================================
// Premium Card Hover Effects
// ============================================
document
  .querySelectorAll(".feature-card, .service-card, .service-detail-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-20px) scale(1.03)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

// ============================================
// Premium Cursor Effect (Optional)
// ============================================
let cursor = null;
let cursorFollower = null;

function initCursor() {
  if (window.innerWidth > 768) {
    cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid #a855f7;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            display: none;
        `;

    cursorFollower = document.createElement("div");
    cursorFollower.className = "cursor-follower";
    cursorFollower.style.cssText = `
            width: 8px;
            height: 8px;
            background: #a855f7;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.15s ease;
            display: none;
        `;

    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);

    document.addEventListener("mousemove", (e) => {
      cursor.style.display = "block";
      cursorFollower.style.display = "block";
      cursor.style.left = e.clientX - 10 + "px";
      cursor.style.top = e.clientY - 10 + "px";
      cursorFollower.style.left = e.clientX - 4 + "px";
      cursorFollower.style.top = e.clientY - 4 + "px";
    });

    document.querySelectorAll("a, button, .btn").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.5)";
        cursorFollower.style.transform = "scale(1.5)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursorFollower.style.transform = "scale(1)";
      });
    });
  }
}

// ============================================
// Premium Lazy Loading
// ============================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: "50px",
    },
  );

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ============================================
// Premium Page Load Animation
// ============================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animate hero content
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "0";
    heroContent.style.transform = "translateY(30px)";
    setTimeout(() => {
      heroContent.style.transition = "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 300);
  }
});

// ============================================
// Animated Particles Canvas
// ============================================
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 80;
    this.connectionDistance = 150;
    this.mouse = { x: null, y: null, radius: 200 };

    this.resize();
    this.init();
    this.animate();

    window.addEventListener("resize", () => this.resize());
    window.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  init() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    this.particles.forEach((particle, i) => {
      // Move particle
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // Mouse interaction
      if (this.mouse.x && this.mouse.y) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          particle.vx -= Math.cos(angle) * force * 0.2;
          particle.vy -= Math.sin(angle) * force * 0.2;
        }
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "rgba(139, 49, 232, 0.6)";
      this.ctx.fill();

      // Draw connections
      this.particles.slice(i + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(233, 30, 140, ${1 - distance / this.connectionDistance})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// Bento Grid Counter Animation
// ============================================
const animateBentoCounter = (element) => {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const startTime = performance.now();

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(target * easeOutExpo);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(updateCounter);
};

const bentoStatNumbers = document.querySelectorAll(".bento-stat-number");
const bentoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        entry.target.classList.add("animated");
        animateBentoCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

bentoStatNumbers.forEach((stat) => {
  bentoObserver.observe(stat);
});

// ============================================
// Initialize All Components
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Testimonials and Partners removed - not needed anymore
  initCursor();

  // Initialize particle system
  new ParticleSystem("particleCanvas");

  // Add active class to current page - Improved with hash support
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const currentHash = window.location.hash;
  const navLinks = document.querySelectorAll(".nav-menu a:not(.btn-nav-demo)");

  // Normalize current page name
  const normalizedCurrentPage = currentPage === "" ? "index.html" : currentPage;

  // Remove all active classes first
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Find and activate the correct link
  let activeLinkFound = false;

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    const linkPage = linkHref.split("#")[0];
    const linkHash = linkHref.includes("#") ? linkHref.split("#")[1] : null;

    // Normalize link page name
    const normalizedLinkPage = linkPage === "" ? "index.html" : linkPage;

    // Check if link matches current page
    const pageMatches = normalizedLinkPage === normalizedCurrentPage;

    if (pageMatches) {
      // If there's a hash in the URL
      if (currentHash) {
        // Link with matching hash should be active
        if (linkHash && currentHash === "#" + linkHash) {
          link.classList.add("active");
          activeLinkFound = true;
        }
      }
      // If no hash in URL
      else {
        // Only activate link without hash (main page link)
        if (!linkHash && !activeLinkFound) {
          link.classList.add("active");
          activeLinkFound = true;
        }
      }
    }
  });

  // Special handling for services.html - if no hash, Platform should be active
  if (
    normalizedCurrentPage === "services.html" &&
    !currentHash &&
    !activeLinkFound
  ) {
    const platformLink = Array.from(navLinks).find((link) => {
      const href = link.getAttribute("href");
      return (
        href === "services.html" || href.startsWith("services.html#") === false
      );
    });
    if (platformLink && !platformLink.getAttribute("href").includes("#")) {
      platformLink.classList.add("active");
    }
  }

  // Handle btn-nav-demo active state separately
  const demoBtn = document.querySelector(".btn-nav-demo");
  if (demoBtn) {
    demoBtn.classList.remove("active");
    if (normalizedCurrentPage === "contact.html") {
      demoBtn.classList.add("active");
    }
  }
});

// ============================================
// Enhanced Form Validation
// ============================================
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phone));
}

function showFieldError(field, message) {
  const formGroup = field.closest(".form-group");
  let errorDiv = formGroup.querySelector(".field-error");

  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.style.cssText =
      "color: var(--error); font-size: 0.875rem; margin-top: 0.5rem;";
    formGroup.appendChild(errorDiv);
  }

  errorDiv.textContent = message;
  field.style.borderColor = "var(--error)";
  field.setAttribute("aria-invalid", "true");
}

function clearFieldError(field) {
  const formGroup = field.closest(".form-group");
  const errorDiv = formGroup.querySelector(".field-error");

  if (errorDiv) {
    errorDiv.remove();
  }

  field.style.borderColor = "";
  field.removeAttribute("aria-invalid");
}

// Real-time form validation
if (contactForm) {
  const emailField = contactForm.querySelector("#email");
  const phoneField = contactForm.querySelector("#phone");
  const nameField = contactForm.querySelector("#name");
  const subjectField = contactForm.querySelector("#subject");
  const messageField = contactForm.querySelector("#message");

  if (emailField) {
    emailField.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        showFieldError(this, "Lütfen geçerli bir e-posta adresi girin");
      } else {
        clearFieldError(this);
      }
    });

    emailField.addEventListener("input", function () {
      if (this.value && validateEmail(this.value)) {
        clearFieldError(this);
      }
    });
  }

  if (phoneField) {
    phoneField.addEventListener("blur", function () {
      if (this.value && !validatePhone(this.value)) {
        showFieldError(this, "Lütfen geçerli bir telefon numarası girin");
      } else {
        clearFieldError(this);
      }
    });

    phoneField.addEventListener("input", function () {
      if (this.value && validatePhone(this.value)) {
        clearFieldError(this);
      }
    });
  }

  [nameField, subjectField, messageField].forEach((field) => {
    if (field) {
      field.addEventListener("input", function () {
        clearFieldError(this);
      });
    }
  });
}

// ============================================
// Enhanced Scroll Animations
// ============================================
const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");

if (animateOnScrollElements.length > 0) {
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  animateOnScrollElements.forEach((el) => {
    scrollObserver.observe(el);
  });
}

// ============================================
// Performance Monitoring
// ============================================
if ("PerformanceObserver" in window) {
  try {
    const perfObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(
            `Long Task: ${entry.name} took ${entry.duration.toFixed(2)}ms`,
          );
        }
      }
    });
    perfObserver.observe({ entryTypes: ["longtask", "measure"] });
  } catch (e) {
    // Silent fail for browsers without support
  }
}

// ============================================
// Service Worker Registration (PWA Ready)
// ============================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Service worker can be added later for PWA functionality
    console.log("Service Worker ready for registration");
  });
}

// ============================================
// Image Lazy Loading Fallback
// ============================================
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => {
    img.src = img.dataset.src;
    img.removeAttribute("data-src");
  });
}

// ============================================
// Network Status Indicator
// ============================================
function updateOnlineStatus() {
  const isOnline = navigator.onLine;

  if (!isOnline) {
    showNotification(
      "İnternet bağlantısı kesildi. Bazı özellikler çalışmayabilir.",
      "warning",
    );
  }
}

window.addEventListener("online", () => {
  showNotification("İnternet bağlantısı yeniden kuruldu", "success");
});

window.addEventListener("offline", updateOnlineStatus);

// ============================================
// Enhanced Accessibility - Keyboard Navigation
// ============================================
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // Tab trap for mobile menu when open
  if (e.key === "Tab" && navMenu && navMenu.classList.contains("active")) {
    const focusableElements = navMenu.querySelectorAll(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  }
});

// ============================================
// Detect if user prefers reduced motion
// ============================================
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (prefersReducedMotion.matches) {
  console.log("Reduced motion mode activated");
  document.documentElement.style.setProperty("--transition-fast", "all 0.01s");
  document.documentElement.style.setProperty("--transition", "all 0.01s");
  document.documentElement.style.setProperty("--transition-slow", "all 0.01s");
}

// ============================================
// Enhanced Console Message
// ============================================
console.log(
  "%cR-SMART",
  "color: #8b31e8; font-size: 32px; font-weight: 900; text-shadow: 2px 2px 4px rgba(139, 49, 232, 0.3);",
);
console.log(
  "%cKurumsal Strateji ve Performans Yönetimi Platformu",
  "color: #4b5563; font-size: 16px; font-weight: 600; margin-top: 8px;",
);
console.log(
  "%cAwwwards Level Premium Design ✨",
  "color: #e91e8c; font-size: 14px; font-style: italic; font-weight: 500;",
);
console.log(
  "%c\n🚀 Website Performance Optimized\n💎 Logo-Aligned Color Palette\n📱 Fully Responsive Design\n♿ WCAG 2.1 AA Compliant\n\n",
  "color: #10b981; font-size: 12px; line-height: 1.6;",
);
