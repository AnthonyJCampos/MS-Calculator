export default class ButtonView {
  render() {
    const markup = this._generateMarkup();
    console.log('Button View Render');
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
}
ButtonView;
