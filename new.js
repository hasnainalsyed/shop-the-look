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

    const mainSwiperContainers = document.querySelectorAll('.main-swiper-container');
    const innerSwiperContainers = document.querySelectorAll('.inner-swiper-container');

    mainSwiperContainers.forEach(function (mainSwiperContainer, index) {
      const dotButtons = mainSwiperContainer.querySelectorAll('.btn-dot');
      const innerSwiper = innerSwipers[index];

      dotButtons.forEach(function (button, btnIndex) {
        button.addEventListener('click', function () {
          innerSwiper.slideTo(btnIndex);
        });
      });
    });
  } else {
    popupSlides.forEach(function (slide) {
      document.querySelector('.container').appendChild(slide);
    });
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i];
      col.remove();
    }
    initPopupSwipers();

    const mainSwiperContainers = document.querySelectorAll('.main-swiper-container');
    const popupSwiperContainers = document.querySelectorAll('.popup-swiper-container');

    mainSwiperContainers.forEach(function (mainSwiperContainer, index) {
      const dotButtons = mainSwiperContainer.querySelectorAll('.btn-dot');
      const popupSwiperContainer = popupSwiperContainers[index];
      const popupSwiper = popupSwipers[index];

      dotButtons.forEach(function (button, btnIndex) {
        button.addEventListener('click', function () {
          popupSwiper.slideTo(btnIndex);

          popupSlides.forEach(function (slide) {
            slide.classList.remove('visible');
          });
          popupSlides[btnIndex].classList.add('visible');

          popupSwiperContainers.forEach(function (container) {
            container.style.display = 'none';
          });
          popupSwiperContainer.style.display = 'block';
        });
      });
    });
  }
}
