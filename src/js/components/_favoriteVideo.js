import { CLASSES } from "../helpers/_consts";

const initToggleFavorite = () => {
  const $favoriteButton = $(".js-favorite-btn");

  if (!$favoriteButton[0]) {
    return;
  }

  const toggleFavorite = () => {
    const formData = {
      event_id: $favoriteButton.data("event-id"),
      state: $favoriteButton.data("state") === 0 ? 1 : 0,
    };

    $favoriteButton.addClass(CLASSES.disabled);

    $.ajax({
      type: "POST",
      url: "/ajax/favorite",
      data: $.param(formData),
      cache: false,
      dataType: "json",
      success: (data) => {
        $favoriteButton.removeClass(CLASSES.disabled);

        if (data.error) {
          window.location.reload();
        } else {
          $favoriteButton.data("state", data.state);
          $favoriteButton.find('span').text(data.text);

          if (data.state) {
            $favoriteButton.find('.icon-heart:last').show().prev().hide();
          } else {
            $favoriteButton.find('.icon-heart:first').show().next().hide();
          }
        }
      },
      error: () => {
        $favoriteButton.removeClass(CLASSES.disabled);
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      },
    });
  };

  $favoriteButton.on("click", toggleFavorite);
};

export default initToggleFavorite;
