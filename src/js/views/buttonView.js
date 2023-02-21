class ButtonView {
  // _parentEl = document.querySelector('.btn_container');
  _parentEl;

  init() {
    this._parentEl = document.querySelector('.btn_container');
  } // end init

  addHandlerBtnPress(handler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn');
      if (!btn) {
        return;
      } // end if
      handler(btn.value);
    }); // end addEventListner
  } // end addHandlerBtnPress
} // end ButtonView

export default new ButtonView();
