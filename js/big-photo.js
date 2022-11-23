import {isEscapeKey} from './util.js';

const AMOUNT_COMENTS_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const scrollOff = document.querySelector ('body');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.comments-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentList = bigPicture.querySelector('.social__comments');
const commentContent = commentList.querySelector('.social__comment');
const counterLoadComment = bigPicture.querySelector('.social__comment-count');

//копия массива с комментариями
let protoCommentsArr = [];

//закрытие модалки на esc
const onEscKeyClose = (evt) => {
  if(isEscapeKey(evt)) {
    onBigPictureClose();
  }
};

//закрытие модалки
function onBigPictureClose () {
  bigPicture.classList.add('hidden');
  scrollOff.classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', onBigPictureClose);
  document.removeEventListener('keydown', onEscKeyClose);
  commentLoader.removeEventListener('click', onRenderCommentList);
  commentList.innerHTML = '';
}

//создание одного комментария
const commentFormCreate = (comment) => {
  const commentSimular = commentContent.cloneNode(true);
  commentSimular.querySelector('.social__picture').src = comment.avatar;
  commentSimular.querySelector('.social__picture').alt = comment.name;
  commentSimular.querySelector('.social__text').textContent = comment.message;
  return commentSimular;
};

// "живая" строка загруженных комментариев
const liveCommentCount = () => {
  counterLoadComment.textContent = `${commentList.children.length} из ${commentCount.textContent} комментариев`;
};

// при загрузки всех комментариев кнопка "Загрузить комментарии" скрывается
const hideCommentsLoad = () => {
  if (protoCommentsArr.length === 0) {
    commentLoader.classList.add('hidden');
  }
};

//отрисовка массива комментариев
const renderComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentFragment.appendChild(commentFormCreate(comment));
  });
  commentList.appendChild(commentFragment);
  hideCommentsLoad();
  liveCommentCount();

};

//отрисовка комментариев по 5шт
function onRenderCommentList () {
  renderComments(protoCommentsArr.splice(0, AMOUNT_COMENTS_LOAD));

}

//открытие модалки
const showBigPicture = (picture) => {
  scrollOff.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  commentCount.textContent = picture.comments.length;
  counterLoadComment.textContent = `0 из ${commentCount.textContent} комментариев`;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  bigPictureCloseButton.addEventListener('click', onBigPictureClose);
  document.addEventListener('keydown', onEscKeyClose);
  commentLoader.addEventListener('click', onRenderCommentList);
  protoCommentsArr = picture.comments.slice();
  commentList.innerHTML = '';
};

export {
  showBigPicture,
  isEscapeKey,
  onRenderCommentList,
};
