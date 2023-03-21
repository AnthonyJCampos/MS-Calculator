import { dropdownIcon } from '../../img/icons.js';

export default class DropdownUnitComponent {
  _parentEl;
  _outEvent;

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

    this._outEvent = this._outsideClickEvent.bind(this); // test
    this._addHandlerWindowClick();
  } // end init

  clearEvents() {
    window.removeEventListener('click', this._outEvent, false);
  }

  _addHandlerDropdownClicked() {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--unit');

      if (!btn) {
        return;
      }
      const dropdownEl = btn.nextElementSibling;
      dropdownEl.classList.toggle('hidden');
    });
  } // end _addHandlerDropdownClicked

  _addHandlerWindowClick() {
    window.addEventListener('click', this._outEvent, false);
  } // end addHandlerWindowClick

  _outsideClickEvent(event) {
    if (
      !event.target.matches('.btn--unit') &&
      !event.target.matches('.dropdown_btn') &&
      !event.target.matches('.dropdown-content')
    ) {
      const dropdownEl = document.querySelector('.dropdown-content');

      if (!dropdownEl) {
        console.error('error in DropdownUnitComponent window click event');
        return;
      }
      dropdownEl.classList.add('hidden');
    }
  } // end outsideClickEvent

  _generateMarkup() {
    return `
    <button class="btn--unit">
    ${this._options.at(0)} ${dropdownIcon}
    </button> 
    <ul class="dropdown-content hidden">
      ${this._options.map(this._generateMarkupItem).join('')}
    </ul> 
    `;
  } // end _generateMarkup

  _generateMarkupItem(option) {
    return `
      <li><button class="dropdown_btn">${option}</button></li>
    `;
  } // end _generateMarkup

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end DropdownUnitComponent
