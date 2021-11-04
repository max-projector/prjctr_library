import Inputmask from "inputmask";
import { DOM, CLASSES } from "../helpers/_consts";

const initSubscribe = () => {
  const $subscribe = $(".subscribe-popup");

  if (!$subscribe[0]) {
    return;
  }

  const subscribe = (e) => {
    e.preventDefault();
    $subscribe.find("button").prop("disabled", true).addClass(CLASSES.disabled);

    const $telInput = $('#request-phone');
    const iti = window.intlTelInputGlobals.getInstance($telInput[0]);

    const formData = $subscribe.serializeArray();

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
        $subscribe
          .find("button")
          .prop("disabled", false)
          .removeClass(CLASSES.disabled);
        $subscribe
          .find(".popup-form__input--error")
          .removeClass("popup-form__input--error");

        if (data.error === "Y") {
          $.each(data.errorFields, (i, val) => {
            $subscribe
              .find(`:input[name="request[${val}]"]`)
              .addClass("popup-form__input--error");
          });
        } else if (data.form !== "") {
          // $subscribe.html(`<div style="text-align:center">${ data.msg }</div>`);
          DOM.$body.append(`<div id="subscribe-form"> ${data.form} </div>`);
          $("#subscribe-form").find("form").trigger("submit");
        } else {
          window.location = '/library';
        }
      },
      error: () => {
        $subscribe
          .find("button")
          .prop("disabled", false)
          .removeClass(CLASSES.disabled);
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      },
    });
  };

  $subscribe.on("submit", subscribe);

  function inputChanged() {
    $(this).removeClass("popup-form__input--error");
  }

  $subscribe.on("change", "input", inputChanged);

  const $gift = $('#gift');

  if ($gift[0]) {
    Inputmask({
      mask: '9999-9999[-9999]',
      showMaskOnHover: false,
      // greedy: false,
    }).mask($gift[0]);
  }
};

export default initSubscribe;
