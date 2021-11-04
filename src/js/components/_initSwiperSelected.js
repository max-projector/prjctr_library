import Swiper, {Navigation, Pagination} from 'swiper';

Swiper.use([Navigation, Pagination]);

const initSwiperSelected = () => {
  const $slider = $('.js-selected-lections-slider');

  if (!$slider[0]) return;

  // eslint-disable-next-line
  const initSwiper = new Swiper($slider[0], {
    navigation: {
      nextEl: '.js-swiper-button-next',
      prevEl: '.js-swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    loop: true
  });
};

export default initSwiperSelected;
