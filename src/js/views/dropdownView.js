class DropdownView {
  _parentEl;

  render(renderPackage) {}

  setParentElement(elementString) {
    this._parentEl = document.querySelector(`.${elementString}`);
  }

  _addHandlerDropdownClicked() {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn');

      if (!btn) {
        return;
      }

      const dropdownEl = document.querySelector('.dropdown-content');
      dropdownEl.classList.toggle('hidden');
    });
  }

  _generateMarkup() {
    return `
    <button class="btn--unit">
    Centimeters ${dropdownIcon}
    </button> 
    <ul class="dropdown-content hidden">
    </ul> 
    `;
  }

  _generateMarkupItem() {}
}

export default new DropdownView();

// use this to make a list of elements

// this._data.ingredients.map(this._generateMarkupIngredient).join('')
//
