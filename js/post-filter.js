import {renderPhotos} from './print-element.js';
import {getRandomUniqueElements, debounce} from './util.js';

const postsFilters = document.querySelector('.img-filters');
const randomPostsFilter = postsFilters.querySelector('#filter-random');
const descussedPostsFilter = postsFilters.querySelector('#filter-discussed');
const defaultPostsFilter = postsFilters.querySelector('#filter-default');

// количество постов подгружаемые "рандом фильтром"
const RANDOM_POST_COUNT = 10;

//смена миниатюр в зависимости от выбранного фильтра
const removePictures = () => {
  const picturesAll = document.querySelectorAll('.picture');
  picturesAll.forEach((picture) => {
    picture.remove();
  });
};

// подсветка кнопки фильтра
const removeActiveButton = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
};

// фильтр 10 случайных постов
const onRandomFilter = (posts) => {
  const postsArray = posts.slice();
  return getRandomUniqueElements(postsArray).slice(0, RANDOM_POST_COUNT);
};

// самые обсуждаемые - написать функию
const onDescussedPostsFilter = (posts) => {
  const postsArray = posts.slice();
  return postsArray.sort(compareComments);

};

// фильтр по умолчанию
const onDefaultPostsFilter = (posts) => posts.slice();

//сортировка по убыванию
function compareComments (postsA, postsB) {
  const commentsA = postsA.comments.length;
  const commentsB = postsB.comments.length;
  return commentsB - commentsA;
}

//смена постов из фильтров
const renderPicturesFilter = (posts) => {
  removePictures();
  renderPhotos(posts);
};

// Фильтры постов
const renderFilters = (data) =>{
  postsFilters.classList.remove('img-filters--inactive');
  postsFilters.addEventListener('click', debounce((evt) => {
    if (evt.target === randomPostsFilter || evt.target === descussedPostsFilter || evt.target === defaultPostsFilter) {
      removeActiveButton();
    }
    switch(evt.target) {
      case randomPostsFilter :
        renderPicturesFilter(onRandomFilter(data));
        randomPostsFilter.classList.add('img-filters__button--active');
        break;
      case descussedPostsFilter :
        renderPicturesFilter(onDescussedPostsFilter(data));
        descussedPostsFilter.classList.add('img-filters__button--active');
        break;
      case defaultPostsFilter :
        renderPicturesFilter(onDefaultPostsFilter(data));
        defaultPostsFilter.classList.add('img-filters__button--active');
        break;
    }
  }));
};


export {
  renderFilters
};
