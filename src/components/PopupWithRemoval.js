import Popup from "./Popup.js";

class PopupWithRemoval extends Popup {
  constructor(selectorPopup, { submitCallback }) {
    super(selectorPopup);
    this._buttonSubmit = this._popup.querySelector('.popup__submit');
    this._submitCallback = submitCallback;
  }

  /**Функция открытия Popup */
  open(submitCallback) {
    this._submitCallback = submitCallback;
    super.open();
  }

  /**Функция отображения Preloader */
  renderPreloader(loading, displayText) {
    if (!this._buttonSubmit) return;
    if (loading) {
      this.defaulText = this._buttonSubmit.textContent;
      this._buttonSubmit.textContent = displayText;
    } else {
      this._buttonSubmit.textContent = this.defaulText;
    }
  }

  /**Слушатель */
  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', () => {
      this._submitCallback();
    })
  }
}

export { PopupWithRemoval };
