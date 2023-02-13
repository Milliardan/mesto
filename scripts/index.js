let profileEditButton = document.querySelector('.profile__edit-button');
let popupOpened = document.querySelector('.popup_opened');
let popupClosed = document.querySelector('.popup__close');


  profileEditButton.addEventListener ('click', function (openFunc) {
    popupOpened.classList.remove('popup_opened');
  });

  popupClosed.addEventListener ('click', function (closeFunc) {
    popupOpened.classList.add('popup_opened');
  });

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__input_field_name');
let jobInput = document.querySelector('.popup__input_field_caption');

function handleFormSubmit (evt) {
    evt.preventDefault();

nameInput.getAttribute('value');
jobInput.getAttribute('value');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

profileTitle.textContent = nameInput.value;
profileSubtitle.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);
