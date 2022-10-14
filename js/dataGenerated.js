import {getRandomElement} from './util.js';
import {getRandomNumber} from './util.js';
import {randomRangeNumberIdGenerator} from './util.js';


const avatarNumber = { // для случайного аватара
  min: 1,
  max: 6,
};

const randomLikeRange = { //для случайного коллличтва лайков
  min: 15,
  max: 200
};

const amountRandomComents = {// для случайного колличества коментариев
  min: 1,
  max: 150,
};

const profilesID = { // диапазон чисел для id профилей
  min: 1000,
  max: 9999,
};

const commentsID = {
  min: 10000,
  max: 99990,
};

const photoProfiles = { // диапазон чисел для фото в профиле - зависит от кол-ва фотографий для профилей
  min: 1,
  max: 25,
};

const createIdProfile = randomRangeNumberIdGenerator(profilesID.min, profilesID.max); //генерация случайных, не повторяющихся id для профилей
const createPhotoProfile = randomRangeNumberIdGenerator(photoProfiles.min, photoProfiles.max); // генерация случайных, не повторяющихся фото
const createCommentId = randomRangeNumberIdGenerator(commentsID.min, commentsID.max); //генерация случайных, не повторяющихся id для комментариев


const DESCRIPTION = ['Завидуйте молча!!!', 'Я так рад!',
  'Незабываемые впечатления', 'Вот она - жизнь!', 'Спасибо вам!',
  'Адреналин зашкаливает!', 'Не могу поверить...','Проснулся с утра, а тут...!',
  'Жаль, но пора домой.', 'Пока не поздно', 'Меня аж трясет'
];

const NAME = ['Магдалина', 'Майя', 'Макар', 'Максим', 'Марат', 'Маргарита', 'Марианна',
  'Марина', 'Мария', 'Марк', 'Марта', 'Мартин', 'Марфа', 'Матвей', 'Мелания', 'Мелисса', 'Милана',
  'Милена', 'Мирон', 'Мирослава','Лада', 'Лариса', 'Лев', 'Леон', 'Леонид', 'Леонтий', 'Леся', 'Лидия',
  'Лика', 'Лилиана', 'Лилия', 'Лина', 'Лолита', 'Казимир', 'Калерия', 'Камилла', 'Камиль', 'Капитолина',
];

const MESSAGE = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',

];


const createComment = () => ({
  id: createCommentId() ,
  avatar: `avatar-${ getRandomNumber(avatarNumber.min, avatarNumber.max)}.svg`,
  message:getRandomElement(MESSAGE),
  name: getRandomElement(NAME),

});

const generateRandomArrayComments = () => {
  const arrayComments = [];
  for (let i = 1; i <= getRandomNumber(amountRandomComents.min, amountRandomComents.max); i++) {
    arrayComments.push(createComment(i));
  }
  return arrayComments;
};


const createProfile = () => ({
  id: createIdProfile() ,
  url: `photos/${ createPhotoProfile() }.jpg`,
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


export {generateArrayProfiles};
