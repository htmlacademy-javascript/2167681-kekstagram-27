import {showAlert} from './util.js';

//получение данных от сервера
const getServerData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((profilesData) => {
      onSuccess(profilesData);
    })
    .catch (() => {
      showAlert('Что-то пошло не так');
    });
};

// отправка данных серверу
const sendServerData = (onSuccess, onFail, body) => {
  fetch('https://27.jaascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  }).then((response) => {
    if(response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить данные. Попробуйте еще раз.');
    }
  }).catch(() => {
    onFail('Не удалось отправить данные. Попробуйте еще раз.');
  });
};

export{
  getServerData,
  sendServerData,
};
