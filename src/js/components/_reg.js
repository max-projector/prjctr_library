import { DOM, CLASSES } from "../helpers/_consts";

const initReg = () => {
  const $reg = $(".js-reg-button");

  if (!$reg[0]) {
    return;
  }

  const reg = (e) => {
    e.preventDefault();
    $reg.prop("disabled", true).addClass(CLASSES.disabled);

    const formData = $.param({
      event_id: $reg.data("event-id"),
    });

    $.ajax({
      type: "POST",
      url: `/ajax/conferenceregistration?lang=${DOM.$body.data("lang")}`,
      data: formData,
      cache: false,
      dataType: "json",
      success: (data) => {
        $reg.prop("disabled", false).removeClass(CLASSES.disabled);

        if (data.error === "Y") {
          alert(data.errorCode);
        } else {
          $reg
            .first()
            .addClass("button_dark button__link")
            .css("pointerEvents", "none")
            .prop("disabled", true)
            .children()
            .text(data.msg);
          $reg.last().remove();
        }
      },
      error: () => {
        $reg.prop("disabled", false).removeClass(CLASSES.disabled);

        alert(`Network error. Try again later`);
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      },
    });
  };

  $reg.on("click", reg);
};

export default initReg;
