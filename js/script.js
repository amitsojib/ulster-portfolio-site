// Select hamburger menu button and navigation links
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle navigation menu visibility on hamburger click
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Setup slideshow variables
let slideIndex = 0;
const slides = document.querySelectorAll('.slides');

function showSlides() {
  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Move to next slide index
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  // Show current slide
  slides[slideIndex - 1].classList.add('active');

  // Change slide every 4 seconds
  setTimeout(showSlides, 4000);
}

// Start slideshow
showSlides();

// Select search form and input
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Handle search form submission
searchForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page reload

  const query = searchInput.value.trim();
  if (query === '') {
    alert('Please enter a search term.');
    return;
  }

  // Placeholder for search processing or redirection
  console.log('Search query:', query);

  // Clear input after submission
  searchInput.value = '';
});
$(document).ready(function () {
  // Optional: if you add hamburger toggle later
  $('#nav-toggle').on('click', function () {
    $('#nav-links').toggleClass('active');
  });

  // Contact form submission
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    if (!$('#terms').is(':checked')) {
      alert('You must accept the terms and conditions.');
      return;
    }

    const name = $('#name').val();
    const email = $('#email').val();
    const message = $('#message').val();

    // Store data in a cookie
    document.cookie = `contactName=${name}; path=/`;
    document.cookie = `contactEmail=${email}; path=/`;

    alert('Message sent successfully!');

    // Clear the form
    $(this).trigger('reset');
  });

  // Optional: Cookie retrieval logic
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
});
$(document).ready(function() {
  $('#nav-toggle').click(function() {
    $('#nav-links').toggleClass('active');
  });
});
$('#nav-toggle').on('click', function () {
  $('#nav-links').toggleClass('active');
});
