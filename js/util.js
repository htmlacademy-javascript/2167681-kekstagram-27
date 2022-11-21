import {avatarNumber} from './data.js';
import {randomLikeRange} from './data.js';
import {amountRandomComents} from './data.js';
import {randomIPosition} from './data.js';
import {DESCRIPTION} from './data.js';
import {NAME} from './data.js';
import {MESSAGE} from './data.js';

const ALERT_SHOW_TIME = 5000;

// Генератор случайных чисел
const getRandomNumber = (min, max) => {
  if ( max < 0 || min < 0 ){
    return NaN;
  }
  if ( min > max ) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Генератор массива случайной длинны
const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

//ограничение на длинну комментария
const lengthCheck = (comment, maxLength) => comment.length <= maxLength;

// debounce - устраниние дребезга
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

//Шаблон формы комментария
const createComment = (i) => ({
  id: i ,
  avatar: `img/avatar-${ getRandomNumber(avatarNumber.min, avatarNumber.max)}.svg`,
  message:getRandomElement(MESSAGE),
  name: getRandomElement(NAME),
});

// Генератор случайного колличества комментариев
const generateRandomArrayComments = () => {
  const arrayComments = [];
  for (let i = getRandomNumber(randomIPosition.min, randomIPosition.max); i <= getRandomNumber(amountRandomComents.min, amountRandomComents.max); i++) {
    arrayComments.push(createComment(i));
  }
  return arrayComments;
};

// Шаблон формы профиля
const createProfile = (i) => ({
  id: i ,
  url: `photos/${ i }.jpg`,
  description: getRandomElement(DESCRIPTION),
  likes: getRandomNumber (randomLikeRange.min, randomLikeRange.max),
  comments: generateRandomArrayComments(),
  avatar: `avatar-${ getRandomNumber(avatarNumber.min, avatarNumber.max)}.svg`,
  message:getRandomElement(MESSAGE),
  name: getRandomElement(NAME),

});

// Генератор массива профилей
const generateArrayProfiles = () => {
  const profiles = [];
  for ( let i = 1; i <= 25 ; i++ ) {
    profiles.push(createProfile(i));
  }
  return profiles;
};

//div ошибка
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция, создающая не повторяющийся массив элементов
const getRandomUniqueElements = (arr) => {
  const newArray = arr.slice();
  const elements = [];
  const newArrayLength = arr.length;
  for (let i = 0; i < newArrayLength; i++) {
    const randomId = getRandomNumber(0, newArray.length - 1);
    elements.push(newArray[randomId]);
    newArray.splice(randomId, 1);
  }
  return elements;
};
export {
  getRandomElement,
  getRandomNumber,
  lengthCheck,
  generateArrayProfiles,
  showAlert,
  getRandomUniqueElements,
  debounce,
};

