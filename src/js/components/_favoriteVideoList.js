import { DOM, CLASSES } from "../helpers/_consts";

const initToggleFavoriteList = () => {
  const $favoriteButtons = $(".js-favorite-list-btn");

  if (!$favoriteButtons[0]) {
    return;
  }

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.currentTarget.blur();
    const $favoriteButton = $(e.currentTarget);

    const formData = {
      event_id: $favoriteButton.data("event-id"),
      state: $favoriteButton.data("state") === 0 ? 1 : 0,
      keyword: DOM.$body.data("keyword"),
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

          if (data.state) {
            $favoriteButton.find(".icon:last").show().prev().hide();
          } else {
            $favoriteButton.find(".icon:first").show().next().hide();
          }

          if (data.total_favorites) {
            $('.sidebar__button[href="/library/favorites"]')
              .parent()
              .removeClass("is-disabled")
              .find(".sidebar__count")
              .text(`${data.total_favorites}`);
          } else {
            $('.sidebar__button[href="/library/favorites"]')
              .parent()
              .addClass("is-disabled")
              .find(".sidebar__count")
              .text("");
          }
        }
      },
      error: () => {
        $favoriteButton.removeClass(CLASSES.disabled);
        // console.log('Loader Error:\n' + textStatus + ' ' + errorThrown );
      },
    });
  };

  $favoriteButtons.on("click", toggleFavorite);
};

export default initToggleFavoriteList;
