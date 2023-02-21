import View from './View.js';

class HistoryView {
  // _parentEl = document.querySelector('.history');
  _parentEl;

  init() {
    this._parentEl = document.querySelector('.history');
  } // end init
} // end HistoryView

export default new HistoryView();
