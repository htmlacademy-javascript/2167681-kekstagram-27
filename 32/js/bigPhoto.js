// фото крупным планом
const bigPicture = document.querySelector('.big-picture');
// "боди" сайта
const scrollOff = document.querySelector ('body');
// кнопка "закрыть" фото
const bigPictureClosed = bigPicture.querySelector('.big-picture__cancel');
// сколько комментариев к 1му фото всего
const commentCount = bigPicture.querySelector('.comments-count');
// кнопка "Загрузить еще"
const commentLoader = bigPicture.querySelector('.comments-loader');
// список комментариев к фото
const commentList = bigPicture.querySelector('.social__comments');
// шаблон комментария
const commentContent = commentList.querySelector('.social__comment');
// счетчик загруженных комментариев
const counterLoadComment = bigPicture.querySelector('.social__comment-count');
//копия массива с комментариями
let protoCommentsArr = [];

//функция использования клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//закрытие модалки на esc
const onEscKeyClosed = (evt) => {
  if(isEscapeKey(evt)) {
    bigPictureCloser();
  }
};

//закрытие модалки
function bigPictureCloser () {
  bigPicture.classList.add('hidden');
  scrollOff.classList.remove('modal-open');
  bigPictureClosed.removeEventListener('click', bigPictureCloser);
  document.removeEventListener('keydown', onEscKeyClosed);
  commentLoader.removeEventListener('click', renderCommentList);
  commentList.innerHTML = '';
}

//создание одного комментария
const commentFormCreater = (comment) => {
  const commentSimular = commentContent.cloneNode(true);
  commentSimular.querySelector('.social__picture').src = comment.avatar;
  commentSimular.querySelector('.social__picture').alt = comment.name;
  commentSimular.querySelector('.social__text').textContent = comment.message;
  return commentSimular;
};

// "живая" строка загруженных комментариев
const liveCommentCounter = () => {
  counterLoadComment.textContent = `${commentList.children.length} из ${commentCount.textContent} комментариев`;
};

// при загрузки всех комментариев кнопка "Загрузить комментарии" скрывается
const onCommetsLoaderHide = () => {
  if (protoCommentsArr.length === 0) {
    commentLoader.classList.add('hidden');
  }
};

//отрисовка массива комментариев
const renderComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentFragment.appendChild(commentFormCreater(comment));
  });
  commentList.appendChild(commentFragment);
  onCommetsLoaderHide();
  liveCommentCounter();

};

//отрисовка комментариев по 5шт
function renderCommentList () {
  renderComments(protoCommentsArr.splice(0, 5));

}

//открытие модалки
const showBigPicture = (picture) => {
  scrollOff.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img' ).src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  commentCount.textContent = picture.comments.length;
  counterLoadComment.textContent = `0 из ${commentCount.textContent} комментариев`;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  bigPictureClosed.addEventListener('click', bigPictureCloser);
  document.addEventListener('keydown', onEscKeyClosed);
  commentLoader.addEventListener('click', renderCommentList);
  protoCommentsArr = picture.comments.slice();
  commentList.innerHTML = '';

};


export {
  showBigPicture,
  isEscapeKey,
  renderCommentList,
};
