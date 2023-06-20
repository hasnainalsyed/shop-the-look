// Initialize Swiper with vertical slider
var swiper = new Swiper('.main-swiper-container', {
  slidesPerView: 1, // Set the number of visible slides to 1
  spaceBetween: 10, // Adjust the spacing between slides
  // Configuration options for the main slider
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

function initInnerSwipers() {
  var innerSwiperContainers = document.querySelectorAll('.inner-swiper-container');

  innerSwiperContainers.forEach(function (innerSwiperContainer) {
    var innerSwiper = new Swiper(innerSwiperContainer, {
      direction: 'vertical',
      // other configuration options for the inner swiper
      spaceBetween: 10, // Adjust the spacing between slides
      slidesPerView: 1, // Set the number of visible slides to 1
      mousewheel: {
        enabled: true
      },
      on: {
        init: function () {
          handleSlideChange(innerSwiperContainer);
        },
        slideChange: function () {
          handleSlideChange(innerSwiperContainer);
        }
      }
    });

    var dotButtons = innerSwiperContainer.querySelectorAll('.btn-dot');

    dotButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        innerSwiper.slideTo(index);
      });
    });
  });
}

function handleSlideChange(innerSwiperContainer) {
  var activeIndex = innerSwiperContainer.swiper.activeIndex;
  var dotButtons = innerSwiperContainer.parentElement.parentElement.querySelectorAll('.btn-dot');

  dotButtons.forEach(function (button, index) {
    if (index === activeIndex) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

initInnerSwipers();
