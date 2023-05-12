import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithRemoval } from '../components/PopupWithRemoval.js';
import { UserInfo } from '../components/UserInfo.js';
import { apiConfig, config } from '../utils/utils.js';
import { Api } from '../components/Api.js'

import './index.css'

import {
  formEditProfile,
  formAddCard,
  formEditAvatar,
} from '../utils/utils.js';

const popupFormDelete = new PopupWithRemoval('.popup_type_delete', {
  submitCallback: () => {
  }
});

/**----------------Api------------------------------ */
const api = new Api(apiConfig);

/**Получить ответ */
Promise.all([api.getUserInfoApi(), api.getInitialCards()])
.then(([resUser, resCard]) => {
  userCurrentId = resUser._id;
  userInfo.setUserInfo(resUser);
  userInfo.setUserAvatar(resUser);
  cardList.renderItems(resCard, userCurrentId)
})
.catch((err) => alert(err))

/**-------------Карточки---------------------- */

/**Popup изображения */
const cardImagePopup = new PopupWithImage('.popup_type_image');

/** Функция создания карточки */
const createCard = (data, user) => {
  const card = new Card({data: data, userId: user, templateSelector: '#cardTemplate',

  handleCardDelete: (cardId) => {
    const handleSubmitDeleteCard = () => {
      popupFormDelete.renderPreloader(true, 'Удаление...');
      api.deleteCard(cardId)
        .then(() => {
          card.deleteCard();
          popupFormDelete.close();
        })
        .catch((err) => alert(err))
        .finally(() => {
          popupFormDelete.renderPreloader(false);
        })
    }
    popupFormDelete.open(handleSubmitDeleteCard);
  },

  handleCardClick: () => {
    cardImagePopup.open(data);
  },

  handleCardLike: (cardId) => {
    api.putCardLike(cardId)
    .then((res) => {
      card.renderCardLike(res);
    })
    .catch((err) => alert(err))
  },

  handleCardDeleteLike: (cardId) => {
    api.deleteCardLike(cardId)
    .then((res) => {
      card.renderCardLike(res)
    })
    .catch((err) => alert(err))
  }


  });

  return card.generateCard();
}

/**Функция создания секции*/
const cardList = new Section({
  renderer: (card, userID) => {
    cardList.addItem(createCard(card, userID));
  },
}, '.elements__list'
);
/**-------------Popup добавления и редактирования----------------- */

/** Поиск кнопок открытия Popup */

const popupOpenEdit = document.querySelector('.profile__edit-button');
const popupOpenAdd = document.querySelector('.profile__add-button');
const popupOpenAvatar = document.querySelector('.profile__avatar');
let userCurrentId;

/**Получение данных из формы профиля */
const userInfo = new UserInfo({
  selectorUserName: '.profile__title',
  selectorUserJob: '.profile__subtitle',
  selectorUserAvatar: '.profile__avatar'
})

/**Функция создания Popup редактировапния профиля */
const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', {
  submitCallback: (data) => {
    popupFormProfile.renderPreloader(true, 'Загрузка...')
    api.setUserInfoApi(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupFormProfile.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormProfile.renderPreloader(false);
    })
  }
})

/**Открываю Popup редактирования профиля */
popupOpenEdit.addEventListener('click', () => {
  popupFormProfile.open();
  popupFormProfile.setInputValues(userInfo.getUserInfo());
  validationEditForm.resetForm();
});

/**Функция создания Popup добавления карточки */
const  popupFormAddCards = new PopupWithForm('.popup_type_add-card', {
  submitCallback: (data) => {
    popupFormAddCards.renderPreloader(true, 'Сохранение...')
    api.addNewCard(data)
    .then((newCard) => {
      cardList.prependItem(createCard(newCard, userCurrentId));
      popupFormAddCards.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormAddCards.renderPreloader(false);
    })
  }
})

/**Функция открытия Popup добавления карточки */
popupOpenAdd.addEventListener('click', () => {
  popupFormAddCards.open();
  validationAvatarForm.resetForm();
});

/**Функция создания Popup редактирования аватара */
const popupFormAvatar = new PopupWithForm('.popup_type_avatar', {
  submitCallback: (data) => {
    popupFormAvatar.renderPreloader(true, 'Загрузка...')
    api.setUserAvatar(data)
    .then((resUser) => {
      userInfo.setUserAvatar(resUser);
      popupFormAvatar.close();
    })
    .catch((err) => alert(err))
    .finally(() => {
      popupFormAvatar.renderPreloader(false);
    })
  }
})

/**Функция открытия Popup аватара */
popupOpenAvatar.addEventListener('click', () => {
  popupFormAvatar.open();
  validationAvatarForm.resetForm();
})

/**------------------Валидация---------------------- */

const validationAddForm = new FormValidator(config, formAddCard);
validationAddForm.enableValidation();
const validationEditForm = new FormValidator(config, formEditProfile);
validationEditForm.enableValidation();
const validationAvatarForm = new FormValidator(config, formEditAvatar);
validationAvatarForm.enableValidation();

/**Вешаю слушатели */
cardImagePopup.setEventListeners();
popupFormProfile.setEventListeners();
popupFormAddCards.setEventListeners();
popupFormAvatar.setEventListeners();
popupFormDelete.setEventListeners();

