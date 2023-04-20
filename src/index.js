import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css'

import {
  initialCards,
  config,
  formEditProfile,
  formAddCard,
} from '../utils/utils.js';

/**-------------Карточки---------------------- */

/**Popup изображения */
const cardImagePopup = new PopupWithImage('.popup_type_image');

/** Функция создания карточки */
const createCard = (data) => {
  const card = new Card('#cardTemplate', data, () => {
    cardImagePopup.open(data);
  });
  return card.generateCard();
}

/**Функция создания секции */
const cardList = new Section({
  renderer: (card) => {
    cardList.addItem(createCard(card));
  },
}, '.elements__list'
);

/** Рендер карточек на страницу*/
cardList.renderItems(initialCards);

/**-------------Popup добавления и редактирования----------------- */

/** Поиск кнопок открытия Popup */

const popupOpenEdit = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button');

/**Получение данных из формы профиля */
const userInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__subtitle'
})

/**Создаю Popup редактирования профиля */
const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', {
  submitCallback: (data) => {
    userInfo.setUserInfo(data);
  }
})

/**Открываю Popup редактирования профиля */
popupOpenEdit.addEventListener('click', () => {
  popupFormProfile.open();
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  validationEditForm.resetForm();
});


/**Создаю Popup добавления карточки */
const popupFormAddCards = new PopupWithForm('.popup_type_add-card', {
  submitCallback: ({ link, title }) => {
    cardList.addItem(createCard({
      link: link,
      name: title,
      alt: title,
    }))
  }
})

/**Функция открытия Popup добавления карточки */
popupOpenAdd.addEventListener('click', () => {
  popupFormAddCards.open();
  validationAddForm.resetForm();
});

/**------------------Валидация---------------------- */

const validationAddForm = new FormValidator(config, formAddCard);
validationAddForm.enableValidation();
const validationEditForm = new FormValidator(config, formEditProfile);
validationEditForm.enableValidation();

/**Вешаю слушатели */
cardImagePopup.setEventListeners();
popupFormProfile.setEventListeners();
popupFormAddCards.setEventListeners();
