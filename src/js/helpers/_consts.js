function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints;
}

export const BREAKPOINTS = {
  desktop: 1279,
  middle: 980,
};

export const IS_TOUCH = isTouchDevice();

export const DOM = {
  $win: $(window),
  $body: $("body"),
  $doc: $(document),
  $htmlBody: $("html, body"),
  $overlay: $(".js-overlay"),
  $header: $(".js-header"),
  $inner: $(".js-inner"),
};

export const CLASSES = {
  visible: "is-visible",
  hidden: "is-hidden",
  active: "is-active",
  fixed: "is-fixed",
  disabled: "is-disabled",
  noTouch: "no-touch",
  touch: "is-touch",
  noOutline: "no-outline",
  safari: "is-safari",
};
