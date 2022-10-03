const searchNumber = (min, max) => {
  let result;
  if ( max < 0 || min < 0 ) {
    result = 'NaN';
  } else if (min > max || max < min) {
    const swap = min;
    min = max;
    max = swap;
    result = Math.floor(Math.random() * (max - min + 1)) + min;

  } else {
    result = Math.floor(Math.random() * (max - min + 1)	) + min;
  }

  return result;

};
searchNumber(111, 1111); /* Если ввести проверку searchNumber(111, fffff)
                         в консоле появляется ошибка Uncaught Reference Error: fffff is not defined изменить на NaN
								 так и не получилось. Если это критично, то думаю стоит провести консультацию.*/
const lengthCheck = (comment, maxLength) => {
  const x = comment.length > maxLength ? ('Превышенно максимальное количество символов') : ('Комментарий опубликован');
  return x;
};

lengthCheck('ggggg', 5);
