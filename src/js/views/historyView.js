class HistoryView {
  _parentEl;
  _listEl;

  init() {
    this._parentEl = document.querySelector('.history');
    this._listEl = document.querySelector('.history_list');
    this._btnAnimation();
  } // end init

  addHandlerClear(handler) {
    const clear = function (event) {
      const btn = event.target.closest('.history_btn--clear');

      if (!btn) {
        return;
      }
      this._listEl.innerHTML = '';
      handler();
    }; // end clear

    this._parentEl.addEventListener('click', clear.bind(this));
  } // end aadHandlerClear

  _btnAnimation() {
    const mouseOver = function (event) {
      const btn = event.target.closest('.history_btn--clear');
      if (!btn) {
        return;
      }
      btn.style.backgroundColor = '#212529';
      const [svgGray, svgWhite] = btn.children;
      svgGray.classList.add('hidden');
      svgWhite.classList.remove('hidden');
    };

    this._parentEl.addEventListener('mouseover', mouseOver);

    const mouseOut = function (event) {
      const btn = event.target.closest('.history_btn--clear');
      if (!btn) {
        return;
      }
      btn.style.backgroundColor = 'white';
      const [svgGray, svgWhite] = btn.children;
      svgGray.classList.remove('hidden');
      svgWhite.classList.add('hidden');
    };

    this._parentEl.addEventListener('mouseout', mouseOut);
  } // end _btnAnimation

  update(data) {
    if (!data || data.length < 1) {
      return;
    } // end of guard

    if (data.length < this._listEl.childElementCount) {
      return;
    }
    const markup = this._generateMarkupItem(data.at(-1));
    this._listEl.insertAdjacentHTML('afterbegin', markup);
    // keep user at top of scroll window
    this._listEl.scrollTop = 0;
    this._listEl.scrollLeft = 0;
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
