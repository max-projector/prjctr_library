import {CLASSES} from '../helpers/_consts';

import scrollTop from '../helpers/_scrollTop';

const initSidebarClick = () => {
  const $sidebar = $('.js-filters-slider');

  if(!$sidebar[0]) return;

  const $sidebarPoint = $('.js-sidebar-point');

  const setActivePoint = ($item) => {
    if ($item.hasClass(CLASSES.disabled)) return;

    $sidebar.find(`.${CLASSES.active}`).removeClass(CLASSES.active);

    $item.addClass(CLASSES.active);
  };

  const clickHandle = (e) => {
    const $item = $(e.currentTarget);
    setActivePoint($item);
    scrollTop();
  };

  $sidebarPoint.on('click', clickHandle);
};

export default initSidebarClick;
