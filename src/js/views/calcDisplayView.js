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
    this._parentEl = document.querySelector('.display_container--standard');
    this._expressionEl = document.querySelector(
      '.display_expression--standard'
    );
    this._resultEl = document.querySelector('.display_result--standard');
  } // end init
} // end CalcDisplayView

export default new CalcDisplayView();
