import { dropdownIcon } from '../../img/icons.js';

class DropdownView {
  _parentEl;

  setParentElement(elementString) {
    this._parentEl = document.querySelector(`.${elementString}`);
  } // end setParentElement

  render(renderPackage) {
    if (!layoutPackage) {
      return;
    }

    const { options } = renderPackage;
    const markup = this._generateMarkup(options);

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  _addHandlerDropdownClicked() {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn');

      if (!btn) {
        return;
      }

      const dropdownEl = document.querySelector('.dropdown-content');
      dropdownEl.classList.toggle('hidden');
    });
  } // end _addHandlerDropdownClicked

  _generateMarkup(options) {
    return `
    <button class="btn--unit">
    ${options.at(0)} ${dropdownIcon}
    </button> 
    <ul class="dropdown-content">
      ${options.map(this._generateMarkupItem).join('')}
    </ul> 
    `;
  } // end _generateMarkup

  _generateMarkupItem(option) {
    return `
      <li><button class="list_btn">${option}</button></li>
    `;
  } // end _generateMarkup

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
}

export default new DropdownView();

// use this to make a list of elements

// this._data.ingredients.map(this._generateMarkupIngredient).join('')
//
