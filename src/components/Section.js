class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  };

  /**Отобразить контент */
  renderItems(items, user) {
    items.forEach(item => {
      this._renderer(item, user);
    });
  }

  /**Добавить контент */
  addItem(element) {
    this._container.append(element);
  }

  /**Добавить контент в начало */
  prependItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
