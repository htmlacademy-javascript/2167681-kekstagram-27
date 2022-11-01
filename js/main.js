import {renderPhotos} from './printElement.js';
import {isEscapeKey} from './bigPhoto.js';
renderPhotos();

const uploadFile = document.querySelector('#upload-file');
const mainBody = document.querySelector('body');
const editorImage = document.querySelector('.img-upload__overlay');
const closedEditorImage = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');


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

const chekDescriptionLength = (value) => value.length <= 10;

//подключение формы  к Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper-error'
});
pristine.addValidator(hashtagField, chekDescriptionLength,);
pristine.addValidator(hashtagField, validHashtag, 'Хэштэг должен начинаться с \'#\', кол-во символов не должно превышать 20 и включает в себя только буквы и цифры');

//закрытие формы редактирования изображения
function closerEditorImage () {
  form.reset();
  //pristine.reset();
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
uploadFile.addEventListener('change', (evt) => {
  evt.preventDefault();
  openEditorImage();

});


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
});

hashtagField.addEventListener('change', () => {
  pristine.validate();
});
