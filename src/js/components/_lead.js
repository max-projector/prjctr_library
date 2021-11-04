import {DOM, CLASSES} from '../helpers/_consts';

const initLead = () => {
  const $leadForm = $('.js-lead');

  if (!$leadForm[0]) {
    return;
  }

  const regLead = (e) => {
    e.preventDefault();
    $leadForm.find('button').prop('disabled', true).addClass(CLASSES.disabled);

    const $telInput = $('#request-phone');
    const iti = window.intlTelInputGlobals.getInstance($telInput[0]);

    const formData = $leadForm.serializeArray();

    formData.forEach((item, index) => {
      if (item.name === 'request[phone]') {
        formData[index].value = iti.getNumber();
      }
    });

    $.ajax({
      type: "POST",
      url: `/ajax/registration?lang=${ DOM.$body.data('lang') }`,
      data: formData,
      cache: false,
      dataType: "json",
      success: (data) => {
        $leadForm.find('button').prop('disabled', false).removeClass(CLASSES.disabled);
        $leadForm.find('.popup-form__input--error').removeClass('popup-form__input--error');

        if (data.error === 'Y') {
          $.each(data.errorFields, (i, val) => {
						$leadForm.find(`:input[name="request[${ val }]"]`).addClass('popup-form__input--error');
					});
        } else {
          $leadForm.html(`<div style="text-align:center">${ data.msg }</div>`);
        }
      },
      error: () => {
        $leadForm.find('button').prop('disabled', false).removeClass(CLASSES.disabled);
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      }
		});
  }

  $leadForm.on('submit', regLead);

  function inputChanged() {
    $(this).removeClass('popup-form__input--error');
  }

  $leadForm.on('change', 'input', inputChanged);
};

export default initLead;
