import {generateArrayProfiles} from './util.js';
import {showBigPicture} from './bigPhoto.js';

//массив профилей(25шт)
const dataProfiles = generateArrayProfiles();
const profilesList = document.querySelector('.pictures');
const templateProfile = document.querySelector('#picture').content.querySelector('.picture');

// функция создания блока профиля
const renderPhoto = (picture) => {
  const photoBlock = templateProfile.cloneNode(true);
  photoBlock.querySelector('.picture__comments').textContent = picture.comments.length;
  photoBlock.querySelector('.picture__img').src = picture.url;
  photoBlock.querySelector('.picture__likes').textContent = picture.likes;
  photoBlock.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  });
  return photoBlock;

};

const renderPhotos = () => {
  const pictureFragment = document.createDocumentFragment();
  dataProfiles.forEach((photo) => {
    pictureFragment.appendChild(renderPhoto(photo));
  });
  profilesList.appendChild(pictureFragment);

};


export {
  renderPhotos
};
