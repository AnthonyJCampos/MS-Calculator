export default class ApiComponent {
  _parentEl;
  _apiExample;
  _apiTimestamp;
  _apiBtnText;

  constructor(elementString, renderPackage) {
    this._parentEl = document.querySelector(`.${elementString}`);
    this._apiExample = renderPackage.apiExample;
    this._apiTimestamp = renderPackage.apiTimestamp;
    this._apiBtnText = renderPackage.apiBtnText;
  }

  init() {
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end init

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--api');

      if (!btn) {
        return;
      }
      handler();
    });
  }

  update(data) {
    if (!data) {
      return;
    }

    this._parentEl.querySelector(
      '.api_example'
    ).textContent = `${data.apiExample}`;

    this._parentEl.querySelector(
      '.api_timestamp'
    ).textContent = `${data.apiTimestamp}`;
  } // end update

  _generateMarkup() {
    return `
      <p class="api_example">${this._apiExample}</p>
      <p class="api_timestamp">${this._apiTimestamp}</p>
      <button class="btn--api" title="${this._apiBtnText}" aria-label="${this._apiBtnText}">${this._apiBtnText}</button>
      `;
  } // end generateMarkup

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end NavView
