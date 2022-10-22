import {avatarNumber} from './data.js';
import {randomLikeRange} from './data.js';
import {amountRandomComents} from './data.js';
import {randomIPosition} from './data.js';
import {DESCRIPTION} from './data.js';
import {NAME} from './data.js';
import {MESSAGE} from './data.js';

const getRandomNumber = (min, max) => {
  if ( max < 0 || min < 0 ){
    return NaN;
  }
  if ( min > max ) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const lengthCheck = (comment, maxLength) => comment.length <= maxLength;


const createComment = (i) => ({
  id: i ,
  avatar: `avatar-${ getRandomNumber(avatarNumber.min, avatarNumber.max)}.svg`,
  message:getRandomElement(MESSAGE),
  name: getRandomElement(NAME),
});

const generateRandomArrayComments = () => {
  const arrayComments = [];
  for (let i = getRandomNumber(randomIPosition.min, randomIPosition.max); i <= getRandomNumber(amountRandomComents.min, amountRandomComents.max); i++) {
    arrayComments.push(createComment(i));
  }
  return arrayComments;
};

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


const generateArrayProfiles = () => {
  const profiles = [];
  for ( let i = 1; i <= 25 ; i++ ) {
    profiles.push(createProfile(i));
  }
  return profiles;
};


export {
  getRandomElement,
  getRandomNumber,
  lengthCheck,
  generateArrayProfiles,
};
