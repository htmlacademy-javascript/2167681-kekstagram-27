import {profilesList} from './printElement.js';
import {generateArrayProfiles} from './util.js';


const thumbnails = document.querySelectorAll('.picture');
const fullScreenPicture = document.querySelector('.big-picture');
const bigPictureImg = fullScreenPicture.querySelector('.big-picture__img');
const bigLikesCount = fullScreenPicture.querySelector('.likes-count');
const bigCommentsCount = fullScreenPicture.querySelector('.comments-count');
const bigSocialDescription = fullScreenPicture.querySelector('.social__caption');
const mainBody = document.querySelector('body');


const detailsWatching = ({url, likes, comments}) => {
  url.addEventListener('click', () => {
    fullScreenPicture.classList.remove('hidden');
    mainBody.classList.add('modal-open');
    bigPictureImg.innerHTML = `<img src= ${url.src} alt="${url.alt}" width="600" height="600"></img>`;
    bigLikesCount.textContent = likes.textContent;
    bigCommentsCount.textContent = comments.textContent;
    bigSocialDescription.textContent = url.alt;
  });
};

const commentGenerater = (data) => {
  console.log(data);
};

for ( const thumbnail of thumbnails ) {
  const picture = thumbnail.querySelector('.picture__img');
  const likes = thumbnail.querySelector('.picture__likes');
  const comments = thumbnail.querySelector ('.picture__comments');
  detailsWatching(picture, likes, comments);

//}


document.addEventListener('keydown', (evt) => {
  if (evt.key === 27) {
    fullScreenPicture.classList.add('hidden');
    mainBody.classList.remove('modal-open');

  }
});

