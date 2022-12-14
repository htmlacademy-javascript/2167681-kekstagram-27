import {showBigPicture, onLoadFiveComments} from './big-photo.js';

//массив профилей(25шт)
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
    onLoadFiveComments();
  });
  return photoBlock;
};

//функция создания миниатюр
const renderPhotos = (serverData) => {
  const pictureFragment = document.createDocumentFragment();
  serverData.forEach((photo) => {
    pictureFragment.appendChild(renderPhoto(photo));
  });
  profilesList.appendChild(pictureFragment);

};


export {
  renderPhotos
};
