const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

/**Данные для обращения к серверу */
const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers:{
    'Content-Type': "application/json",
    authorization: '1d384fcf-35e6-4df7-b215-c6433e7c1bdc'
  }
}

const esc = 'Escape';

const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_about');

const profileName = document.querySelector('.profile__title');
const profileText = document.querySelector('.profile__subtitle');

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
const formEditAvatar = document.querySelector('.popup__form_type_avatar');

export {
  initialCards,
  config,
  apiConfig,
  esc,
  nameInput,
  jobInput,
  profileName,
  profileText,
  openAddCardButton,
  inputAddCardName,
  inputAddCardLink,
  cardsContainer,
  popupFormCard,
  popupImage,
  popupClosedImage,
  popupEditProfile,
  formEditProfile,
  popupClosedEditForm,
  popupAddCard,
  closePopupAddButton,
  formAddCard,
  addCardButtonSave,
  formEditAvatar
};
