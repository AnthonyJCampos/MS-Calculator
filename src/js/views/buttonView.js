import View from './View.js';

export default class ButtonView extends View {
  // _parentEl = document.querySelector('.btn_container');
  _parentEl;

  addHandlerBtnPress(handler) {
    this._parentEl.addEventListner('click', function (event) {
      const btn = event.target.closest('.btn');
      if (!btn) {
        return;
      } // end if
      handler();
    }); // end addEventListner
  } // end addHandlerBtnPress

  _generateMarkup(layout) {
    return `
    `;
  } // end generateMarkup
} // end ButtonView
