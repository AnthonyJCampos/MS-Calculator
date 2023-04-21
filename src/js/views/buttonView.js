class ButtonView {
  _parentEl;

  init() {
    this._parentEl = document.querySelector('.btn_container');
  } // end init

  addHandlerBtnPress(handler) {
    this._parentEl.addEventListener('click', this.btnEvent.bind(null, handler)); // end addEventListner
  } // end addHandlerBtnPress

  btnEvent(handler, event) {
    const btn = event.target.closest('.btn');
    if (!btn) {
      return;
    } // end if
    handler(btn.value);
  }
} // end ButtonView

export default new ButtonView();
