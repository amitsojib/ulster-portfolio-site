// js/script.js

// Ensure the code runs after the DOM is ready
$(document).ready(function() {

  // Hamburger menu toggle using jQuery
  $('#nav-toggle').on('click', function() {
    $('#nav-links').toggleClass('active');
  });

  // Slideshow functionality
  let slideIndex = 0;
  const slides = $('.slides');

  function showSlides() {
    if (slides.length > 0) {
      slides.removeClass('active');
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides.eq(slideIndex - 1).addClass('active');
      setTimeout(showSlides, 4000);
    }
  }
  showSlides();

  // Search form submission handler
  const searchForm = $('#searchForm');
  const searchInput = $('#searchInput');

  searchForm.on('submit', function(e) {
    e.preventDefault();
    const query = searchInput.val().trim();
    if (query === '') {
      alert('Please enter a search term.');
      return;
    }
    console.log('Search query:', query);
    searchInput.val('');
  });

  // Contact form validation and cookie storage (for the contact page)
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    $('input, textarea').removeClass('error');

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    // NEW: Get phone number value
    const phone = $('#phone').val().trim();
    const message = $('#message').val().trim();
    const termsChecked = $('#terms').is(':checked');

    if (name === '') {
      $('#name').addClass('error');
      isValid = false;
    }
    if (email === '') {
      $('#email').addClass('error');
      isValid = false;
    }
    // NEW: Validate phone number field
    if (phone === '') {
      $('#phone').addClass('error');
      isValid = false;
    }
    if (message === '') {
      $('#message').addClass('error');
      isValid = false;
    }
    if (!termsChecked) {
      alert('You must accept the terms and conditions.');
      isValid = false;
    }

    if (!isValid) return;

    // Store in cookies
    document.cookie = `contactName=${name}; path=/`;
    document.cookie = `contactEmail=${email}; path=/`;
    // NEW: Store phone number in a cookie
    document.cookie = `contactPhone=${phone}; path=/`;

    alert('Message sent successfully!');
    $(this).trigger('reset');
  });
});