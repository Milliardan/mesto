import Popup from '../components/Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imgCard = this._popup.querySelector('.popup__image');
    this._nameCard = this._popup.querySelector('.popup__image-caption');
  }

  /**Метод открытия попап, внесение данных */
  open(image) {
    super.open();
    this._imgCard.src = image.link;
    this._imgCard.alt = image.name;
    this._nameCard.textContent = image.name
  }

};

export { PopupWithImage }
