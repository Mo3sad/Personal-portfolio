// window.addEventListener("scroll", () => {
//   // Testimonials التوصيات
//   // if (statEx && scrollY >= statEx.offsetTop - 300 && !statExStarted) {
//   //   statExStarted = true;
//   //   startCounter(statEx, ".stat50", 50);
//   //   startCounter(statEx, ".stat8", 8);
//   //   startCounter(statEx, ".stat40", 40);
//   //   startCounter(statEx, ".stat12", 12);
//   // }

// });
// Testimonials التوصيات
// document.addEventListener("DOMContentLoaded", () => {
//   const track = document.getElementById("carouselTrack");
//   const nextBtn = document.getElementById("nextBtn");
//   const prevBtn = document.getElementById("prevBtn");
//   const dotsContainer = document.getElementById("carouselDots");

//   let currentPage = 0;

//   function getCardsPerPage() {
//     if (window.innerWidth <= 768) return 1;
//     return 3;
//   }

//   function createDots() {
//     dotsContainer.innerHTML = "";
//     const totalCards = track.children.length;
//     const cardsPerPage = getCardsPerPage();
//     const totalPages = Math.ceil(totalCards / cardsPerPage);

//     for (let i = 0; i < totalPages; i++) {
//       const dot = document.createElement("span");
//       dot.classList.add("carousel-dot");
//       if (i === currentPage) dot.classList.add("active");

//       dot.addEventListener("click", () => {
//         currentPage = i;
//         updateCarousel();
//       });

//       dotsContainer.appendChild(dot);
//     }
//   }

//   function updateCarousel() {
//     const cardsPerPage = getCardsPerPage();
//     const card = track.querySelector(".carousel-card");
//     const gap = 20;
//     const cardWidth = card.getBoundingClientRect().width + gap;

//     const shiftAmount = currentPage * cardsPerPage * cardWidth;
//     track.style.transform = `translateX(-${shiftAmount}px)`;

//     const dots = dotsContainer.querySelectorAll(".carousel-dot");
//     dots.forEach((dot, index) => {
//       dot.classList.toggle("active", index === currentPage);
//     });
//   }

//   nextBtn.addEventListener("click", () => {
//     const totalPages = Math.ceil(track.children.length / getCardsPerPage());
//     if (currentPage < totalPages - 1) {
//       currentPage++;
//       updateCarousel();
//     }
//   });

//   prevBtn.addEventListener("click", () => {
//     if (currentPage > 0) {
//       currentPage--;
//       updateCarousel();
//     }
//   });

//   window.addEventListener("resize", () => {
//     currentPage = 0;
//     createDots();
//     updateCarousel();
//   });

//   createDots();
//   updateCarousel();
// });
