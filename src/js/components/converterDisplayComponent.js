export default class ConverterDisplayComponent {
  _parentEl;
  _unit;
  constructor(elementString, unitInControlID) {
    this._parentEl = document.getElementById(elementString);

    // set display component unit position, last char of element string
    this._unit = Number(elementString.at(-1));
    this.setActive(unitInControlID);
  }

  init() {
    const markup = this._generateMarkup();
    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  setActive(unitID) {
    if (unitID === this._unit) {
      this._parentEl.classList.add('display--active');
    } else {
      this._parentEl.classList.remove('display--active');
    }
  } // end setActive

  addHandlerClick(handler) {
    this._parentEl.addEventListener(
      'click',
      function (event) {
        handler(this._unit);
      }.bind(this)
    );
  } // addHandlerClick

  update(data) {
    if (!data) {
      return;
    }

    console.log(this._parentEl);
    console.log(`inside display ${this._unit}`);
    console.log(data);
    const displayElement = this._parentEl.querySelector('.display_unit');

    if (data.activeDisplay === this._unit) {
      console.log('never');
      displayElement.textContent = data.activeContent;
    } else {
      console.log('here');
      console.log(data.nonContent);
      console.log(displayElement);
      displayElement.textContent = data.nonContent;
    }
  } // end update

  _generateMarkup() {
    return `<p class="display_unit">0</p>`;
  } // end _generateMarkup

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end ConverterDisplayComponent
