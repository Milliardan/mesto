class Card {
    constructor(cardSelector, data, handleCardClick) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content.querySelector('.elements__item').cloneNode(true);

        return cardElement
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _handlelikeButton(evt) {
        evt.target.classList.toggle('elements__like_active');
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardElementTitle = this._element.querySelector('.elements__title');
        this._cardElementPhoto = this._element.querySelector('.elements__pic');

        this._cardElementTitle.textContent = this._name;
        this._cardElementPhoto.src = this._link;
        this._cardElementPhoto.alt = this._name;

        this._setEventListeners();

        return this._element;
    }

    /**Слушатели событий */
    _setEventListeners() {
      this._element.querySelector('.elements__pic').addEventListener('click', () =>
      this._handleCardClick({
        link: this._link,
        name: this._name,
      }));
      this._element.querySelector('.elements__remove').addEventListener('click', () => {
          this._deleteCard();
      })
      this._element.querySelector('.elements__like').addEventListener('click', (evt) => {
          this._handlelikeButton(evt);
      })

  };
};

export { Card };
