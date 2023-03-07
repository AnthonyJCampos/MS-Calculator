export default class View {
  render() {
    const markup = this._generateMarkup();

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end View