import './styles.css';

// ----------------------------> Создали шабоны разметки и импортировали их

import listTemplete from './template/list.hbs';

// ----------------------------> Импортируем плагин уведомлений - PNotify
import { notice, success, info, error, defaultModules} from '../node_modules/@pnotify/core/dist/PNotify.js';
import "@pnotify/core/dist/PNotify.css";                     //---> Импортирт стилей
import '@pnotify/core/dist/BrightTheme.css';                 //---> Импортирт цветовой гаммы
import 'material-design-icons/iconfont/material-icons.css'; //---> Импортирт иконок

// ---------------------------->

// const basicLightbox = require('basiclightbox')
// import "basiclightbox/src/styles/main.scss"
// import {basicLightbox} from '../node_modules/basiclightbox/src/scripts/main.js';


// import * as basicLightbox from 'basiclightbox'


// ----------------------------> Изменили дефолтные настройки уведомлений (PNotify)
const PNotify = {
    title: 'Info',
    delay: 1500,          //---> Удаляется автоматически
    sticker: false,       //---> Удаляет стиккер
    closerHover: false,   //---> Видно иконку закрытия
}

// ----------------------------> Общие данные:

const API = {
    key: '20057586-194248245024f7fdf6233c620',
    page: 1,
    onPage: 12,
    search: '',
}

const REF = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('#name-input'),
    btn: document.querySelector('button[data-search="search"]'),
    btnOpen: document.querySelector('button[data-search="open"]'),
    btnClose: document.querySelector('button[data-search="close"]'),
    box: document.querySelector('#js-search'),
}

const instance = basicLightbox.create(`
/<img width="1400" height="900" src="https://placehold.it/1400x900">`,
    { closable: true })
        
REF.btnOpen.addEventListener('click', () => {
instance.show();
}
);

REF.btnClose.addEventListener('click', () => {
instance.close();
}
);

// ----------------------------> Ф-я поиска:

function fnSubmit(event) {
    if (REF.input.value.length > 0) {
        event.preventDefault();
        API.search = REF.input.value;
        // const form = event.currentTarget // form.reset();
        REF.box.innerHTML = '';
        API.page = 1;
        fnFetchServer(API.search);
    }
    return;
}

// ----------------------------> Ф-я дозагрузки:

function fnClick() {
    API.page = API.page + 1;
    fnFetchServer(API.search);
}

// ----------------------------> События:

REF.form.addEventListener('submit', fnSubmit);
REF.btn.addEventListener('click', fnClick);

// ----------------------------> Ф-я запроса на сервер:

function fnFetchServer() {
    const url = `https://pixabay.com/api/?image_type=photo&key=${API.key}&page=${API.page}&per_page=${API.onPage}&orientation=horizontal&q=${API.search}`;
        return fetch(url)
            .then(responce => responce.json())
            .then(data => fnTemplate(data))
            .catch(() => console.warn('Ошибка связи с сервером'));
};

// ----------------------------> Ф-я создания DOM-дерева:
function fnTemplate(data) {
    const template = listTemplete(data.hits);
    REF.box.insertAdjacentHTML('beforeend', template);
    REF.btn.classList.remove("hiden");
    window.scrollTo({
        top: document.documentElement.offsetHeight,
        left: 100,
        behavior: 'smooth'
    });
}


// const fnTemplate = (data) => {
//     console.log(data);
//     const boxRef = document.querySelector('.js-search');
//     boxRef.innerHTML = '';
    
//     if (data.length > 10) {
//         info({
//             ...PNotify,
//             text: 'Результат поиска > 10 стран. Введите более точное название страны.',
//         });
//         return;
//     }
//     if (data.length === 1) {
//         const template = cardTemplete(data);
//         boxRef.insertAdjacentHTML('beforeend', template);
//         success({
//             ...PNotify,
//             text: `По вашему запросу найдена ${data.length} страна`,
//         });
//         return;
//     }
//     if (data.length <= 10 && data.length > 2) {
//         const template = listTemplete(data);
//         boxRef.insertAdjacentHTML('beforeend', template);
//         notice({
//             ...PNotify,
//             text: `По вашему запросу найдено ${data.length} стран`,
//         });
//         return;
//     }

//     error({
//         ...PNotify,
//         text: 'По вашему запросу ничего не найдено.',
//     });
    
//     return;
// }





