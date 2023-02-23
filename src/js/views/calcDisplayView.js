class CalcDisplayView {
  // _parentEl = document.querySelector('.display_container');
  _parentEl;
  _resultEl;
  _expressionEl;

  update(data) {
    const { result, expression } = data;

    this._resultEl.textContent = result;
    this._expressionEl.textContent = expression;
  } // end update

  init() {
    this._parentEl = document.querySelector('.display_container');
    this._expressionEl = document.querySelector('.calc_display_expression');
    this._resultEl = document.querySelector('.calc_display_result');
  } // end init
} // end CalcDisplayView

export default new CalcDisplayView();
