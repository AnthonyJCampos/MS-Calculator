import View from './View.js';

class HistoryView extends View {
  // _parentEl = document.querySelector('.history');
  _parentEl;

  _generateMarkup() {
    return `
      <div class="history_title"><h3>History</h3></div>
      <div class="history_list__container">
        <ul class="history_list">
        </ul>
      </div>
      <div class="history_bottom">
        <button class="history_btn--clear">
          <img
            src="src/img/trash-can-50-gray.svg"
            alt="A trash Can icon, click to clear history"
            class="trash__svg svg__gray"
          />
          <img
            src="src/img/trash-can-50-white.svg"
            alt="A trash Can icon, click to clear history"
            class="trash__svg svg__white hidden"
          />
        </button>
      </div>`;
  } // end generateMarkup
} // end HistoryView

export default new HistoryView();
