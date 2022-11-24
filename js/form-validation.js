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
const scaleControlValue = document.querySelector('.scale__control--value');

//шаблон сообщения об успешной загрузки фото
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

//шаблон сообщения об ошибки загруски фото
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const onErrorMessage = errorMessageTemplate.cloneNode(true);
const buttonErrorMessage = onErrorMessage.querySelector('.error__button');
const onSuccessMessage = successMessageTemplate.cloneNode(true);
const buttonSuccessMessage = onSuccessMessage.querySelector('.success__button');

//события для обработчиков на попаппе "ошибка"
const onClickCloseError = (evt) => {
  if (evt.target === onErrorMessage) {
    onAnotherCloseError();
  }
};

const onEscCloseError = (evt) => {
  if (isEscapeKey(evt)) {
    onAnotherCloseError();
  }
};

const onVoidClickCloseError = (evt) => {
  if (evt.target === buttonErrorMessage) {
    onAnotherCloseError();
  }
};

//события для обработчиков на попаппе "успешно"
const onClickCloseSuccess = (evt) => {
  if (evt.target === onSuccessMessage) {
    onAnotherCloseSuccess();
  }
};

const onEscCloseSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    onAnotherCloseSuccess();
  }
};

const onVoidClickCloseSuccess = (evt) => {
  if (evt.target === buttonSuccessMessage) {
    onAnotherCloseSuccess();
  }
};

// Сообщение о статусе загрузки фото
const messageStatusSubmit = (popappClass) => {
  switch (popappClass) {
    case onErrorMessage:
      editorImage.classList.add('hidden');
      document.body.append(onErrorMessage);
      onErrorMessage.addEventListener('click', onClickCloseError);
      mainBody.addEventListener('keydown', onEscCloseError);
      buttonErrorMessage.addEventListener('click', onVoidClickCloseError);
      break;
    case onSuccessMessage:
      onCloseEditorImage();
      document.body.append(onSuccessMessage);
      onSuccessMessage.addEventListener('click', onClickCloseSuccess);
      mainBody.addEventListener('keydown', onEscCloseSuccess);
      buttonSuccessMessage.addEventListener('click', onVoidClickCloseSuccess);
      break;
  }
};

// удаление попаппа с ошибкой
function onAnotherCloseError () {
  editorImage.classList.remove('hidden');
  scaleControlValue.focus();
  onErrorMessage.removeEventListener('click', onClickCloseError);
  mainBody.removeEventListener('keydown', onEscCloseError);
  buttonErrorMessage.removeEventListener('click', onVoidClickCloseError);
  document.body.removeChild(onErrorMessage);
}

// удаление попаппа "все ок"
function onAnotherCloseSuccess () {
  onSuccessMessage.removeEventListener('click', onClickCloseSuccess);
  mainBody.removeEventListener('keydown', onEscCloseSuccess);
  buttonSuccessMessage.removeEventListener('click', onVoidClickCloseSuccess);
  document.body.removeChild(onSuccessMessage);
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
