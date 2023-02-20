export default class ToolView {
  render() {
    const markup = this._generateMarkup();
    console.log('Tool View Render');
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end ToolView
