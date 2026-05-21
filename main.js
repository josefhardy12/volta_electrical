// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const header = document.querySelector('.header');

  // Mobile menu toggle
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileNav && mobileNav.classList.contains('active')) {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Form submission handling
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Simple validation
      let isValid = true;
      const requiredFields = ['name', 'phone', 'email', 'message'];
      
      requiredFields.forEach(field => {
        const input = this.querySelector(`[name="${field}"]`);
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#dc3545';
        } else {
          input.style.borderColor = '#E9ECEF';
        }
      });
      
      if (isValid) {
        // Show success message (in production, this would submit to a server)
        alert('Thank you for your message! We will get back to you shortly.');
        this.reset();
      }
    });
  }

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add fade-in animation to cards and sections
  document.querySelectorAll('.service-card, .review-card, .feature, .promise-card, .timeline-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Gallery lightbox (simple implementation)
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      const caption = this.querySelector('.gallery-caption h4')?.textContent || '';
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close">&times;</button>
          <img src="${img.src}" alt="${img.alt}">
          <p class="lightbox-caption">${caption}</p>
        </div>
      `;
      
      // Add styles
      lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(13, 27, 42, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 2rem;
      `;
      
      const content = lightbox.querySelector('.lightbox-content');
      content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
      `;
      
      const closeBtn = lightbox.querySelector('.lightbox-close');
      closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
      `;
      
      const lightboxImg = lightbox.querySelector('img');
      lightboxImg.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 8px;
      `;
      
      const captionEl = lightbox.querySelector('.lightbox-caption');
      captionEl.style.cssText = `
        color: white;
        text-align: center;
        margin-top: 1rem;
        font-size: 1.125rem;
      `;
      
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Close lightbox
      const closeLightbox = () => {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
      };
      
      closeBtn.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
      
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeLightbox();
        }
      }, { once: true });
    });
  });
});
