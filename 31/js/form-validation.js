import {isEscapeKey} from './bigPhoto.js';
import './scalePhoto.js';
import {resetScale} from './scalePhoto.js';
import {resetEffects} from './photoEffects.js';
import {sendServerData} from './servers-api.js';
import {pristine} from './pristineValidate.js';

//кнопка загрузки фото
const uploadFile = document.querySelector('#upload-file');
// тело сайта
const mainBody = document.querySelector('body');
//форма редактирования изображения
const editorImage = document.querySelector('.img-upload__overlay');
//кнопка закрытия редактора изображения
const closedEditorImage = document.querySelector('#upload-cancel');
//форма
const form = document.querySelector('.img-upload__form');
//поле хэштегов
const hashtagField = form.querySelector('.text__hashtags');
//поле описания фотографии
const commentField = form.querySelector('.text__description');
//кнопка отправки формы
const submitButton = form.querySelector('.img-upload__submit');

//шаблон сообщения об успешной загрузки фото
const onSuccessMessage = document.querySelector('#success').content.querySelector('.success');
const buttonSuccessMessage = onSuccessMessage.querySelector('.success__button');

//шаблон сообщения об ошибки загруски фото
const onErrorMessage = document.querySelector('#error').content.querySelector('.error');
const buttonErrorMessage = onErrorMessage.querySelector('.error__button');

/* // закрыть сообщение
const closedIfSuccess = (evt) => {
  if (isEscapeKey(evt) || evt.target !== onErrorMessage) {
    document.body.removeChild(onSuccessMessage);
  }
}; */

// ОБРАБОТЧИК ПОПАППА!!!1
const onOutsideClick = (evt) => {
  if (isEscapeKey(evt) || evt.target === onErrorMessage) {
    evt.preventDefault();
    mainBody.removeEventListener('click', onOutsideClick, );
    mainBody.removeEventListener('keydown', onOutsideClick,);
    document.body.removeChild(onErrorMessage);
  }
};

/* const ontarget = (evt) => {
  console.log(evt.target);
};

document.addEventListener('click', ontarget);
 */

/* function closedIfError () {
  document.body.removeChild(onErrorMessage);
  console.log('ddddd');
} */


/* // сообщение при успешной загрузке
const popupSuccess = () => {
  document.body.append(onSuccessMessage);
  mainBody.addEventListener('click',closedIfSuccess);
}; */


// ПОПАППП!!!!
const popupError = () => {
  document.body.append(onErrorMessage);
  mainBody.addEventListener('click', onOutsideClick,);
  mainBody.addEventListener('keydown', onOutsideClick,);
};


//блокировка esc при фокусе таргета input
hashtagField.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentField.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

//закрытие формы редактирования на клавишу Escape
const closedOnEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closerEditorImage();
    evt.preventDefault();
  }
};

//закрытие формы редактирования изображения
function closerEditorImage () {
  form.reset();
  pristine.reset();
  resetEffects();
  editorImage.classList.add('hidden');
  mainBody.classList.remove('modal-open');
  closedEditorImage.removeEventListener('click', closerEditorImage);
  form.removeEventListener('keydown', closedOnEscKeyDown);
}

//открытие формы редактирования изображения+
function openEditorImage () {
  resetScale();
  editorImage.classList.remove('hidden');
  mainBody.classList.add('modal-open');
  closedEditorImage.addEventListener('click', closerEditorImage);
  form.addEventListener('keydown', closedOnEscKeyDown);
}

//обработчик событий
uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  openEditorImage();

});

// блокировка кнопки отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохранение...';
};

// разблокировка кнопки отправки формы
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};


//функция отправления формы
const sendToServer = (onSuccess) => {
  form.addEventListener('submit', (evt)=> {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendServerData( () => {
        onSuccess();
        unblockSubmitButton();
        //popupSuccess();
      },
      () => {
        popupError();
        unblockSubmitButton();
      },
      new FormData(evt.target));
    }
  });
};

sendToServer(closerEditorImage);
