
const UARL = ['photos/1.jpg','photos/2.jpg', 'photos/3.jpg', 'photos/4.jpg',
  'photos/5.jpg', 'photos/6.jpg', 'photos/7.jpg', 'photos/8.jpg', 'photos/9.jpg',
  'photos/10.jpg', 'photos/11.jpg', 'photos/12.jpg','photos/13.jpg', 'photos/14.jpg',
  'photos/15.jpg', 'photos/16.jpg', 'photos/17.jpg', 'photos/18.jpg', 'photos/19.jpg',
  'photos/20.jpg', 'photos/21.jpg', 'photos/22.jpg', 'photos/23.jpg', 'photos/24.jpg',
  'photos/25.jpg',
];

const DISCRIPTION_DATA = ['Завидуйте молча!!!', 'Я так рад!',
  'Незабываемые впечатления', 'Вот она - жизнь!', 'Спасибо вам!',
  'Адреналин зашкаливает!', 'Не могу поверить...','Проснулся с утра, а тут...!',
  'Жаль, но пора домой.', 'Пока не поздно', 'Меня аж трясет'
];

const NAME_DATA = ['Магдалина', 'Майя', 'Макар', 'Максим', 'Марат', 'Маргарита', 'Марианна',
  'Марина', 'Мария', 'Марк', 'Марта', 'Мартин', 'Марфа', 'Матвей', 'Мелания', 'Мелисса', 'Милана',
  'Милена', 'Мирон', 'Мирослава','Лада', 'Лариса', 'Лев', 'Леон', 'Леонид', 'Леонтий', 'Леся', 'Лидия',
  'Лика', 'Лилиана', 'Лилия', 'Лина', 'Лолита', 'Казимир', 'Калерия', 'Камилла', 'Камиль', 'Капитолина',
  'Карина', 'Каролина', 'Касьян', 'Ким', 'Кир', 'Кира', 'Варвара', 'Василий', 'Василиса', 'Венера',
  'Вадим', 'Валентин', 'Валентина', 'Валерий', 'Валерия', 'Ванда', 'Сабина', 'Савва', 'Савелий', 'Саки',
  'Сакура', 'Самсон', 'Самуил', 'Сарра', 'Светлана', 'Святослав', 'Севастьян' ,'Никанор', 'Никита', 'Никифор'
  , 'Надежда', 'Назар', 'Наоми', 'Наталия', 'Наталья', 'Наум', 'Нелли', 'Ника', 'Глеб', 'Глория', 'Гордей', 'Грейс',
  'Эльвира', 'Эльдар', 'Эльза', 'Эмили', 'Эмилия', 'Эмма', 'Эрик', 'Эрика', 'Глафира', 'Болеслав', 'Борис',
  'Грета', 'Григорий', 'Гульмира', 'Беатрис', 'Белла', 'Бенедикт', 'Берта', 'Богдан', 'Божена',
  'Борислав', 'Бронислав', 'Бронислава', 'Булат',

];

const MESSAGE_DATA = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',

];

const AVATAR_DATA = [
  'avatar-1.svg',
  'avatar-2.svg',
  'avatar-3.svg',
  'avatar-4.svg',
  'avatar-5.svg',
  'avatar-6.svg',
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


const randomMessagePuckCreater = () => {
  const messagePuck = [];
  for (let i = getRandomNumber(1,2); i <= 2; i++) {
    messagePuck.push(getRandomElement(MESSAGE_DATA));
  }
  return messagePuck;
};


const createComment = (i) => ({
  id: getRandomNumber(1, 40) * i ,
  avatar: getRandomElement(AVATAR_DATA),
  message: randomMessagePuckCreater().join(' '),
  name: getRandomElement(NAME_DATA),

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
  discription: getRandomElement(DISCRIPTION_DATA),
  likes: getRandomNumber (15, 200),
  comments: generateRandomArrayComments(),
});


const generateArrayProfiles = () => {
  const profiles = [];
  for ( let i = 1; i <= 25 ; i++ ) {
    profiles.push(createProfile(i));

  }
  return profiles;
};

console.log((generateArrayProfiles()));

const lengthCheck = (comment, maxLength) => comment.length <= maxLength;

lengthCheck('ggggg', 6);
