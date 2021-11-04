import { setCookie, getCookie } from "../helpers/_cookies";

const initCookiePolicy = () => {
  const $popup = $(".cookie-popup");

  $(".cookie-popup__button").on("click", () => {
    setCookie("agree", 1, 180);
    $popup.remove();
  });
};

export default initCookiePolicy;
