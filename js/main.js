/* ==========================================
   DOULACARE.NET - MAIN JAVASCRIPT
   Mobile menu and interactive features
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const isExpanded = mainNav.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
      
      // Change icon (if using icon fonts or text)
      menuToggle.textContent = isExpanded ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.site-header')) {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      }
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
        menuToggle.focus();
      }
    });
  }
  
  // ==========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Ignore links that are just "#"
      if (href === '#') return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, href);
        
        // Focus on target for accessibility
        targetElement.focus();
      }
    });
  });
  
  // ==========================================
  // HIGHLIGHT ACTIVE NAVIGATION LINK
  // ==========================================
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-nav a');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
  
});
