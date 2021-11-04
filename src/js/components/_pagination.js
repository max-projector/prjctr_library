import {CLASSES, DOM} from '../helpers/_consts';

const initPagination = () => {
  const $nextPage = $('.js-pagination-next');

  const $prevPage = $('.js-pagination-prev');

  const pagesCount = 5;

  let currentPage = 1;

  const togglePagination = () => {
    if (currentPage === 1) {
      $prevPage.removeClass(CLASSES.visible);
    } else if (currentPage === pagesCount) {
      $nextPage.removeClass(CLASSES.visible);
    } else {
      if ($prevPage.hasClass(CLASSES.visible) && $nextPage.hasClass(CLASSES.visible)) return;
      $prevPage.addClass(CLASSES.visible);
      $nextPage.addClass(CLASSES.visible);
    }
  };

  const scrollTop = () => {
    const topPosition = () => DOM.$inner.offset().top;

    DOM.$htmlBody.animate({ scrollTop: topPosition() }, 1000);
  };

  const switchNextPage = () => {
    currentPage += 1;

    togglePagination();

    scrollTop();
  };

  const switchPrevPage = () => {
    currentPage -= 1;

    togglePagination();

    scrollTop();
  };

  $nextPage.on('click', switchNextPage);

  $prevPage.on('click', switchPrevPage);
};

export default initPagination;
