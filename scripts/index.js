import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const esc = 'Escape';
const openPopupButton = document.querySelector('.profile__edit-button');

const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_caption');

const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__subtitle');

const popupFormProfile = document.querySelector('.popup__form_action_edit');

const openAddCardButton = document.querySelector('.profile__add-button');
const inputAddCardName = document.querySelector('.popup__input_field_heading');
const inputAddCardLink = document.querySelector('.popup__input_field_link');


const cardsContainer = document.querySelector('.elements__list');
const popupFormCard = document.querySelector('.popup__form_action_add');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupClosedEditForm = popupEditProfile.querySelector('.popup__close');
const popupAddCard = document.querySelector('.popup_type_add-card');
const closePopupAddButton = popupAddCard.querySelector('.popup__close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const addCardButtonSave = popupAddCard.querySelector('.popup__submit');


// Функция закрытия попапа при нажатии на темный фон
const setOverlayListener = function (evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

// Функция закрытия попапа при нажатии на Escape
const setEscListener = function (evt) {
  if (evt.key === esc) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Добавляю карточки из массива
initialCards.forEach(function (item) {
  renderCard(item.link, item.name);
})

function renderCard(link, name) {
  const cardTemplate = new Card('#cardTemplate', name, link);

  cardsContainer.prepend(cardTemplate.createCard());
}

// Добавление карточек из инпутов
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(inputAddCardLink.value, inputAddCardName.value);
  const resetForm = new FormValidator(config, formAddCard);
  resetForm.resetForm();
  closePopup(popupAddCard);
  addCardButtonSave.disabled = true;
}

const enableValidation = (config, popup) => {
  const formValidatorEditProfile = new FormValidator(config, popup);
  formValidatorEditProfile.enableValidation();
}

function openEditPopup() {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;

  enableValidation(config, popupEditProfile);
}

// Изменение данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function closeAddCardPopup() {
  closePopup(popupAddCard);
  const resetForm = new FormValidator(config, formAddCard);
  resetForm.resetForm();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('mousedown', setOverlayListener);
  document.addEventListener('keydown', setEscListener);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('mousedown', setOverlayListener);
  document.removeEventListener('keydown', setEscListener);
}

popupFormProfile.addEventListener('submit', handleProfileFormSubmit);

openPopupButton.addEventListener('click', openEditPopup);

// Кнопка закрытия попапа редактирования профиля
popupClosedEditForm.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

// Слушатель кнопки открытия попапа для добавления карточки
openAddCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  const inputList = formAddCard.querySelectorAll('.popup__input');
  inputList.forEach((input) => {
    input.addEventListener('keydown', () => {
      enableValidation(config, popupAddCard);
    })
  })
});

closePopupAddButton.addEventListener('click', closeAddCardPopup);

popupFormCard.addEventListener('submit', handleCardFormSubmit);

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

export { openPopup, closePopup };
