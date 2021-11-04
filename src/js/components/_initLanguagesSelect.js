import {CLASSES, IS_TOUCH, DOM} from '../helpers/_consts';

const initLanguagesSelect = () => {
  const $languagesSelect = $('.js-languages');
  const $selectButton = $languagesSelect.find('.js-languages-button');
  const $selectOptions = $languagesSelect.find('.js-languages-options');
  const $selectItem = $languagesSelect.find('.js-languages-item');
  const $selectedText = $languagesSelect.find('.js-languages-text');
  const $selectHidden = $languagesSelect.find('.js-languages-hidden');

  const showLanguages = () => $selectOptions.addClass(CLASSES.visible);

  const hideLanguages = () => $selectOptions.removeClass(CLASSES.visible);

  const chooseOption = ($item) => {
    const optionText = () => $item.text();
    const textSelected = () => $selectedText.text();
    const newOptionText = optionText();
    const newSelectedText = textSelected();

    $selectedText.text(newOptionText);
    $item.text(newSelectedText);
    $selectHidden.val(newOptionText);
  };

  const initChooseOption = (e) => {
    const $item = $(e.currentTarget);
    chooseOption($item);
  };

  const initOutsideClickHideLanguages = (e) => {
    if($(e.currentTarget) !== $selectItem) {
      hideLanguages();
    }
  };

  if(IS_TOUCH) {
    const initTouchChooseOption = (e) => {
      initChooseOption(e);
      hideLanguages();
    };

    $selectButton.on('click', showLanguages);

    $selectItem.on('click', initTouchChooseOption);

    DOM.$doc.on('mouseup', initOutsideClickHideLanguages);
  } else {
    $selectItem.on('click', initChooseOption);
  }
};

export default initLanguagesSelect;
