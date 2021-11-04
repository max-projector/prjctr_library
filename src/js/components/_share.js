import { DOM } from "../helpers/_consts";

const initShare = () => {
  const $share = $(".js-share");
  const $copy = $(".js-copy");

  if (!$share[0]) {
    return;
  }

  function share(e) {
    e.preventDefault();
    this.blur();

    // get center position
    const p = {
      x: (DOM.$win.width() - 660) / 2,
      y: (DOM.$win.height() - 380) / 2,
    };

    window.open(
      $(this).data("href"),
      "share-popup",
      `height=380,width=660,left=${p.x},top=${p.y},resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0`
    );
  }

  $share.on("click", share);

  function copyToClipboard() {
    const $temp = $("<input>");
    DOM.$body.append($temp);
    $temp.val($(this).data('href')).trigger('select');
    document.execCommand("copy");
    $temp.remove();
  }

  $copy.on("click", copyToClipboard);
};

export default initShare;
