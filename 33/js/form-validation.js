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

//загрузка фото
const fileUploader = document.querySelector('input[type=file]');
const imagePreview = document.querySelector('.img-upload__preview img');
//шаблон сообщения об успешной загрузки фото
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

//шаблон сообщения об ошибки загруски фото
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');


const onErrorMessage = errorMessageTemplate.cloneNode(true);
const buttonErrorMessage = onErrorMessage.querySelector('.error__button');
const onSuccessMessage = successMessageTemplate.cloneNode(true);
const buttonSuccessMessage = onSuccessMessage.querySelector('.success__button');


const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const photoUploader = () => {
  const file = fileUploader.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);

  }
};

// Сообщение о статусе загрузки фото
const messageStatusSubmit = (popappClass) => {
  switch (popappClass) {
    case onErrorMessage:
      closerEditorImageTwo();
      document.body.append(onErrorMessage);
      onErrorMessage.addEventListener('click', onAnotherClosedError);
      mainBody.addEventListener('keydown', onAnotherClosedError);
      buttonErrorMessage.addEventListener('click', onAnotherClosedError);
      break;
    case onSuccessMessage:
      closerEditorImage();
      document.body.append(onSuccessMessage);
      onSuccessMessage.addEventListener('click', onAnotherClosedSuccess);
      mainBody.addEventListener('keydown', onAnotherClosedSuccess);
      buttonSuccessMessage.addEventListener('click', onAnotherClosedSuccess);
      break;
  }
};


// удаление попаппа с ошибкой
function onAnotherClosedError (evt) {
  if (isEscapeKey(evt) || evt.target === onErrorMessage || evt.target === buttonErrorMessage ) {
    onErrorMessage.removeEventListener('click', onAnotherClosedError);
    mainBody.removeEventListener('keydown', onAnotherClosedError);
    buttonErrorMessage.removeEventListener('click', onAnotherClosedError);
    document.body.removeChild(onErrorMessage);
  }
}
// удаление попаппа "все ок"
function onAnotherClosedSuccess (evt) {
  if (isEscapeKey(evt) || evt.target === onSuccessMessage || evt.target === buttonSuccessMessage ) {
    onSuccessMessage.removeEventListener('click', onAnotherClosedSuccess);
    mainBody.removeEventListener('keydown', onAnotherClosedSuccess);
    buttonSuccessMessage.removeEventListener('click', onAnotherClosedSuccess);
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
const closedOnEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closerEditorImage();
    evt.preventDefault();
  }
};

//закрытие формы редактирования изображения
function closerEditorImageTwo () {
  editorImage.classList.add('hidden');
  mainBody.classList.remove('modal-open');
  closedEditorImage.removeEventListener('click', closerEditorImage);
  form.removeEventListener('keydown', closedOnEscKeyDown);
}

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
  photoUploader();
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

sendToServer(closerEditorImage);

export {
  openEditorImage,
};
