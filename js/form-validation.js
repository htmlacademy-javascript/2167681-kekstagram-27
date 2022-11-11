import {isEscapeKey} from './bigPhoto.js';
import './scalePhoto.js';
import {resetScale} from './scalePhoto.js';
import {resetEffects} from './photoEffects.js';
import {sendServerData} from './servers-api.js';
import {showAlert} from './util.js';
import {popupSuccess} from './validate-popup.js';

//данные из ТЗ для формы
const MAX_HASHTAG_COUNTS = 5;

//требования к хэштэгу: начинается с # доступные буквы а-я,a-z(нижнего и верхнего регистра), цифры 0-9, длинна хэштэга 1-19
const VALID_HASHTAG_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const regExpValidTag = new RegExp(VALID_HASHTAG_SIMBOLS);
const MAX_LENGTH_DESCRIPTION = 140;

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

//проверка длинны комментария к фото
const checkLengthDescriptionPhoto = (text) => text.length <= MAX_LENGTH_DESCRIPTION;

//проверка регистров Хэштэга
const checkDublicateHashtags = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ').filter((tag) => tag !== '');
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};


//проверка валидности хэштега (длинна и формат разделение пробелами)
const checkOneHashtag = (tag) => regExpValidTag.test(tag);
const checkValidHashtags = (tags) =>{
  if (tags === '') {
    return true;
  }
  return tags.trim().split(' ').every(checkOneHashtag);
};
//функция макс количества хэштэгшов
const hashtagsMaxCount = (tags) => tags.trim().split(' ').filter((tag) => tag !== '').length <= MAX_HASHTAG_COUNTS;

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

//подключение формы  к Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper-error'
});

// валидатор
pristine.addValidator(commentField, checkLengthDescriptionPhoto, 'Максимум 140 символов');
pristine.addValidator(hashtagField, checkDublicateHashtags, 'Хэштэги должны отличаться');
pristine.addValidator(hashtagField, hashtagsMaxCount, 'Максимум 5 хэштегов');
pristine.addValidator(hashtagField, checkValidHashtags, 'Хэштэги разделяются одним пробелом. Хэштэг должен начинаться с \'#\', кол-во символов не должно превышать 20 и включает в себя только буквы и цифры',);

//закрытие формы редактирования изображения
function closerEditorImage () {
  form.reset();
  pristine.reset();
  resetEffects();
  editorImage.classList.add('hidden');
  mainBody.classList.remove('modal-open');
  closedEditorImage.removeEventListener('click', closerEditorImage);
  document.removeEventListener('keydown', closedOnEscKeyDown);
}

//открытие формы редактирования изображения
const openEditorImage = () => {
  resetScale();
  editorImage.classList.remove('hidden');
  mainBody.classList.add('modal-open');
  closedEditorImage.addEventListener('click', closerEditorImage);
  document.addEventListener('keydown', closedOnEscKeyDown);
};

//обработчик событий
uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  openEditorImage();

});


// блокировка кнопки отправки формы
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

// разблокировка кнопки отправки формы
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Отправить';
};

/* //блокировка отправки формы в случае неверно заполненной формы
form.addEventListener('input', () => {
  const isValid = pristine.validate();
  submitButton.disabled = !isValid;
});
 */

//
const sendToServer = (onSuccess) => {
  form.addEventListener('submit', (evt)=> {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendServerData( () => {
        onSuccess();
        unblockSubmitButton();
        popupSuccess();
      },
      () => {
        showAlert('джыга дрыга');
        unblockSubmitButton();
      },
      new FormData(evt.target));
    }
  });
};

sendToServer(closerEditorImage);
