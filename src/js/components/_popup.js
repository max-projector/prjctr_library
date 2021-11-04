import { CLASSES, DOM } from "../helpers/_consts";

const openOverlay = () => {
  DOM.$overlay.addClass(CLASSES.active);
  DOM.$body.css("overflow", "hidden");
};

const closeOverlay = () => {
  DOM.$overlay.removeClass(CLASSES.active);
  DOM.$body.css("overflow", "visible");
};

class Popup {
  constructor(el) {
    this.el = el;
    this.$el = $(this.el);
    this.name = this.$el.data("name");
    this.$openButton = $(`.js-open-popup-button[data-popup="${this.name}"]`);
    this.$closeButton = this.$el.find(".js-popup-close");
  }

  init() {
    this.initPopup();
  }

  initPopup() {
    this.$openButton.on("click", () => {
      this.clickOpening();
    });

    this.$closeButton.on("click", () => {
      this.clickClosing();
    });

    DOM.$overlay.on("click", () => {
      this.clickClosing();
    });

    setTimeout(() => {
      this.$el.css("visibility", "visible");
    }, 350);
  }

  clickClosing() {
    this.closePopup();
    closeOverlay();
  }

  clickOpening() {
    this.openPopup();
    openOverlay();

    if (this.name === 'subscribe' && $('#request-phone').val() === '') {
      setTimeout(() => {
        $('#request-phone').focus();
      }, 21);
    }
  }

  openPopup() {
    this.$el.addClass(CLASSES.active);
  }

  closePopup() {
    this.$el.removeClass(CLASSES.active);
  }
}

const initAllPopups = () => {
  const $elements = $(".js-popup");
  $elements.each((index, el) => new Popup(el).init());
};

export default initAllPopups;
