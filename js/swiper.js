/* swiper slide products */

// Swiper for main slider
var swiper = new Swiper(".slide-swp", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullests: true,
    clickable: true,
  },
  autoplay: {
    delay: 2500,
  },
  loop: true,
});

// Swiper for products
var swiperProducts = new Swiper(".slide_product", {
  slidesPerView: 2,
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  watchOverflow: true,
  breakpoints: {
    1200: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1000: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    700: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  },
});
