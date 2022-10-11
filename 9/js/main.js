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

const getRandomNumber = (min, max) => {
  if ( max < 0 || min < 0 ){
    return NaN;
  }
  if ( min > max ) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) =>elements[getRandomNumber(0, elements.length - 1)];

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};


const createComment = (i) => ({
  id: getRandomNumber(1, 40) * i ,
  avatar: `avatar-${ getRandomNumber(1, 6)}.svg`,
  message:getRandomElement(MESSAGE),
  name: getRandomElement(NAME),

});

const generateRandomArrayComments = () => {
  const arrayComments = [];
  for (let i = getRandomNumber(1, 10); i <= getRandomNumber(5, 150); i++) {
    arrayComments.push(createComment(i));
  }
  return arrayComments;
};

const createProfile = (i) => ({
  id: i ,
  url: `photos/${ i }.jpg`,
  description: getRandomElement(DESCRIPTION),
  likes: getRandomNumber (15, 200),
  comments: generateRandomArrayComments(),
  avatar: `avatar-${ getRandomNumber(1, 6)}.svg`,
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

const lengthCheck = (comment, maxLength) => comment.length <= maxLength;

lengthCheck('ggggg', 6);
getRandomArrayElement();
generateArrayProfiles();
