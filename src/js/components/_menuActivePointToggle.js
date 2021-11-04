import {CLASSES, DOM, BREAKPOINTS, IS_TOUCH} from '../helpers/_consts';

const initActivePointToggle = () => {
  const $menuPoint = $('.js-menu-point');

  const $menuPointWithSublist = $('.js-menu-point-with-sublist');

  const getMenuPointActive = () => $('.js-menu-point.is-active');

  const getSublistActive = () => $('.js-sublist.is-visible');

  let activePoint = getMenuPointActive();

  let activeSublist = getSublistActive();

  const setCurrentAttr = () => activePoint.attr('aria-current','page');

  setCurrentAttr();

  const removeActivePoint = () => {
    activePoint.removeClass(CLASSES.active);

    activePoint.removeAttr('aria-current');
  };

  const hideSublist = () => activeSublist.removeClass(CLASSES.visible);

  const toggleActivePoint = (e) => {
    const $item = $(e.currentTarget);

    if($item !== activePoint) {
      removeActivePoint();

      $item.addClass(CLASSES.active);

      activePoint = $item;

      setCurrentAttr();
    }
  };

  const toggleSublist = (e) => {
    const $item = $(e.currentTarget);

    const $menuSublist = $item.find('.js-sublist');

    const showSublist = () => $menuSublist.addClass(CLASSES.visible);

    if(!$menuSublist.hasClass(CLASSES.visible)) {
      showSublist();
      activeSublist = $menuSublist;
    } else {
      hideSublist();
    }
  };

  const initOutsideClickHideSublist = (e) => {
    if(activeSublist.length && !$(e.target).closest(activeSublist[0]).length) {
      hideSublist();
    }
  };

  if(DOM.$win.width() >= BREAKPOINTS.middle && IS_TOUCH) {
    $menuPointWithSublist.on('click', toggleSublist);

    DOM.$doc.on('mouseup', initOutsideClickHideSublist);
  }

  $menuPoint.on('click', toggleActivePoint);
};

export default initActivePointToggle;
