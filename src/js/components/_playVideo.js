/* eslint-disable */

const sentCurrentDuration = (progress) => {
  // console.log(progress, "progress");

  const $playButton = $(".js-video-play-button");

  $.ajax({
    type: "POST",
    url: "/ajax/history",
    data: `event_id=${$playButton.data("event-id")}&progress=${progress}`,
    cache: false,
    dataType: "json",
    success: (data) => {
      //   console.log(
      //     `event_id=${$playButton.data("event-id")}&progress=${progress}`
      //   );
      if (data.error) {
        window.location.reload();
      }
    },
    error: () => {
      // console.log("Loader Error:\n" + textStatus + " " + errorThrown);
    },
  });
};

const initToggleVideo = () => {
  const $video = $(".js-video");
  if (!$video[0]) return;

  const $playButton = $(".js-video-play-button");
  let handle = null;

  const initPlayVideo = () => {
    $video
      .addClass("is-active")
      .html(
        `<iframe class="video-content__iframe" src="${$playButton.data(
          "video-url"
        )}" frameborder="0" allow="autoplay; fullscreen" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`
      );

    const iframe = $(".video-content__iframe");
    const player = new Vimeo.Player(iframe[0]);
    // console.log(player, 'player')

    player
      .setCurrentTime($playButton.data("video-start"))
      .then(function (seconds) {
        // player.pause();
      });

    const startPolling = function () {
      if (handle !== null) {
        return;
      }

      handle = window.setInterval(function () {
        // console.log("startPolling");
        player.getCurrentTime().then(function (value) {
          sentCurrentDuration(value);
        });
      }, 3000);
    };

    const stopPolling = function () {
      // console.log("stopPolling");
      window.clearInterval(handle);
      handle = null;

      player.getCurrentTime().then(function (value) {
        sentCurrentDuration(value);
      });
    };

    player.on("play", function () {
      startPolling();
    });

    player.on("pause", function () {
      stopPolling();
    });
  };

  $playButton.on("click", initPlayVideo);
};

export default initToggleVideo;
