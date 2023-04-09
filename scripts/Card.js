import { openPopup } from './index.js';

const popupFigure = document.querySelector('.popup_type_image');
const popupFigureImage = popupFigure.querySelector('.popup__image');
const popupFigureCaption = popupFigure.querySelector('.popup__image-caption');

class Card {
    constructor(cardSelector, name, link) {
        this._cardSelector = cardSelector;
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content.querySelector('.elements__item').cloneNode(true)

        return cardElement
    }

    _openPopup() {
        openPopup(popupFigure)
        popupFigureImage.src = this._link;
        popupFigureCaption.textContent = this._name;
        popupFigureImage.alt = this._name;
    }

    _deleteCard() {
        this._element.remove();
    }

    _handlelikeButton(evt) {
        evt.target.classList.toggle('elements__like_active');
    }

    _setEventListeners() {
        this._element.querySelector('.elements__pic').addEventListener('click', () => {
            this._openPopup();
        })
        this._element.querySelector('.elements__remove').addEventListener('click', () => {
            this._deleteCard();
        })
        this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
            this._handlelikeButton(evt);
        })
    }

    createCard() {
        this._element = this._getTemplate();

        const image = this._element.querySelector('.elements__pic');
        const title = this._element.querySelector('.elements__title');

        image.src = this._link;
        image.alt = this._name;
        title.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}

export {Card}
