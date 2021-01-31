import './styles.css';

// ----------------------------> Создали шабоны разметки и импортировали их

import listTemplete from './template/list.hbs';

// ----------------------------> Импортируем плагин уведомлений - PNotify
import { notice, success, info, error, defaultModules} from '../node_modules/@pnotify/core/dist/PNotify.js';
import "@pnotify/core/dist/PNotify.css";                     //---> Импортирт стилей
import '@pnotify/core/dist/BrightTheme.css';                 //---> Импортирт цветовой гаммы
import 'material-design-icons/iconfont/material-icons.css'; //---> Импортирт иконок

// ----------------------------> Импорт плагина модального окна - basicLightbox

import "basiclightbox/dist/basicLightbox.min.css"
import * as basicLightbox from 'basiclightbox'

// ----------------------------> Изменили дефолтные настройки уведомлений (PNotify)
const PNotify = {
    title: 'Info',
    delay: 5000,          //---> Удаляется автоматически
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
    box: document.querySelector('#js-search'),
    size: document.querySelector('.card'),
}

// ----------------------------> Ф-я поиска:

function fnSubmit(event) {
    if (REF.input.value.length > 0) {
        event.preventDefault();
        API.search = REF.input.value;
        // const form = event.currentTarget // form.reset();
        REF.box.innerHTML = '';
        API.page = 1;
        REF.btn.disabled = false;
        fnFetchServer(API.search);
    }
    return;
}

// ----------------------------> Ф-я дозагрузки:

function fnClick() {
    API.page = API.page + 1;
    fnFetchServer(API.search);
}

// ----------------------------> Ф-я открытия модального окна:
function fnPhotoLarge(event) {
    if (event.target.tagName === 'IMG') {
        const largePhoto = event.target.dataset.url;
        const instance = basicLightbox.create(`/<img width="" height="" src=${largePhoto}>`)
        instance.show();
    }
    return;
}

// ----------------------------> События:

REF.form.addEventListener('submit', fnSubmit);
REF.btn.addEventListener('click', fnClick);
REF.box.addEventListener('click', fnPhotoLarge);

// ----------------------------> Ф-я запроса на сервер:

function fnFetchServer() {
    const url = `https://pixabay.com/api/?image_type=photo&key=${API.key}&page=${API.page}&per_page=${API.onPage}&orientation=horizontal&q=${API.search}`;
        return fetch(url)
            .then(responce => responce.json())
            .then(data => fnTemplate(data))
            .catch(() => console.warn('Server communication error'));
};

// ----------------------------> Ф-я создания DOM-дерева:
function fnTemplate(data) {
    if (API.page === 1) {
        success({
            ...PNotify,
            text: `Search results ${data.total} photos`,
        });
    }
    if (data.hits.length === 0) {
        REF.btn.disabled = true;
        error({
        ...PNotify,
            text: 'Upon your request all the pictures shown',
        });
    }
    const template = listTemplete(data.hits);
    REF.box.insertAdjacentHTML('beforeend', template);
    REF.btn.classList.remove("hiden");
    window.scrollTo({
        top: document.documentElement.offsetHeight,
        left: 100,
        behavior: 'smooth'
    })
}