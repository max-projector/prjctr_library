import {CLASSES, DOM, IS_TOUCH} from '../helpers/_consts';

const initFocusOutlineToggle = () => {
  const addFocusClass = (e) => {
    $(e.currentTarget).addClass(CLASSES.noOutline);
  };

  const hideFocusClass = (e) => {
    $(e.currentTarget).removeClass(CLASSES.noOutline);
  };

  if(IS_TOUCH) {
    DOM.$body.on('touchstart', addFocusClass);
  } else {
    DOM.$body.on('mousedown', addFocusClass);
    DOM.$body.on('keydown', hideFocusClass);
  }
};

export default initFocusOutlineToggle;
