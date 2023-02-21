export default class View {
  render(layout) {
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  setParentEl(classString) {
    this._parentEl = document.querySelector(`.${classString}`);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end View
