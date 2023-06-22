let screenWidth = window.innerWidth || document.documentElement.clientWidth;
let innerSwipers = [];
let popupSwipers = [];
const popupSlides = document.querySelectorAll('.swiper-slide.popup');
const rows = document.querySelectorAll('.swiper-slide .row');
let cols = [];

// Initialize Swiper with vertical slider
let mainSwiper = new Swiper('.main-swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

function initInnerSwipers() {
  const innerSwiperContainers = document.querySelectorAll('.inner-swiper-container');

  innerSwiperContainers.forEach(function (innerSwiperContainer) {
    let innerSwiper = new Swiper(innerSwiperContainer, {
      direction: 'vertical',
      spaceBetween: 10,
      slidesPerView: 1,
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

    const dotButtons = innerSwiperContainer.parentElement.parentElement.querySelectorAll('.btn-dot');

    dotButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        innerSwiper.slideTo(index);
      });
    });
  });
}

function handleSlideChange(innerSwiperContainer) {
  const activeIndex = innerSwiperContainer.swiper.activeIndex;
  const dotButtons = innerSwiperContainer.parentElement.parentElement.querySelectorAll('.btn-dot');

  dotButtons.forEach(function (button, index) {
    if (index === activeIndex) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function initPopupSwipers() {
  const popupSwiperContainers = document.querySelectorAll('.popup-swiper-container');
  popupSwiperContainers.forEach(function (popupSwiperContainer) {
    let popupSwiper = new Swiper(popupSwiperContainer, {
      slidesPerView: 1,
      spaceBetween: 10,
      on: {
        init: function () {
          handlePopupSlideChange(popupSwiperContainer);
        },
        slideChange: function () {
          handlePopupSlideChange(popupSwiperContainer);
        }
      }
    });
  
    popupSwipers.push(popupSwiper);
  });
}

function handlePopupSlideChange(popupSwiperContainer) {
  const activeIndex = popupSwiperContainer.swiper.activeIndex;

  const mainSwiperSlides = document.querySelectorAll('.main-swiper-container > .swiper-wrapper > .swiper-slide');

  mainSwiperSlides.forEach(function (slide) {
    const dotButtons = slide.querySelectorAll('.btn-dot');
    dotButtons.forEach(function (button, index) {
      if (index === activeIndex) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  });
}

function openPopupBtns() {
  const mainSwiperSlides = document.querySelectorAll('.main-swiper-container > .swiper-wrapper > .swiper-slide');

  mainSwiperSlides.forEach(function (slide, index) {
    openPopup(slide, index);
  });
}

function openPopup(slide, index) {
  const popupSwipers = document.querySelectorAll('.swiper-slide.popup');
  console.log(popupSwipers);

  const dotButtons = slide.querySelectorAll('.btn-dot');
  dotButtons.forEach(function (button, btnIndex) {
    button.addEventListener('click', function () {
      popupSwipers.forEach(function (popupSwiper) {
        popupSwiper.classList.remove('visible');
      });
      for (let i = 0; i < popupSwipers.length; i++) {
        if (index === i) {
          popupSwipers[i].classList.add('visible');
        }
      }
      // Open the corresponding popup based on the index of the clicked button
    });
  });
}

function handleScreenSize(screenWidth) {
  if (screenWidth >= 991) {
    popupSlides.forEach(function (slide) {
      slide.remove();
    });
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i];
      let row = rows[i];
      row.appendChild(col);
    }
    initInnerSwipers();
  } else {
    popupSlides.forEach(function (slide) {
      document.querySelector('.container').appendChild(slide);
    });
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i];
      col.remove();
    }
    openPopupBtns();
    initPopupSwipers();
  }
}

window.addEventListener('DOMContentLoaded', function () {
  const rows = document.querySelectorAll('.swiper-slide .row');

  rows.forEach(row => {
    let col = row.querySelector('.main-inner-swiper-container');
    innerSwipers.push(col);
    cols.push(col);
  });

  handleScreenSize(screenWidth);

  window.addEventListener('resize', function () {
    screenWidth = window.innerWidth || document.documentElement.clientWidth;
    handleScreenSize(screenWidth);
  });
});

