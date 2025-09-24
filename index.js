"use strict"
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functions
  initNavbarScroll();
  initSmoothScroll();
  initScrollToTop();
  initServicesTabs();
  initCounter();
  initContactTabs();
  initFormSubmissions();
  initFormValidation();
  initCharacterCounters();
  initServicesSlideshow();
  initWhyChooseCounters();
});

/* SPLASH SCREEN */
window.addEventListener("load", () => {
  // Set cursor to wait for the entire page during splash
  document.body.style.cursor = 'wait';
  
  setTimeout(() => {
    const splash = document.getElementById('splash');
    splash.style.animation = "fadeOut 1s forwards";
    
    // Immediately restore default cursor 
    document.body.style.cursor = 'default';
    
    setTimeout(() => {
      splash.style.display = "none";
    }, 1000);
  }, 1000);
});

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

// Services Slideshow 
function initServicesSlideshow() {
  const slides = document.querySelectorAll('.service-slide');
  const prevBtn = document.getElementById('prevService');
  const nextBtn = document.getElementById('nextService');
  const indicators = document.querySelectorAll('.slideshow-indicators .indicator');
  const toggleAutoplayBtn = document.getElementById('toggleAutoplay');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let isPlaying = true; // Set to true for auto-start
  let slideshowInterval;
  const slideDuration = 5000; // 5 seconds per slide
  
  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Ensure index is within bounds (loop around)
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }
    
    // Add active class to current slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }
  
  // Next slide function
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  // Previous slide function
  function prevSlide() {
    showSlide(currentSlide - 1);
  }
  
  // Auto-play function
  function startSlideshow() {
    if (isPlaying && !slideshowInterval) {
      slideshowInterval = setInterval(nextSlide, slideDuration);
    }
  }
  
  function stopSlideshow() {
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
    }
  }
  
  function toggleAutoplay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startSlideshow();
    } else {
      stopSlideshow();
    }
    updateAutoplayButton(); 
  }
  
  function updateAutoplayButton() {
    if (toggleAutoplayBtn) {
      if (isPlaying) {
        toggleAutoplayBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        toggleAutoplayBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    }
  }
  
  // Event listeners for navigation controls
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      // Restart autoplay timer if playing
      if (isPlaying) {
        stopSlideshow();
        startSlideshow();
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      // Restart autoplay timer if playing
      if (isPlaying) {
        stopSlideshow();
        startSlideshow();
      }
    });
  }
  
  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      // Restart autoplay timer if playing
      if (isPlaying) {
        stopSlideshow();
        startSlideshow();
      }
    });
  });
  
  // Event listener for autoplay toggle
  if (toggleAutoplayBtn) {
    toggleAutoplayBtn.addEventListener('click', toggleAutoplay);
  }
  
  // Pause slideshow on hover
  const servicesSection = document.getElementById('services');
  if (servicesSection) {
    servicesSection.addEventListener('mouseenter', () => {
      if (isPlaying) {
        stopSlideshow();
      }
    });
    
    servicesSection.addEventListener('mouseleave', () => {
      if (isPlaying) {
        startSlideshow();
      }
    });
  }
  
  showSlide(0);
  updateAutoplayButton(); 
  startSlideshow(); 
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

// Contact tab functionality
function initContactTabs() {
  const contactTabButtons = document.querySelectorAll('#contact .btn-group .btn');
  const tabPanes = document.querySelectorAll('#contact .tab-pane');
  
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
      
      // Show the corresponding tab content
      const targetId = this.getAttribute('data-bs-target');
      const targetPane = document.querySelector(targetId);
      
      if (targetPane) {
        // Hide all panes
        tabPanes.forEach(pane => {
          pane.classList.remove('show', 'active');
        });
        
        // Show the target pane
        targetPane.classList.add('show', 'active');
      }
    });
  });
  
  // Initialize the first button as active
  const activeContactTab = document.querySelector('#contact .btn-group .btn.active');
  if (!activeContactTab && contactTabButtons.length > 0) {
    contactTabButtons[0].classList.remove('btn-outline-primary');
    contactTabButtons[0].classList.add('active', 'btn-primary');
  }
}

// Initialize form validation
function initFormValidation() {
  // Add event listeners to validate fields on input
  const textInputs = document.querySelectorAll('#contact input[type="text"]');
  textInputs.forEach(input => {
    if (input.id.includes('name') || input.id.includes('firstname') || input.id.includes('lastname')) {
      input.addEventListener('input', function() {
        // Capitalize first letter
        if (this.value.length === 1) {
          this.value = this.value.toUpperCase();
        }
        validateField(this);
      });
    } else {
      input.addEventListener('input', function() {
        validateField(this);
      });
    }
  });
  
  const emailInputs = document.querySelectorAll('#contact input[type="email"]');
  emailInputs.forEach(input => {
    input.addEventListener('input', function() {
      validateField(this);
    });
  });
  
  const phoneInputs = document.querySelectorAll('#contact input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
      validateField(this);
    });
  });
  
  const textareas = document.querySelectorAll('#contact textarea');
  textareas.forEach(textarea => {
    textarea.addEventListener('input', function() {
      validateField(this);
    });
  });
  
  const selects = document.querySelectorAll('#contact select');
  selects.forEach(select => {
    select.addEventListener('change', function() {
      validateField(this);
    });
  });
}

// Initialize character counters
function initCharacterCounters() {
  const messageContent = document.getElementById('message-content');
  const bookingInstructions = document.getElementById('booking-instructions');
  
  if (messageContent) {
    messageContent.addEventListener('input', function() {
      const charCountElement = document.getElementById('message-chars');
      if (charCountElement) {
        charCountElement.textContent = this.value.length;
      }
    });
  }
  
  if (bookingInstructions) {
    bookingInstructions.addEventListener('input', function() {
      const charCountElement = document.getElementById('booking-chars');
      if (charCountElement) {
        charCountElement.textContent = this.value.length;
      }
    });
  }
}

// Form submission handlers
function initFormSubmissions() {
  const messageForm = document.getElementById('messageForm');
  const bookingForm = document.getElementById('bookingForm');
  
  if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(this)) {
        submitForm('message', collectFormData(this));
      }
    });
  }
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(this)) {
        submitForm('booking', collectFormData(this));
      }
    });
  }
}

// Validate a single field
function validateField(field) {
  // Clear previous validation states
  field.classList.remove('is-invalid', 'is-valid');
  
  // Special validation for name fields
  if ((field.id.includes('name') || field.id.includes('firstname') || field.id.includes('lastname')) && field.value) {
    const isValidName = /^[A-Z][a-zA-Z]*$/.test(field.value);
    if (!isValidName) {
      field.classList.add('is-invalid');
      return false;
    }
  }
  
  // Special validation for phone fields
  if (field.type === 'tel' && field.value && !field.value.startsWith('+27')) {
    field.classList.add('is-invalid');
    return false;
  }
  
  // Standard HTML5 validation
  if (field.checkValidity()) {
    field.classList.add('is-valid');
    return true;
  } else {
    field.classList.add('is-invalid');
    return false;
  }
}

// Validate entire form
function validateForm(form) {
  let isValid = true;
  
  // Validate all required fields
  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  // Validate pattern fields (even if not required)
  const patternFields = form.querySelectorAll('[pattern]');
  patternFields.forEach(field => {
    if (field.value && !validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// Collect form data
function collectFormData(form) {
  const formData = {};
  const formElements = form.elements;
  
  for (let i = 0; i < formElements.length; i++) {
    const element = formElements[i];
    if (element.name && element.value) {
      formData[element.id] = element.value;
    }
  }
  
  // Add form type
  formData.formType = form.id.replace('Form', '');
  
  return formData;
}

// Submit form via AJAX
function submitForm(formType, formData) {
  // Show loading state
  const submitButton = document.querySelector(`#${formType}Form button[type="submit"]`);
  const originalText = submitButton.innerHTML;
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
  submitButton.disabled = true;
  
  //(simulated)
  const endpoint = 'https://jsonplaceholder.typicode.com/posts'; 
  
  // Prepare the data for submission
  const submissionData = {
    title: `${formType} form submission`,
    body: JSON.stringify(formData),
    userId: 1
  };
  
  // Make AJAX request
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(submissionData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
   
    showResponse('success', `Your ${formType === 'message' ? 'message has been sent' : 'errand has been booked'}. We will contact you shortly!`);
    
    // Reset the form
    document.getElementById(`${formType}Form`).reset();
    
    // Reset character counters
    if (formType === 'message') {
      const charCountElement = document.getElementById('message-chars');
      if (charCountElement) charCountElement.textContent = '0';
    } else {
      const charCountElement = document.getElementById('booking-chars');
      if (charCountElement) charCountElement.textContent = '0';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showResponse('error', 'There was an error processing your request. Please try again later.');
  })
  .finally(() => {
    // Restore button state
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;
  });
}

// Show response message
function showResponse(type, message) {
  // Create response elements if they don't exist
  let responseAlert = document.getElementById('responseAlert');
  let errorAlert = document.getElementById('errorAlert');
  
  if (!responseAlert) {
    responseAlert = document.createElement('div');
    responseAlert.id = 'responseAlert';
    responseAlert.className = 'alert alert-success mt-3';
    responseAlert.style.display = 'none';
    responseAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i><span id="responseMessage"></span>';
    document.querySelector('#contact .container').appendChild(responseAlert);
  }
  
  if (!errorAlert) {
    errorAlert = document.createElement('div');
    errorAlert.id = 'errorAlert';
    errorAlert.className = 'alert alert-danger mt-3';
    errorAlert.style.display = 'none';
    errorAlert.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i><span id="errorMessage"></span>';
    document.querySelector('#contact .container').appendChild(errorAlert);
  }
  
  if (type === 'success') {
    document.getElementById('responseMessage').textContent = message;
    responseAlert.style.display = 'block';
    errorAlert.style.display = 'none';
  } else {
    document.getElementById('errorMessage').textContent = message;
    errorAlert.style.display = 'block';
    responseAlert.style.display = 'none';
  }
  
  // Hide alerts after 5 seconds
  setTimeout(() => {
    responseAlert.style.display = 'none';
    errorAlert.style.display = 'none';
  }, 5000);
}

// Fade-in animation for elements
function initFadeInAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

function initWhyChooseCounters() {
  const counters = document.querySelectorAll('.why-choose-us .counter');
  const speed = 200;
  
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
            // Add symbols if needed
            if (counter.getAttribute('data-target-plus') === 'true') {
              counter.innerText += '+';
            }
            if(counter.getAttribute('data-target-percent') === 'true'){
              counter.innerText += '%';
            }
          }
        };
        
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    // Set up data attributes
    counter.setAttribute('data-target-plus', 'false');
    counter.setAttribute('data-target-percent', 'false');
    
    counter.innerText = '0';
    observer.observe(counter);
  });
}