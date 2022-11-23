import {isEscapeKey} from './util.js';
import './scale-photo.js';
import {resetScale} from './scale-photo.js';
import {resetEffects} from './photo-effects.js';
import {sendServerData} from './servers-api.js';
import {pristine} from './pristine-validate.js';
import {photoUpload} from './image-uploader.js';

const uploadFile = document.querySelector('#upload-file');
const mainBody = document.body;
const editorImage = document.querySelector('.img-upload__overlay');
const closedEditorImage = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');


//шаблон сообщения об успешной загрузки фото
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

//шаблон сообщения об ошибки загруски фото
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');


const onErrorMessage = errorMessageTemplate.cloneNode(true);
const buttonErrorMessage = onErrorMessage.querySelector('.error__button');
const onSuccessMessage = successMessageTemplate.cloneNode(true);
const buttonSuccessMessage = onSuccessMessage.querySelector('.success__button');


// Сообщение о статусе загрузки фото
const messageStatusSubmit = (popappClass) => {
  switch (popappClass) {
    case onErrorMessage:
      editorImage.classList.add('hidden');
      document.body.append(onErrorMessage);
      onErrorMessage.addEventListener('click', onAnotherCloseError);
      mainBody.addEventListener('keydown', onAnotherCloseError);
      buttonErrorMessage.addEventListener('click', onAnotherCloseError);
      break;
    case onSuccessMessage:
      onCloseEditorImage();
      document.body.append(onSuccessMessage);
      onSuccessMessage.addEventListener('click', onAnotherCloseSuccess);
      mainBody.addEventListener('keydown', onAnotherCloseSuccess);
      buttonSuccessMessage.addEventListener('click', onAnotherCloseSuccess);
      break;
  }
};


// удаление попаппа с ошибкой
function onAnotherCloseError (evt) {
  if (isEscapeKey(evt) || evt.target === onErrorMessage || evt.target === buttonErrorMessage ) {
    hashtagField.focus();
    editorImage.classList.remove('hidden');
    onErrorMessage.removeEventListener('click', onAnotherCloseError);
    mainBody.removeEventListener('keydown', onAnotherCloseError);
    buttonErrorMessage.removeEventListener('click', onAnotherCloseError);
    document.body.removeChild(onErrorMessage);
  }
}
// удаление попаппа "все ок"
function onAnotherCloseSuccess (evt) {
  if (isEscapeKey(evt) || evt.target === onSuccessMessage || evt.target === buttonSuccessMessage ) {
    onSuccessMessage.removeEventListener('click', onAnotherCloseSuccess);
    mainBody.removeEventListener('keydown', onAnotherCloseSuccess);
    buttonSuccessMessage.removeEventListener('click', onAnotherCloseSuccess);
    document.body.removeChild(onSuccessMessage);
  }
}

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
const onCloseEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    onCloseEditorImage();
    evt.preventDefault();
  }
};

//закрытие формы редактирования изображения
/* function closerEditorImageTwo () {
  editorImage.classList.add('hidden');
  mainBody.classList.remove('modal-open');
  closedEditorImage.removeEventListener('click', closerEditorImage);
  form.removeEventListener('keydown', closedOnEscKeyDown);
} */

//закрытие формы редактирования изображения
function onCloseEditorImage () {
  form.reset();
  pristine.reset();
  resetEffects();
  editorImage.classList.add('hidden');
  mainBody.classList.remove('modal-open');
  closedEditorImage.removeEventListener('click', onCloseEditorImage);
  form.removeEventListener('keydown', onCloseEscKeyDown);
}

//открытие формы редактирования изображения+
function onOpenEditorImage () {
  resetScale();
  editorImage.classList.remove('hidden');
  mainBody.classList.add('modal-open');
  closedEditorImage.addEventListener('click', onCloseEditorImage);
  form.addEventListener('keydown', onCloseEscKeyDown);
}

//обработчик событий
uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  onOpenEditorImage();
  photoUpload();
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
        messageStatusSubmit(onSuccessMessage);
        unblockSubmitButton();
      },
      () => {
        messageStatusSubmit(onErrorMessage);
        unblockSubmitButton();
      },
      new FormData(evt.target));
    }
  });
};

sendToServer(onCloseEditorImage);

export {
  onOpenEditorImage,
};
