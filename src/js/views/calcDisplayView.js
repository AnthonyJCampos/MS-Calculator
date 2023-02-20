import DisplayView from './displayView.js';

class CalcDisplayView extends DisplayView {
  _parentEl = document.querySelector('.display_container');
  _resultEl;
  _expressionEl;

  _generateMarkup() {
    return `
      <div class="calc_display_expression"></div>
      <div class="calc_display_result">0</div>
    `;
  } // end generateMarkup

  _initElements() {
    this._resultEl = document.querySelector('.calc_display_expression');
    this._expressionEl = document.querySelector('.calc_display_result');
  }
} // end CalcDisplayView

export default new CalcDisplayView();
