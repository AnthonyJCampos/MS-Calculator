class ButtonView {
  // _parentEl = document.querySelector('.btn_container');
  _parentEl;
  _myEvent;

  init() {
    this._parentEl = document.querySelector('.btn_container');
  } // end init

  addHandlerBtnPress(handler) {
    this._myEvent = this.btnEvent.bind(this, handler);
    this._parentEl.addEventListener('click', this._myEvent); // end addEventListner
  } // end addHandlerBtnPress

  btnEvent(handler, event) {
    const btn = event.target.closest('.btn');
    if (!btn) {
      return;
    } // end if
    handler(btn.value);
  }
  clearEvents() {
    console.log(this._myEvent);
    this._parentEl.removeEventListener('click', this._myEvent);
  }
} // end ButtonView

export default new ButtonView();
