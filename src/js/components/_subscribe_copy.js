import {DOM, CLASSES} from '../helpers/_consts';

const initSubscribe = () => {
  const $subscribe = $('.js-subscribe');

  if (!$subscribe[0]) {
    return;
  }

  const subscribe = () => {
    $subscribe.addClass(CLASSES.disabled);

    $.ajax({
      type: "POST",
      url: '/ajax/paysubscribe',
      cache: false,
      dataType: "json",
      success: (data) => {
        $subscribe.removeClass(CLASSES.disabled);

        if (data.error) {
          window.location.reload();
        } else {
          DOM.$body.append(`<div id="subscribe-form"> ${ data.form } </div>`);
          $('#subscribe-form').find('form').trigger('submit');
        }
      },
      error: () => {
        $subscribe.removeClass(CLASSES.disabled);
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      }
		});
  }

  $subscribe.on('click', subscribe);
};

export default initSubscribe;
