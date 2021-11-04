import {DOM} from './_consts';

export default function scrollTop() {
  DOM.$htmlBody.animate({ scrollTop: 0 }, 1000);
};
