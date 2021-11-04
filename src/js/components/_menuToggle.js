import {CLASSES, DOM} from '../helpers/_consts';

const initMenuToggle = () => {
  const $mobMenu = $('.js-menu-inner');

  const $burger = $('.js-burger');

  const $closeMenu = $('.js-close');

  const openMenu = () => {
    $mobMenu.addClass(CLASSES.visible);
    $burger.addClass(CLASSES.hidden);
    $closeMenu.addClass(CLASSES.visible);
    DOM.$body.css('overflow', 'hidden');
  };

  const closeMenu = () => {
    $mobMenu.removeClass(CLASSES.visible);
    $closeMenu.removeClass(CLASSES.visible);
    $burger.removeClass(CLASSES.hidden);
    DOM.$body.css('overflow', 'visible');
  };

  $burger.on('click', openMenu);

  $closeMenu.on('click', closeMenu);
};

export default initMenuToggle;
