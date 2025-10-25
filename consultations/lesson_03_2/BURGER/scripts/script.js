// При клике на burger_icon класс nav_active у ul появляется, если его нет, и удаляется, если он есть

const burger_icon = document.querySelector('.burger_icon');
const nav_menu = document.querySelector('.nav_menu');

burger_icon.addEventListener('click', () => nav_menu.classList.toggle('nav_active'));


// При клике на Account div.popup добавлять класс modal_active

const account_btn = document.querySelector('.account_btn');
const popup = document.querySelector('.popup');

account_btn.addEventListener('click', () => popup.classList.add('modal_active'));

// При клике на крестик у div.popup удалять класс modal_active

const cross_icon = document.querySelector('.cross_icon');

cross_icon.addEventListener('click', () => popup.classList.remove('modal_active'));



// ДЗ
// При сабмите формы собираются данные, формируется объект (id, email, password) и добавляется объект в массив со всеми зарегистрированными пользователями
