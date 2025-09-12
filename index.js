document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functions
  initNavbarScroll();
  initSmoothScroll();
  initScrollToTop();
  initServicesTabs();
  initCounter();
  initContactTabs();
  initBootstrapTabs(); // Add this for Bootstrap tab functionality
});

/* SPLASH SCREEN */
  window.addEventListener("load", () => {
    // Set cursor to wait for the entire page during splash
    document.body.style.cursor = 'wait';
    
    setTimeout(() => {
      const splash = document.getElementById('splash');
      splash.style.animation = "fadeOut 1s forwards";
      
      // Immediately restore default cursor when splash starts fading
      document.body.style.cursor = 'default';
      
      setTimeout(() => {
        splash.style.display = "none";
      }, 1000);
    }, 1000);
  });

// Initialize Bootstrap tabs
function initBootstrapTabs() {
  const triggerTabList = [].slice.call(document.querySelectorAll('#contact button[data-bs-toggle="tab"]'));
  triggerTabList.forEach(function (triggerEl) {
    new bootstrap.Tab(triggerEl);
  });
}

// Navbar Scroll Effect
function initNavbarScroll() {
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  });
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Services Tab functionality
function initServicesTabs() {
  const tabButtons = document.querySelectorAll('#services .tab-button');
  const contentSections = document.querySelectorAll('#services .content-section');
  
  if (tabButtons.length === 0) return;
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and sections
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
      });
      
      contentSections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      button.classList.remove('btn-outline-primary');
      button.classList.add('btn-primary');
      
      // Show corresponding content section
      const tabId = button.getAttribute('data-tab');
      const targetSection = document.getElementById(tabId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });
  
  // Activate the first tab by default if none is active
  const activeTabs = document.querySelectorAll('#services .tab-button.active');
  if (activeTabs.length === 0 && tabButtons.length > 0) {
    tabButtons[0].click();
  }
}

// Counter animation - Fixed version
function initCounter() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // The lower the slower
  
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / speed;
        
        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target;
            // Add the plus sign if the original text had it
            if (counter.getAttribute('data-target-plus') === 'true') {
              counter.innerText += '+';
            }
            if(counter.getAttribute('data-target-percent') === 'true'){
              counter.innerText += '%'
            }
          }
        };
        
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    // Check if the original text had a plus sign
    if (counter.innerText.includes('+')) {
      counter.setAttribute('data-target-plus', 'true');
    } else {
      counter.setAttribute('data-target-plus', 'false');
    }
    if(counter.innerText.includes('%')){
      counter.setAttribute('data-target-percent','true');
    }else{
      counter.setAttribute('data-target-percent', 'false')
    }
    // Clear the text to start counting from 0
    counter.innerText = '0';
    observer.observe(counter);
  });
}

// Contact tab button styling
function initContactTabs() {
  const contactTabButtons = document.querySelectorAll('#contact .btn-group .btn');
  
  if (contactTabButtons.length === 0) return;
  
  contactTabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      contactTabButtons.forEach(btn => {
        btn.classList.remove('active', 'btn-primary');
        btn.classList.add('btn-outline-primary');
      });
      
      // Add active class to clicked button
      this.classList.remove('btn-outline-primary');
      this.classList.add('active', 'btn-primary');
    });
  });
  
  // Initialize the first button as active
  const activeContactTab = document.querySelector('#contact .btn-group .btn.active');
  if (!activeContactTab && contactTabButtons.length > 0) {
    contactTabButtons[0].classList.remove('btn-outline-primary');
    contactTabButtons[0].classList.add('active', 'btn-primary');
  }
}