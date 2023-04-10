import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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
const popupImage = document.querySelector('.popup_type_image');
const popupClosedImage = popupImage.querySelector('.popup__close');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
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

//Функция создания карточки
function createCard(cardSelector, name, link) {
  const cardTemplate = new Card(cardSelector, link, name);
  const cardElement = cardTemplate.createCard();
  return cardElement
}

function renderCard(link, name) {
  // Создаем карточку на основе данных
  const cardInstance = createCard('#cardTemplate', link, name);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardInstance);
}

const validationAddForm = new FormValidator(config, formAddCard);
validationAddForm.enableValidation();
const validationEditForm = new FormValidator(config, formEditProfile);
validationEditForm.enableValidation();

// Добавление карточек из инпутов
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(inputAddCardLink.value, inputAddCardName.value);
  validationAddForm.resetForm();
  closePopup(popupAddCard);
}

function openEditPopup() {
  openPopup(popupEditProfile)
  nameInput.value = profileName.textContent;
  jobInput.value = profileText.textContent;
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
  validationAddForm.resetForm();
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

// Слушатель закрытия на крестик
popupClosedImage.addEventListener('click', function () {
  closePopup(popupImage);
});

// Слушатель кнопки открытия попапа для добавления карточки
openAddCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  popupFormCard.reset();
});

closePopupAddButton.addEventListener('click', closeAddCardPopup);

popupFormCard.addEventListener('submit', handleCardFormSubmit);

export { openPopup, closePopup };
