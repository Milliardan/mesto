class FormValidator {
  constructor(config, formName) {
      this._config = config;
      this._formName = formName;
      this._inputList = Array.from(this._formName.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._formName.querySelector(this._config.submitButtonSelector);
  }

  _hideErrorMessage(inputElement, config) {
      const { inputErrorClass, errorClass } = config;
      const inputName = inputElement.getAttribute('name');
      const errorElement = document.getElementById(`${inputName}-error`);

      inputElement.classList.remove(inputErrorClass);
      errorElement.classList.remove(errorClass);

      errorElement.textContent = ''
  }

  _showErrorMessage(inputElement, config) {
      const { inputErrorClass, errorClass } = config;
      const inputName = inputElement.getAttribute('name');
      const errorElement = document.getElementById(`${inputName}-error`);

      inputElement.classList.add(inputErrorClass);
      errorElement.classList.add(errorClass);

      errorElement.textContent = inputElement.validationMessage;
  }

  _checkInputValidity(inputElement, config) {
      if (inputElement.validity.valid) {
          this._hideErrorMessage(inputElement, config);
      }
      else {
          this._showErrorMessage(inputElement, config);
      }
  }

  _hasInvalidInput(inputList) {
      return inputList.some((item) => {
        if (item.validity.valid) {
          return false;
        }
        else {
          return true;
        }
      })
  }

  _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
      if (this._hasInvalidInput(inputList)) {
        // сделай кнопку активной
          buttonElement.classList.add(inactiveButtonClass);
          buttonElement.disabled = true;
      }
      else {
        // иначе сделай кнопку неактивной
        buttonElement.classList.remove(inactiveButtonClass);
          buttonElement.disabled = false;
      }
  }

  _setEventListeners(formElement, config) {
      const { inputSelector, submitButtonSelector, inactiveButtonClass,  ...rest} = config;
      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault;
      })

      this._toggleButtonState(this._inputList, this._buttonElement, inactiveButtonClass);

      this._inputList.forEach((inputElement) => {
          this._checkInputValidity(inputElement, rest);
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement, rest);
              this._toggleButtonState(this._inputList, this._buttonElement, inactiveButtonClass);
          })
      })
  }

  resetForm() {
      const { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest } = this._config;
      this._inputList.forEach((input) => {
          this._hideErrorMessage(input, rest);
          this._toggleButtonState(this._inputList, this._buttonElement, inactiveButtonClass);
      })
    }

// Валидация формы
  enableValidation = (config) => {
      const { formSelector, ...rest} = this._config;
      const formList = Array.from(document.querySelector(formSelector));

      formList.forEach((formElement) => {
          this._setEventListeners(formElement, rest);
      })
  }
}

export { FormValidator }
