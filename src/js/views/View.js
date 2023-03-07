export default class View {
  render(data) {
    if (data) {
      this._data = data;
    }
    const markup = this._generateMarkup();

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end View
