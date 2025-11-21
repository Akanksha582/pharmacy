let slideIndex = 0;
const slides = document.querySelectorAll(".slides");
const dots = document.querySelectorAll(".dot");

function showSlides() {
  // Hide all slides
  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));

  // Move to next slide
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  // Show current slide and activate dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");

  // Change slide every 3 seconds
  setTimeout(showSlides, 3000);
}

// Start slideshow
showSlides();