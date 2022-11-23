import {showAlert} from './util.js';

const FOR_GET_DATA_URL = 'https://27.javascript.pages.academy/kekstagram/data';
const FOR_SEND_DATA_URL = 'https://27.javascript.pages.academy/kekstagram';

//получение данных от сервера
const getServerData = (onSuccess) => {
  fetch(FOR_GET_DATA_URL)
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
  fetch(FOR_SEND_DATA_URL, {
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
