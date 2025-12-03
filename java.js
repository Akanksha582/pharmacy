let slideIndex = 0;
const slides = document.querySelectorAll(".slides");

function showSlides() {
  slides.forEach(slide => slide.style.display = "none");   // Hide all slides

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }  // Move to next slide

  slides[slideIndex - 1].style.display = "block"; // Show current slide 

  setTimeout(showSlides, 3000);   // Change slide every 3 seconds
}

showSlides();// Start slideshow

function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('open'); // Toggle the 'open' class to show/hide dropdown
}

function selectLocation(location) {
    document.querySelector('.dropbtn').textContent = location;
    document.querySelector('.dropdown').classList.remove('open');
    // Placeholder action: alert or redirect
    alert('Selected location: ' + location);
    // You can replace alert with actual logic, e.g., update a global variable or redirect
}