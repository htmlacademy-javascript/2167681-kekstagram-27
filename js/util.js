

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

function randomRangeNumberIdGenerator (min, max) {// функция - замыкание, для генерации случайных не повторяющихся чисел
  const previousIdValues = [];
  return function () {
    let currentValue = getRandomNumber(min, max);
    if (previousIdValues.length >= (max - min + 1 )) {

      return null;
    }
    while (previousIdValues.includes(currentValue)) {
      currentValue = getRandomNumber(min, max);
    }
    previousIdValues.push(currentValue);
    return currentValue;
  };
}

const lengthCheck = (comment, maxLength) => comment.length <= maxLength;


export {
  getRandomElement,
  getRandomNumber,
  lengthCheck,
  randomRangeNumberIdGenerator,
};

