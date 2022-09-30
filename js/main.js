const searchNumber = function (min, max) {
  if ( min < 0 || max < 0 ) {
    // eslint-disable-next-line no-alert
    return alert('Только натуральные числа!');
  } return Math.floor(Math.random() * (+(max - min + 1))) + (+min);

};

/* Пробовал вариант с тернарным оператором и стрелочной функцией, но не удалось совместить

const searchNumber = (min, max) => {
  min < 0 || max < 0 ?  (alert ('Только натуральные числа!')):
	 ( Math.floor(Math.random() * (+(max - min + 1))) + (+min);
};*/