import intlTelInput from "intl-tel-input";

const initTelInput = () => {
  const $phone = $("#request-phone");

  if ($phone[0]) {
    intlTelInput($phone[0], {
      utilsScript: $phone.data("utils")
        ? $phone.data("utils")
        : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js",
      // nationalMode: true,
      // formatOnDisplay: true,
      // autoHideDialCode: false,
      autoPlaceholder: "aggressive",
      preferredCountries: [],
      initialCountry: "auto",
      geoIpLookup: (success, failure) => {
        $.get("https://ipinfo.io", () => {}, "jsonp").always((resp) => {
          const countryCode = resp && resp.country ? resp.country : "ua";
          success(countryCode);
        });
      },
    });
  }

  const $phoneGift = $("#request-phone-gift");

  if ($phoneGift[0]) {
    intlTelInput($phoneGift[0], {
      utilsScript: $phoneGift.data("utils")
        ? $phoneGift.data("utils")
        : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js",
      autoPlaceholder: "aggressive",
      preferredCountries: [],
      initialCountry: "auto",
      geoIpLookup: (success, failure) => {
        $.get("https://ipinfo.io", () => {}, "jsonp").always((resp) => {
          const countryCode = resp && resp.country ? resp.country : "ua";
          success(countryCode);
        });
      },
    });
  }
};

export default initTelInput;
