import {profilesList} from './printElement.js';


// eslint-disable-next-line no-console
const thumbnails = document.querySelectorAll('.picture');
const fullScreenPicture = document.querySelector('.big-picture');
const bigPictureImg = fullScreenPicture.querySelector('.big-picture__img');
const bigLikesCount = fullScreenPicture.querySelector('.likes-count');
const bigCommentsCount = fullScreenPicture.querySelector('.comments-count');
const mainBody = document.querySelector('body');
// теперь нужно сделать чтобы при клике открывалась такая же картинка//
// чтобы открыть такое же изображение в полный экран нужно передать туда данные из миниатюры
// переписывать в ручную каждый селектор??? // передать из элемента ссылку на фотографию

const detailsWatching = (thumbnail, likes, comments) => {
  thumbnail.addEventListener('click', () => {
    fullScreenPicture.classList.remove('hidden');
	 mainBody.classList.add('modal-open');
    bigPictureImg.innerHTML = `<img src= ${thumbnail.src} alt="Случайная фотография" width="600" height="600"></img>`
	 bigLikesCount.textContent = likes.textContent;
	 bigCommentsCount.textContent = comments.textContent;
  });
};

for ( let thumbnail of thumbnails ) {
  let picture = thumbnail.querySelector('.picture__img');
  let likes = thumbnail.querySelector('.picture__likes');
  let comments = thumbnail.querySelector ('.picture__comments');
  detailsWatching(picture, likes, comments);

};


document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    fullScreenPicture.classList.add('hidden');
	 mainBody.classList.remove('modal-open');

  }
});



