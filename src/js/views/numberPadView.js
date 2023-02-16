export default class NumberPadView {
  render() {
    // const { expression, result } = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end NumberPadView
