import {isEscapeKey} from './bigPhoto.js';

const form = document.querySelector('.img-upload__form');
const onSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const buttonSuccessMessage = onSuccessMessage.querySelector('.success__button');
const onErrorMessage = document.querySelector('#error').content.querySelector('.error');
const buttonErrorMessage = onErrorMessage.querySelector('.error__button');

console.log(buttonErrorMessage);
console.log(buttonSuccessMessage);

const closedPopup = () => {
  document.body.removeChild(onSuccessMessage);
};

// сообщение при успешной загрузке
const popupSuccess = () => {
  document.body.append(onSuccessMessage);
  buttonSuccessMessage.addEventListener('click',closedPopup );
};


// сообщение об ошибке при загрузке
const popupError = () => {
  document.body.append(onErrorMessage);
};
//form.addEventListener('submit',popupSuccess);

// сообщение о статусе отправки

export {
  popupSuccess,
  popupError,
};
