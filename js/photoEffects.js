const imgUploadSection = document.querySelector('.img-upload__overlay');
//форма редактирования изображения
const form = document.querySelector('.img-upload__form');
// элемент к которому подключается слайдер
const slider = imgUploadSection.querySelector('.effect-level__slider');
//превью изображения
const photoPreview = form.querySelector('.img-upload__preview > img');
// элемент куда записываюься значения наложенного эффекта
const effectLevel = form.querySelector('.effect-level__value');

// параметры эффектов
const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0.1,
    max: 1,
    step:0.1,
    unit: '',
  },
  {
    name:'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name:'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name:'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name:'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

// начальное состояние изображения
const DEFAULT_EFFECT = EFFECTS[0];
// выбранный эффект
let chosenEffect = DEFAULT_EFFECT;
//проверка на начальное состоние изображения для отключение слайдера
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

//функция измениния  параметров эффекта
const updateSlider = () => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    slider.classList.add('hidden');
  }
};

// функция переключения эффектов
const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  console.log(chosenEffect);
  updateSlider();
};

//передача значений для редактирования стилей
const onSliderUpdate = () => {
  photoPreview.style.filter = 'none';
  photoPreview.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = slider.noUiSlider.get();
  photoPreview.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  photoPreview.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevel.value = sliderValue;
  console.log(photoPreview.style.filter);
};

//сброс значений
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};
//создание слайдера
noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});
updateSlider();
console.log(slider);
//обработчики событий
form.addEventListener('change', onFormChange);
slider.noUiSlider.on('update', onSliderUpdate);
console.log(chosenEffect);

export {
  resetEffects,
};
