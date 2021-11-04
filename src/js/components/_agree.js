const initAgree = () => {
  const $agree = $('#agree');

  if (!$agree[0]) {
    return;
  }

  const agree = () => {
    if ($agree.is(':checked')) {
      $agree.parent().prev().prop('disabled', false).css({
        'opacity': '',
        'pointerEvents': ''
      });
    } else {
      $agree.parent().prev().prop('disabled', true).css({
        'opacity': '0.5',
        'pointerEvents': 'none'
      });
    }
  }

  $agree.on('click', agree);
};

export default initAgree;
