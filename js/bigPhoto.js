const bigPicture = document.querySelector('.big-picture');
const scrollOff = document.querySelector ('body');
const bigPictureClosed = bigPicture.querySelector('.big-picture__cancel');
const commentCount = bigPicture.querySelector('.comments-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const commentList = bigPicture.querySelector('.social__comments');
const commentContent = commentList.querySelector('.social__comment');
commentList.innerHTML = '';
commentCount.classList.add('hidden');
commentLoader.classList.add('hidden');

const bigPictureCloser = () => {
  bigPicture.classList.add('hidden');
  scrollOff.classList.remove('modal-open');
  bigPictureClosed.removeEventListener('click', bigPictureCloser);
  commentList.innerHTML = '';
};

const commentFormCreater = (comment) => {
  const commentSimular = commentContent.cloneNode(true);
  commentSimular.querySelector('.social__picture').innerHTML = `<img class="social__picture" src=${comment.avatar} alt="" width="35" height="35">`;
  commentSimular.querySelector('.social__picture').alt = comment.name;
  commentSimular.querySelector('.social__text').textContent = comment.message;
  return commentSimular;
};

const renderComments = (comments) => {
  const commentFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentFragment.appendChild(commentFormCreater(comment));
  });
  commentList.appendChild(commentFragment);
};

const showBigPicture = (picture) => {
  scrollOff.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.classList.remove('hidden');
  bigPictureClosed.addEventListener('click', bigPictureCloser);
  renderComments(picture.comments);
};

export {
  showBigPicture
};
