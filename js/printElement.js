import {generateArrayProfiles} from './util.js';
import {commentGenerater} from './main.js';
import {detailsWatching} from './main.js';

//массив профилей(25шт.)
const dataProfiles = generateArrayProfiles();


const profilesList = document.querySelector('.pictures');
const templateProfile = document.querySelector('#picture').content.querySelector('.picture');
const profileListFragment = document.createDocumentFragment();


// функция создания блока профиля

  

dataProfiles.forEach(({url, likes, comments, description}) => {
  const photoBlock = templateProfile.cloneNode(true);
  photoBlock.querySelector('.picture__comments').textContent = comments.length;
  photoBlock.querySelector('.picture__img').src = url;
  photoBlock.querySelector('.picture__img').alt = description;
  photoBlock.querySelector('.picture__likes').textContent = likes;
  profileListFragment.append(photoBlock);

});

profilesList.appendChild(profileListFragment);

export {
  profilesList,

};

