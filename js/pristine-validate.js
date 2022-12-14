//данные из ТЗ для формы
const MAX_HASHTAG_COUNTS = 5;
//требования к хэштэгу: начинается с # доступные буквы а-я,a-z(нижнего и верхнего регистра), цифры 0-9, длинна хэштэга 1-19
const VALID_HASHTAG_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_LENGTH_DESCRIPTION = 140;

const form = document.querySelector('.img-upload__form');
const commentField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');

// проверка длинны комментария к фото
const checkLengthDescriptionPhoto = (text) => text.length <= MAX_LENGTH_DESCRIPTION;

// проверка регистров Хэштэга
const checkDublicateHashtags = (value) => {
  const hashtags = value.trim().toLowerCase().split(' ').filter((tag) => tag !== '');
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

// проверка валидности хэштэга (длинна, формат, разделение пробелами)
const checkOneHashtag = (tag) => VALID_HASHTAG_SIMBOLS.test(tag);
const checkValidHashtags = (tags) =>{
  if (tags === '') {
    return true;
  }
  return tags.trim().split(' ').every(checkOneHashtag);
};

// максимальное количество хэштэгов
const countMaxHashtags = (tags) => tags.trim().split(' ').filter((tag) => tag !== '').length <= MAX_HASHTAG_COUNTS;

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
pristine.addValidator(hashtagField, countMaxHashtags, 'Максимум 5 хэштегов');
pristine.addValidator(hashtagField, checkValidHashtags, 'Хэштэги разделяются одним пробелом. Хэштэг должен начинаться с \'#\', кол-во символов не должно превышать 20 и включает в себя только буквы и цифры',);

export {
  pristine,
};
