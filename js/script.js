// js/script.js
// Final and complete version

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
      showModal('Error', 'You must accept the terms and conditions to proceed.');
      isValid = false;
    }

    if (!isValid) return;

    document.cookie = `contactName=${name}; path=/`;
    document.cookie = `contactEmail=${email}; path=/`;
    document.cookie = `contactPhone=${phone}; path=/`;
    
    showModal('Message Sent!', 'Thank you for contacting us. We will get back to you shortly.');

    $(this).trigger('reset');
  });

  // Reusable function to show the modal with custom content
  const modal = $('#confirmation-modal');
  const modalTitle = $('#modal-title');
  const modalMessage = $('#modal-message');

  function showModal(title, message) {
    modalTitle.text(title);
    modalMessage.text(message);
    modal.addClass('show');
  }
  
  // Code to handle closing the confirmation modal
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
  
  // NEW: Cookie Consent Pop-up Logic
  const cookieModal = $('#cookie-consent-modal');
  const acceptBtn = $('#accept-cookies-btn');

  // Check if the cookie exists
  function checkCookie() {
    return document.cookie.split(';').some((item) => item.trim().startsWith('cookieAccepted='));
  }

  // Show the modal if the cookie is not set
  if (cookieModal.length && !checkCookie()) {
    cookieModal.addClass('show');
  }

  // Set the cookie and hide the modal on click
  acceptBtn.on('click', function() {
    // Set a cookie that expires in 1 year
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    document.cookie = `cookieAccepted=true; expires=${d.toUTCString()}; path=/`;
    cookieModal.removeClass('show');
  });
// NEW: Login form validation and redirection
  const loginForm = $("#loginForm");
  const errorMsg = $("#errorMsg");

  if (loginForm.length) { // Check if the login form exists on the page
    loginForm.on("submit", function(e) {
      e.preventDefault();
      
      const name = $("#name").val().trim();
      const studentNumber = $("#studentNumber").val().trim();
      const password = $("#password").val().trim();

      errorMsg.text('').hide(); // Clear and hide any previous error messages

      if (name === "") {
        errorMsg.text("Please enter your name.").show();
        return;
      }
      if (!/^\d{8}$/.test(studentNumber)) {
        errorMsg.text("Student number must be exactly 8 digits (numbers only).").show();
        return;
      }
      if (password === "") {
        errorMsg.text("Please enter your password.").show();
        return;
      }

      // Action on successful login
      modalTitle.text('Success!');
      modalMessage.html('You are successfully logged in.<br><br>Click the button below to continue to the resources page.');
      modalCloseBtn.text('Go to Resources').off('click').on('click', function() {
          window.location.href = "Resources.html";
      });
      modal.addClass('show');
    });
  }
// NEW: Handle "Register" button clicks for the events page
  $('.register-btn').on('click', function() {
    // Get the title of the event from the h3 tag inside the same card
    const eventTitle = $(this).closest('.event-card').find('h3').text();
    showModal('Registration Confirmed', You have successfully registered for the "${eventTitle}" event.);
  });
});
