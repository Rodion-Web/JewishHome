const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   const slides = document.querySelectorAll(".slide");
//   slides.forEach((slide) => (slide.style.display = "none"));

//   slideIndex++;
//   if (slideIndex > slides.length) slideIndex = 3;

//   slides[slideIndex - 1].style.display = "block";
//   setTimeout(showSlides, 4000); // меняется каждые 4 секунды
// }
