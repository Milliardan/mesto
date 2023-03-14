const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');
const popupClosedEditForm = document.querySelector('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');
const popupClosedAddForm = popupAddCard.querySelector('.popup__close');

const formEdit = document.querySelector('.popup__form_action_edit');
const formAdd = document.querySelector('.popup__form_action_add');

const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_caption');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const elementsTitleValue = document.querySelector('.popup__input_field_heading');
const elementsLinkValue = document.querySelector('.popup__input_field_link');

const popupClosedImage = popupImage.querySelector('.popup__close');

const popupBigImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

// Функция добавления класса для открытия попапа
function openPopup(open) {
  open.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
  open.addEventListener('click', handleMouseClickBackground);
}

// Функция добавления информации.
function addProfileInfo() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

// Функция удаления класса для закрытия попапа.
function closePopup(close) {
  close.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
  document.removeEventListener('click', handleMouseClickBackground);
}

// Обработчик закрытия попапа на ESC
function handleEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  };
}

// Функция закрытия попапа кликом на темный фон
function handleMouseClickBackground(evt) {
  const popupOpenedClick = document.querySelector('.popup_opened');
  if (evt.currentTarget === evt.target) {
    closePopup(popupOpenedClick);
  }
}

// Открываем и закрываем попап редактирования. Использую объявленные функции.

profileEditButton.addEventListener('click', function () {
  openPopup(popupEdit);
});

profileEditButton.addEventListener('click', addProfileInfo);

popupClosedEditForm.addEventListener('click', function () {
  closePopup(popupEdit);
});

// Открываем и закрываем попап добавления карточек.

profileAddButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

popupClosedAddForm.addEventListener('click', function () {
  closePopup(popupAddCard);
});

// Обработчик «отправки» формы редактирования профиля.

function handleFormSubmitEdit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popup);
}

formEdit.addEventListener('submit', handleFormSubmitEdit);

const elementsList = document.querySelector('.elements__list');

// Функция закрытия увеличенных изображений
popupClosedImage.addEventListener('click', function () {
  closePopup(popupImage);
});

function createCard(data) {
  // Клонируем шаблон, наполняем его информацией из объекта data
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true);
  const elementsTitle = newCard.querySelector('.elements__title');
  const elementsPic = newCard.querySelector('.elements__pic');
  const elementsLike = newCard.querySelector('.elements__like');
  // Лайки
  const toggleLike = function (like) {
    like.classList.toggle('elements__like_active');
  };
  elementsLike.addEventListener('click', function () {
    toggleLike(elementsLike);
  });

  // Удаление карточки
  const elementsRemove = newCard.querySelector('.elements__remove');
  const elementsItem = newCard.querySelector('.elements__item');
  elementsRemove.addEventListener('click', function () {
    elementsItem.remove();
  });

  // Открываем и закрываем попап увеличенных картинок.
  elementsPic.addEventListener('click', function () {
    popupBigImage.setAttribute('src', elementsPic.getAttribute('src'));
    popupBigImage.setAttribute('alt', elementsPic.getAttribute('alt'));
    popupCaption.textContent = data.name;
    openPopup(popupImage);
  });

  elementsTitle.textContent = data.name;
  elementsPic.setAttribute('src', data.link);
  elementsPic.alt = `Изображение ${data.name}`;
  // Возвращаем получившуюся карточку
  return newCard;
};

function renderCard(data, cardsContainer) {
  // Создаем карточку на основе данных
  const cardElement = createCard(data);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
};

// Добавляю карточки из массива
initialCards.forEach(card => { renderCard(card, elementsList); });

// Обработчик «отправки» формы добавления карточек.

function handleFormSubmitAdd(event) {
  event.preventDefault();

  const cards = {
    name: elementsTitleValue.value,
    link: elementsLinkValue.value
  };
  renderCard(cards, elementsList);
  closePopup(popupAddCard);
};

formAdd.addEventListener('submit', handleFormSubmitAdd);
