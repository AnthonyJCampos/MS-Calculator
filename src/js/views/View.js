export default class View {
  render() {
    const markup = this._generateMarkup();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  _clear() {
    console.log('clear called');
    this._parentEl.innerHTML = '';
  } // end clear
} // end View
