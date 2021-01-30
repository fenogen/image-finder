import './styles.css';

// ----------------------------> Создали шабоны разметки и импортировали их
import cardTemplete from './template/card.hbs';
import listTemplete from './template/list.hbs';

// ----------------------------> Импортируем плагин уведомлений - PNotify
import { notice, success, info, error, defaultModules} from '../node_modules/@pnotify/core/dist/PNotify.js';
import "@pnotify/core/dist/PNotify.css";                     //---> Импортирует стилей
import '@pnotify/core/dist/BrightTheme.css';                 //---> Импортирует цветовую гамму
import 'material-design-icons/iconfont/material-icons.css'; //---> Импортирует иконки

// ----------------------------> Изменили дефолтные настройки уведомлений (PNotify)
const PNotify = {
    title: 'Info',
    delay: 1500,          //---> Удаляется автоматически
    sticker: false,       //---> Удаляет стиккер
    closerHover: false,   //---> Видно иконку закрытия
}

// ----------------------------> Импортировали ф-ю debounce для задержки
var debounce = require('lodash.debounce');

// ---------------------------------------------------------------------

console.log('Hello');

const API = {
    key: '20057586-194248245024f7fdf6233c620',
    page: 1,
    onPage: 12,
}
const { key, onPage } = API;

let page = 1;
let search;

const formRef = document.querySelector('#search-form');
const input = document.querySelector('#name-input');
const btnRef = document.querySelector('button[data-search="search"]');
const boxRef = document.querySelector('#js-search');

function fnSubmit(event) {
    if (input.value.length > 0) {
        event.preventDefault();
        search = input.value;
        // const form = event.currentTarget;
        // form.reset();
        boxRef.innerHTML = '';
        page = 1;
        fnFetchServer(search);
    }
    return;
}
// 111

formRef.addEventListener('submit', fnSubmit);

function fnFetchServer(search) {
    const url = `https://pixabay.com/api/?image_type=photo&key=${key}&page=${page}&per_page=${onPage}&orientation=horizontal&q=${search}`;
        return fetch(url)
            .then(responce => responce.json())
            .then(data => fnTemplate(data))
            .catch(() => console.warn('Ошибка связи с сервером'));
};

function fnTemplate(data) {
    const template = listTemplete(data.hits);
    boxRef.insertAdjacentHTML('beforeend', template);
    btnRef.classList.remove("hiden");
}


function fnClick() {
    page = page + 1;
    fnFetchServer(search);
}

btnRef.addEventListener('click', fnClick); 




// function fnTemplate(data) {
//     // console.log(data);
//     // console.log(data.hits);
//     const template = listTemplete(data.hits);
//     console.log(input.value);

//     // boxRef.innerHTML = '';
//     boxRef.insertAdjacentHTML('beforeend', template);
//     btnRef.classList.remove("hiden");
//     page = page + 1;
//     // console.log(search);
//     if (searchValue !== input.value) {
//         console.log('hi');
//     }
//     return;
// }

// const fnClick = () => {
//     page = page + 1;
//     fnFetch();
// }
    
// const fnDelete = () => {
//     page = page;
//     fnFetch();
//     }




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





