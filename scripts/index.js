let profileEditButton = document.querySelector('.profile__edit-button');
let popupOpened = document.querySelector('.popup');
let popupClosed = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input_field_name');
let jobInput = document.querySelector('.popup__input_field_caption');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let popupSubmit = document.querySelector('.popup__submit');

// Функция добавления класса и данных из профиля.
function openFunc() {
  popupOpened.classList.add('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
// Функция удаления класса.
function closeFunc() {
  popupOpened.classList.remove('popup_opened');
}

// Открываем и закрываем попап. Использую объявленную функцию.

profileEditButton.addEventListener('click', openFunc);

popupClosed.addEventListener('click', closeFunc);

// Обработчик «отправки» формы.

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  popupSubmit.addEventListener('click', closeFunc);
}

formElement.addEventListener('submit', handleFormSubmit);
