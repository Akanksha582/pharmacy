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