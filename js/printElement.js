import {generateArrayProfiles} from './util.js';

const dataProfiles = generateArrayProfiles(); //массив профилей(25шт.)

const profilesList = document.querySelector('.pictures');
const templateProfile = document.querySelector('#picture').content.querySelector('.picture');
const profileListFragment = document.createDocumentFragment();


// функция создания блока профиля
dataProfiles.forEach(({url, likes, comments}) => {
  const photoBlock = templateProfile.cloneNode(true);
  photoBlock.querySelector('.picture__comments').textConten = comments;
  photoBlock.querySelector('.picture__img').src = url;
  photoBlock.querySelector('.picture__likes').textContent = likes;
  profileListFragment.append(photoBlock);
});

profilesList.appendChild(profileListFragment);
