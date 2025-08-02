document.addEventListener('DOMContentLoaded', () => {
  // 1. Toggle navigation menu on small screens
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // 2. Slideshow banner autoplay
  let slideIndex = 0;
  const slides = document.getElementsByClassName("slides");

  function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
  }

  showSlides();

  // 3. Search bar functionality
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      // Option 1: Log to console (demo purposes)
      console.log("Searching for:", query);

      // Option 2 (optional): Redirect to a search results page
      // window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    } else {
      alert("Please enter a search term.");
    }
  });
});
