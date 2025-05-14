document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const body = document.body;
  
  // Menu toggle functionality
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('no-scroll');
    
    // Animate hamburger icon
    if (nav.classList.contains('active')) {
      this.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      this.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
  
  // Close menu when clicking on links
  document.querySelectorAll('.menu-navegacion a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('no-scroll');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
  
  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Lazy loading images with Intersection Observer
  const lazyLoadImages = () => {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy-load'));
    
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.add('lazy-loaded');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
      
      lazyImages.forEach(lazyImage => {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(lazyImage => {
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.add('lazy-loaded');
      });
    }
  };
  
  // Initialize lazy loading
  lazyLoadImages();
  
  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .service-card, .brand-item, .step, .benefits-list li, .section-title');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animated elements
  document.querySelectorAll('.card, .service-card, .brand-item, .step, .benefits-list li, .section-title').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on page load
  
  // Add hover effect to cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Form submission handling
  const contactForm = document.getElementById('presupuestoForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      this.classList.add('submitting');
      
      setTimeout(() => {
        this.classList.remove('submitting');
        this.classList.add('submitted');
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <p>Gracias por tu solicitud. Nos pondremos en contacto contigo pronto.</p>
        `;
        this.parentNode.insertBefore(successMessage, this.nextSibling);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          this.reset();
          successMessage.remove();
          this.classList.remove('submitted');
        }, 3000);
      }, 1500);
    });
  }
});