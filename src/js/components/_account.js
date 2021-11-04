import { DOM, CLASSES } from "../helpers/_consts";

const initAccount = () => {
  const $cancelBtn = $("#cancel-btn");
  let isUnsubscribeXhr = false;

  const cancelSubscription = (e) => {
    e.preventDefault();

    if (isUnsubscribeXhr) {
      return false;
    }

    isUnsubscribeXhr = true;

    const formData = {
      hash: $cancelBtn.data("hash"),
      lang: $("body").data("lang"),
    };

    $.ajax({
      type: "POST",
      url: "/ajax/unsubscribe",
      data: $.param(formData),
      cache: false,
      dataType: "json",
      success: (data) => {
        isUnsubscribeXhr = false;

        if (data.error) {
          alert(data.errorCode);
        } else {
          window.location.reload();
        }
      },
      error: () => {
        isUnsubscribeXhr = false;
        alert("Request error! Try again later");
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      },
    });

    return false;
  };

  $("#cancel-btn").on("click", cancelSubscription);

  const $accountSettings = $("#account-settings");

  const saveSettings = (e) => {
    e.preventDefault();
    $accountSettings
      .find("button")
      .prop("disabled", true)
      .addClass(CLASSES.disabled);

    const formData = $accountSettings.serialize();

    $.ajax({
      type: "POST",
      url: `/ajax/account?lang=${DOM.$body.data("lang")}`,
      data: formData,
      cache: false,
      dataType: "json",
      success: (data) => {
        $accountSettings
          .find("button")
          .prop("disabled", false)
          .removeClass(CLASSES.disabled);
        $accountSettings.find(".account-msg").remove();
        $accountSettings
          .find(".popup-form__input--error")
          .removeClass("popup-form__input--error");

        if (data.error === "Y") {
          $.each(data.errorFields, (i, val) => {
            $accountSettings
              .find(`:input[name="account[${val}]"]`)
              .addClass("popup-form__input--error");
          });
        } else {
          $('.account__title').text(`${$('#account-firstname').val()  } ${  $('#account-lastname').val()}`);
          $('.js-login:last').text(`${$('#account-firstname').val()  } ${  $('#account-lastname').val()}`);
          $accountSettings.prepend(
            `<div class="account-msg">${data.msg}</div>`
          );
        }
      },
      error: () => {
        $accountSettings
          .find("button")
          .prop("disabled", false)
          .removeClass(CLASSES.disabled);
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      },
    });
  };

  $accountSettings.on("submit", saveSettings);
};

export default initAccount;
