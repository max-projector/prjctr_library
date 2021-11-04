/* eslint-disable no-lonely-if */
import { DOM, CLASSES } from "../helpers/_consts";

const initGift = () => {
  const $gift = $(".gift-popup");

  if (!$gift[0]) {
    return;
  }

  const gift = (e) => {
    e.preventDefault();
    $gift.find("button").prop("disabled", true).addClass(CLASSES.disabled);

    const $telInput = $('#request-phone-gift');
    const iti = window.intlTelInputGlobals.getInstance($telInput[0]);

    const formData = $gift.serializeArray();

    formData.forEach((item, index) => {
      if (item.name === 'request[phone]') {
        formData[index].value = iti.getNumber();
      }
    });

    $.ajax({
      type: "POST",
      url: `/ajax/registration?lang=${DOM.$body.data("lang")}`,
      data: formData,
      cache: false,
      dataType: "json",
      success: (data) => {
        $gift
          .find("button")
          .prop("disabled", false)
          .removeClass(CLASSES.disabled);
        $gift
          .find(".popup-form__input--error")
          .removeClass("popup-form__input--error");

        if (data.error === "Y") {
          $.each(data.errorFields, (i, val) => {
            $gift
              .find(`:input[name="request[${val}]"]`)
              .addClass("popup-form__input--error");
          });
        } else {
          // $gift.html(`<div style="text-align:center">${ data.msg }</div>`);
          if (data.form === "") {
            window.location = '/library';
          } else {
            DOM.$body.append(`<div id="subscribe-form"> ${data.form} </div>`);
            $("#subscribe-form").find("form").trigger("submit");
          }
        }
      },
      error: () => {
        $gift
          .find("button")
          .prop("disabled", false)
          .removeClass(CLASSES.disabled);
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      },
    });
  };

  $gift.on("submit", gift);

  function inputChanged() {
    $(this).removeClass("popup-form__input--error");
  }

  $gift.on("change", "input", inputChanged);
};

export default initGift;
