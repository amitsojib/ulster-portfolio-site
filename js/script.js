// js/script.js

// Ensure the code runs after the DOM is ready
$(document).ready(function() {

  // Hamburger menu toggle using jQuery
  // This code will now work on all pages with the unified HTML structure
  $('#nav-toggle').on('click', function() {
    $('#nav-links').toggleClass('active');
  });

  // Slideshow functionality (from your original code)
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
    if (message === '') {
      $('#message').addClass('error');
      isValid = false;
    }
    if (!termsChecked) {
      alert('You must accept the terms and conditions.');
      isValid = false;
    }

    if (!isValid) return;

    document.cookie = `contactName=${name}; path=/`;
    document.cookie = `contactEmail=${email}; path=/`;

    alert('Message sent successfully!');
    $(this).trigger('reset');
  });
});