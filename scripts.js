let screenWidth = window.innerWidth || document.documentElement.clientWidth;
let innerSwipers = [];
let popupSwipers = [];
const popupSlides = document.querySelectorAll('.swiper-slide.popup');
const rows = document.querySelectorAll('.swiper-slide .row');
const mainSwiperSlides = document.querySelectorAll('.main-swiper-container > .swiper-wrapper > .swiper-slide');
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
  popupSwiperContainers.forEach(function (popupSwiperContainer, popupSwiperContainerIndex) {
    let popupSwiper = new Swiper(popupSwiperContainer, {
      slidesPerView: 1,
      spaceBetween: 10,
      on: {
        init: function () {
          handlePopupSlideChange(popupSwiperContainer, popupSwiperContainerIndex);
        },
        slideChange: function () {
          handlePopupSlideChange(popupSwiperContainer, popupSwiperContainerIndex);
        }
      }
    });

    mainSwiperSlides.forEach(function (slide, slideIndex) {
      const dotButtons = slide.querySelectorAll('.btn-dot');
      dotButtons.forEach(function (button, index) {
        button.addEventListener('click', function () {
          if (slideIndex === popupSwiperContainerIndex) {
            popupSwiper.slideTo(index);
          }
        })
      });
    });

    popupSwipers.push(popupSwiper);
  });
}

function handlePopupSlideChange(popupSwiperContainer, popupSwiperContainerIndex) {
  const activeIndex = popupSwiperContainer.swiper.activeIndex;

  mainSwiperSlides.forEach(function (slide, slideIndex) {
    const dotButtons = slide.querySelectorAll('.btn-dot');
    dotButtons.forEach(function (button, index) {
      if (index === activeIndex && slideIndex === popupSwiperContainerIndex) {
        button.classList.add('active');
      } else if (slideIndex === popupSwiperContainerIndex) {
        button.classList.remove('active');
      }
    });
  });
}

function openPopupBtns() {
  const popupSwipers = document.querySelectorAll('.swiper-slide.popup');
  const mainContainer = document.querySelector('.shop-the-look');
  // const dotButtons = document.querySelectorAll('.btn-dot');
  let isMainSwiperDisabled = false;
  let isMainContainerScaled = false;

  mainSwiperSlides.forEach(function (slide, index) {
    const dotButtons = slide.querySelectorAll('.btn-dot');
    dotButtons.forEach(function (button, btnIndex) {
      button.addEventListener('click', function () {
        popupSwipers.forEach(function (popupSwiper) {
          popupSwiper.classList.remove('visible');
        });
        if (index < popupSwipers.length) {
          mainContainer.classList.add('pop');
          popupSwipers[index].classList.add('visible');
          disableMainSwiper();
          if (!isMainContainerScaled) {
            scaleMainContainer();
            isMainContainerScaled = true;
          }
          // const popupSwiperContainer = popupSwipers[index].querySelector('.popup-swiper-container');
        }
      });
    });
  });

  // Add event listener to each close button
  const closeButtons = document.querySelectorAll('.btn-close');
  closeButtons.forEach(function (closeButton) {
    closeButton.addEventListener('click', function () {
      const popup = closeButton.closest('.swiper-slide.popup');
      popup.classList.remove('visible');
      mainContainer.classList.remove('pop');
      enableMainSwiper();
      if (isMainContainerScaled) {
        resetMainContainerTransform();
        isMainContainerScaled = false;
      }
    });
  });


  function disableMainSwiper() {
    if (!isMainSwiperDisabled) {
      mainSwiper.disable();
      isMainSwiperDisabled = true;
    }
  }

  function enableMainSwiper() {
    if (isMainSwiperDisabled) {
      mainSwiper.enable();
      isMainSwiperDisabled = false;
    }
  }

  function scaleMainContainer() {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const screenHeight = window.innerHeight || document.documentElement.clientHeight;

    const containerBounds = mainContainer.getBoundingClientRect();
    const containerWidth = containerBounds.width;
    const containerHeight = containerBounds.height;

    const scaleX = screenWidth / containerWidth;
    const scaleY = screenHeight / containerHeight;
    const scale = Math.max(scaleX, scaleY);

    mainContainer.style.transformOrigin = 'center center';
    mainContainer.style.transform = `scale(${scale})`;
  }

  function resetMainContainerTransform() {
    mainContainer.style.transform = '';
  }
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

