//требования к масштабированию
const PARAMETRS_SCALE = {
  minSize: 25,
  maxSize: 100,
  step: 25,
  start: 100,
};

const scaleField = document.querySelector('.img-upload__scale');
const biggerButton = scaleField.querySelector('.scale__control--bigger');
const smallerButton = scaleField.querySelector('.scale__control--smaller');
const photoPreview = document.querySelector('.img-upload__preview img');
const scaleValue = document.querySelector('.scale__control--value');


//сброс масштабирования
const resetScale = () => {
  scaleValue.value = `${PARAMETRS_SCALE.start}%`;
  photoPreview.style.transform = `scale(${scaleValue.value})`;
};

//функция кнопки 'плюс'
const tuchBiggerButton = () => {
  let parseIntValue = parseInt(scaleValue.value, 10);
  if( parseIntValue < PARAMETRS_SCALE.maxSize) {
    photoPreview.style.transform = `scale(${parseIntValue += PARAMETRS_SCALE.step}%)`;
    scaleValue.value = `${parseIntValue}%`;
  }
};

// функция кнопки 'минус'
const tuchSmallerButton = () => {
  let parseIntValue = parseInt(scaleValue.value, 10);
  if( parseIntValue > PARAMETRS_SCALE.minSize) {
    photoPreview.style.transform = `scale(${parseIntValue -= PARAMETRS_SCALE.step}%)`;
    scaleValue.value = `${parseIntValue}%`;
  }
};

// обработчик событий
scaleField.addEventListener('click', (evt) => {
  if (evt.target === biggerButton) {
    tuchBiggerButton();
  }
  if (evt.target === smallerButton) {
    tuchSmallerButton();
  }
});

export {
  resetScale
};
