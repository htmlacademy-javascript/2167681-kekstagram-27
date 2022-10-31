import {renderPhotos} from './printElement.js';
import {isEscapeKey} from './bigPhoto.js';
renderPhotos();


const uploadFile = document.querySelector('#upload-file');
const mainBody = document.querySelector('body');
const editorImage = document.querySelector('.img-upload__overlay');
const closedEditorImage = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

//требования к хэштегам
const MAX_HASHTAG_COUNTS = 5;
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

//функция валидации хэштэгов//из поля хэштэгов
const validHashtag = (value) => VALID_SIMBOLS.test(value);

//функция макс количества хэштэгшов
const hashtagsMaxCount = (tags) => {

};
//закрытие формы редактирования на клавишу Escape// не очищается текстовое поле


const closedOnEscKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closerEditorImage();
    evt.preventDefault();
  }
};

//подключение формы  к Pristine
const pristine = new Pristine(form, {
  classToo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

console.log(hashtagField);

const lengthCheck = (value) => value.length >= 2 && value.length <= 140;

pristine.addValidator(hashtagField, validHashtag, 'От да да да');


pristine.addValidator(commentField, lengthCheck, 'От да да да');

//закрытие формы редактирования изображения
function closerEditorImage () {
  form.reset();
  editorImage.classList.add('hidden');
  mainBody.classList.remove('modal-open');
  closedEditorImage.removeEventListener('click', closerEditorImage);
  document.removeEventListener('keydown', closedOnEscKeyDown);
}

//открытие формы редактирования изображения
const openEditorImage = () => {
  editorImage.classList.remove('hidden');
  mainBody.classList.add('modal-open');
  closedEditorImage.addEventListener('click', closerEditorImage);
  document.addEventListener('keydown', closedOnEscKeyDown);
};


//обработчик событий
uploadFile.addEventListener('click', (evt) => {
  evt.preventDefault();
  openEditorImage();
});

form.addEventListener('submit', (evt) => {
  //evt.preventDefault();
  pristine.validate();
});
