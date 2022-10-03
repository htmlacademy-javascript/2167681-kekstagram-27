const getRandomNumber = (min, max) => {
  if ( max < 0 || min < 0 ){
    return NaN;
  }
  if ( min > max ) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomNumber(10, 5);

const lengthCheck = (comment, maxLength) => comment.length <= maxLength;

lengthCheck('ggggg', 6);
