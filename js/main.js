const searchNumber = (min, max) => {
  if ( max < 0 || min < 0 ) {
    // eslint-disable-next-line no-alert
    min += 'ggg';
    alert ('Только натуральные числа!');
  } else if (min >= max || max <= min) {
    min += 'ggg';
    alert ('Не допустимый порядок ввода');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;

};



const lengthCheck = (comment, maxLength) => {
  const x = comment.length > maxLength ? alert('Превышенно максимальное количество символов') : alert('Комментарий опубликован')
};

lengthCheck('ggggg', 5);
