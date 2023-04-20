class UserInfo {
  constructor({ selectorUserName, selectorUserJob}) {
    this._profileName = document.querySelector(selectorUserName);
    this._profileJob = document.querySelector(selectorUserJob);
  }

  /**Функция получения информации из профиля */
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileJob.textContent,
    }
  }

  /**Функция добавления информации в профиль из формы */
  setUserInfo({name, caption}) {
    this._profileName.textContent = name;
    this._profileJob.textContent = caption;
  }
};

export { UserInfo };
