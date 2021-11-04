import {CLASSES, BREAKPOINTS, DOM} from '../helpers/_consts';

const initSearchClear = () => {
  const $searchInput = $('.js-search');

  const $searchClearButton = $('.js-search-clear');

  const $searchResultsClearButton = $('.js-clear-button');

  const showClearButton = () => {
    $searchClearButton.addClass(CLASSES.visible);
  };

  const hideClearButton = () => {
    $searchClearButton.removeClass(CLASSES.visible);
  };

  const toggleClearButton = () => {
    if ($searchInput.val() !== '' && DOM.$win.width() >= BREAKPOINTS.middle) {
      showClearButton();
    } else {
      hideClearButton();
    }
  };

  const clearSearch = () => {
    $searchInput.val('');

    if ($searchClearButton.data('url')) {
      window.location = $searchClearButton.data('url');
    }
  }

  if ($searchInput.val() !== '' && DOM.$win.width() >= BREAKPOINTS.middle) {
    showClearButton();
  }

  $searchInput.on('input focus', toggleClearButton);

  $searchInput.on('blur', () => setTimeout(hideClearButton, 100));

  $searchClearButton.on('click', clearSearch);

  $searchResultsClearButton.on('click', clearSearch);
};

export default initSearchClear;
