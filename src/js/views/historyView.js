import View from './View.js';

class HistoryView extends View {
  // _parentEl = document.querySelector('.history');
  _parentEl;

  init() {
    this._parentEl = document.querySelector('.history_list');
  } // end init

  _generateMarkup() {
    return `
    <ul class="history_list">
      ${this._data.map(this._generateMarkupItem).join('')} 
    </ul>
    `;
  }

  _generateMarkupItem(item) {
    return `
    <il class="history_item">
      <div class="history__item--expression">${item.expression}</div>
      <div class="history__item--result">${item.result}</div>
    </il>
    `;
  }
} // end HistoryView

export default new HistoryView();
