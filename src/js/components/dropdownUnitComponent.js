import { dropdownIcon } from '../../img/icons.js';

export default class DropdownUnitComponent {
  _hideDelay = 500;
  _parentEl;

  constructor(elementString, options) {
    this._parentEl = document.querySelector(`.${elementString}`);
    this._options = options;
  }

  init() {
    if (!this._options) {
      return;
    }

    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);

    // mouse over and mouse out events
    this._addHandlerMouseout();
    this._addHandlerMouseover();
  } // end init

  addHandlerDropdownClicked() {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--unit');

      if (!btn) {
        return;
      }

      const dropdownEl = btn.nextElementSibling;
      dropdownEl.classList.toggle('hidden');
    });
  } // end _addHandlerDropdownClicked

  addHanlderOptionClick(handler) {
    this._parentEl
      .querySelector('.dropdown-content')
      .addEventListener('click', this._optionClickEvent.bind(this, handler));
  } // end addHanlderOptionClick

  _optionClickEvent(handler, event) {
    const unitBtn = event.target.closest('.dropdown_btn');

    if (!unitBtn) {
      return;
    }

    const dropdownWindow = this._parentEl.querySelector('.dropdown-content');

    // get option from dropdown button
    const option = unitBtn.value;
    handler(option);
    const dropdownOption = this._parentEl.querySelector('.btn--unit-text');
    // update displayed value
    dropdownOption.textContent = option;

    // close window after selection
    dropdownWindow.classList.add('hidden');
  } // end optionClickEvent

  _addHandlerMouseout() {
    this._parentEl
      .querySelector('.dropdown-content')
      .addEventListener('mouseout', this._mouseoutEvent.bind(this));
  } // end addHandlerWindowClick

  _addHandlerMouseover() {
    this._parentEl
      .querySelector('.dropdown-content')
      .addEventListener('mouseover', this._mouseoverEvent.bind(this));
  }

  _mouseoutEvent(event) {
    const dropdownEl = this._parentEl.querySelector('.dropdown-content');

    if (
      !event.target.matches('.dropdown_item') &&
      !event.target.matches('.dropdown_btn')
    ) {
      this._timeoutID = setTimeout(() => {
        dropdownEl.classList.add('hidden');
      }, this._hideDelay);
    }
  } // end outsideClickEvent

  _mouseoverEvent(event) {
    clearTimeout(this._timeoutID);
  }

  _generateMarkup() {
    return `
    <button class="btn--unit">
    <p class="btn--unit-text">${this._options.at(0)}</p>
    ${dropdownIcon}</button> 
    <ul class="dropdown-content hidden">
      ${this._options.map(this._generateMarkupItem).join('')}
    </ul> 
    `;
  } // end _generateMarkup

  _generateMarkupItem(option) {
    return `
      <li class="dropdown_item"><button class="dropdown_btn" value="${option}" aria-label="Convert Unit ${option}" title="Unit ${option}">${option}</button></li>
    `;
  } // end _generateMarkup

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end DropdownUnitComponent
