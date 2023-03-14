class DropdownView {
  _parentEl;

  init(elementString) {
    this._parentEl = document.querySelector(`.${elementString}`);
    this._addHandlerDropdownClicked();
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
}

export default new DropdownView();
