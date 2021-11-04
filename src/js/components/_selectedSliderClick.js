import scrollTop from '../helpers/_scrollTop';

const initSelectedSliderClick = () => {
  const $selectedSliderLink = $('.js-selected-link');

  if(!$selectedSliderLink[0]) return;

  $selectedSliderLink.on('click', scrollTop);
};

export default initSelectedSliderClick;
