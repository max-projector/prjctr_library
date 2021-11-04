// import "core-js/es/number";
import svg4everybody from "svg4everybody";
import detectDevice from "./lib/device";

import { DOM, IS_TOUCH, CLASSES } from "./helpers/_consts";

// import initSwiperSelected from "./components/_initSwiperSelected";
import initMenuToggle from "./components/_menuToggle";
// import initSidebarClick from './components/_sidebarClick';
// import initActivePointToggle from './components/_menuActivePointToggle';
import initAllPopups from "./components/_popup";
import initAgree from "./components/_agree";
import initSelectedSliderClick from "./components/_selectedSliderClick";
import initToggleVideo from "./components/_playVideo";
import initToggleFavorite from "./components/_favoriteVideo";
import initToggleFavoriteList from "./components/_favoriteVideoList";
import initSubscribe from "./components/_subscribe";
import initReg from "./components/_reg";
import initGift from "./components/_gift";
import initLead from "./components/_lead";
import initShare from "./components/_share";
// import initPagination from './components/_pagination';
import initSearchClear from "./components/_searchClear";
import initFocusOutlineToggle from "./components/_initFocusOutlineToggle";
import initLanguagesSelect from "./components/_initLanguagesSelect";
import initCookiePolicy from "./components/_initCookiePolicy";
import initTelInput from "./components/_intlTelInput";
import initAccount from "./components/_account";

const initHelpers = () => {
  DOM.$body.addClass(IS_TOUCH ? CLASSES.touch : CLASSES.noTouch);
  // if( /^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {DOM.$body.addClass(CLASSES.safari);}

  const isMacOrIosDevice =
    typeof window !== "undefined" &&
    window.navigator &&
    window.navigator.platform &&
    /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform);

  if (isMacOrIosDevice) {
    DOM.$body.addClass(CLASSES.safari);
  }

  svg4everybody();
  detectDevice();
};

const initModules = () => {
  // initSwiperSelected();
  initMenuToggle();
  // initSidebarClick();
  // initActivePointToggle();
  initAllPopups();
  initAgree();
  initSelectedSliderClick();
  initToggleVideo();
  initToggleFavorite();
  initToggleFavoriteList();
  initSubscribe();
  initReg();
  initGift();
  initLead();
  initShare();
  // initPagination();
  initSearchClear();
  initCookiePolicy();
  initFocusOutlineToggle();
  initLanguagesSelect();
  initTelInput();
  initAccount();
};

const readyFunc = () => {
  initHelpers();
  initModules();
};

DOM.$doc.ready(readyFunc);
