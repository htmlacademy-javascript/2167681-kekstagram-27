import {profilesList} from './printElement.js';


// eslint-disable-next-line no-console
const thumbnails = document.querySelectorAll('.picture');
const fullScreenPicture = document.querySelector('.big-picture');

// теперь нужно сделать чтобы при клике открывалась такая же картинка//
// чтобы открыть такое же изображение в полный экран нужно передать туда данные из миниатюры
// переписывать в ручную каждый селектор??? // передать из элемента ссылку на фотографию

const detailsWatching = (thumbnail) => {
  thumbnail.addEventListener('click', () => {
    fullScreenPicture.classList.remove('hidden');
    let x = fullScreenPicture.querySelector('.big-picture__img');
    thumbnails.forEach((elem) => {
      x = elem.querySelector('.picture__likes');
      console.log(x);
    });
  });
};

for (let i = 0; i < thumbnails.length; i++) {
  detailsWatching(thumbnails[i]);
}

document.addEventListener('keydown', (evt)=> {
  if (evt.keyCode === 27) {
    fullScreenPicture.classList.add('hidden');
  }
});



