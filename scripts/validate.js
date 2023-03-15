const showInputError = (errorElement, validationMessage, errorClass, input, inputErrorClass) => {
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass, inputErrorClass);
  input.classList.add(inputErrorClass);
}

const hideInputError = (errorElement, errorClass, input, inputErrorClass) => {
  errorElement.classList.remove(errorClass, inputErrorClass);
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}

const enableButton = (buttonElement, inactiveButton) => {
  buttonElement.classList.remove(inactiveButton);
}

const disableButton = (buttonElement, inactiveButton) => {
  buttonElement.classList.add(inactiveButton);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (buttonElement, inactiveButton, inputList) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableButton(buttonElement, inactiveButton);

  } else {
    // иначе сделай кнопку активной
    enableButton(buttonElement, inactiveButton);
  }
};

// Функция проверки валидности
const checkInputValidity = (input, errorClass, inputErrorClass) => {
  const inputName = input.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);

  if (!input.validity.valid) {
    showInputError(errorElement, input.validationMessage, errorClass, input, inputErrorClass);
  } else {
    hideInputError(errorElement, errorClass, input, inputErrorClass);
  }
}

// Навешиваем слушатель
const setEventListeners = (inputList, buttonElement, errorClass, inputErrorClass, submitButton, inactiveButton) => {

  inputList.forEach((input) => {
    input.addEventListener("input", (e) => {
      checkInputValidity(input, errorClass, inputErrorClass);
      toggleButtonState(buttonElement, inactiveButton, inputList);
    });
  });

}

// Валидация формы
const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);

    setEventListeners(inputList, buttonElement, config.errorClass, config.inputErrorClass, config.submitButtonSelector, config.inactiveButtonClass);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
