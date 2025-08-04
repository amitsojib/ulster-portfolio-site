// js/script.js

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
    const phone = $('#phone').val().trim();
    const message = $('#message').val().trim();
    const termsChecked = $('#terms').is(':checked');

    // Validation checks
    if (name === '') {
      $('#name').addClass('error');
      isValid = false;
    }
    if (email === '') {
      $('#email').addClass('error');
      isValid = false;
    }
    if (phone === '') {
      $('#phone').addClass('error');
      isValid = false;
    }
    if (message === '') {
      $('#message').addClass('error');
      isValid = false;
    }
    if (!termsChecked) {
      // NEW: Show modal for terms and conditions error
      showModal('Error', 'You must accept the terms and conditions to proceed.');
      isValid = false;
    }

    if (!isValid) return;

    // If validation passes, store cookies and show success modal
    document.cookie = `contactName=${name}; path=/`;
    document.cookie = `contactEmail=${email}; path=/`;
    document.cookie = `contactPhone=${phone}; path=/`;
    
    // NEW: Show modal for success message
    showModal('Message Sent!', 'Thank you for contacting us. We will get back to you shortly.');

    // Clear the form after a successful submission
    $(this).trigger('reset');
  });

  // NEW: Reusable function to show the modal with custom content
  const modal = $('#confirmation-modal');
  const modalTitle = $('#modal-title');
  const modalMessage = $('#modal-message');

  function showModal(title, message) {
    modalTitle.text(title);
    modalMessage.text(message);
    modal.addClass('show');
  }
  
  // Code to handle closing the modal (remains the same)
  const closeButton = $('.close-button');
  const modalCloseBtn = $('.modal-close-btn');

  function closeModal() {
    modal.removeClass('show');
  }

  closeButton.on('click', closeModal);
  modalCloseBtn.on('click', closeModal);

  $(window).on('click', function(event) {
    if ($(event.target).is(modal)) {
      closeModal();
    }
  });

});