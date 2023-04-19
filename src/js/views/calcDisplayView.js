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

  resizeText(resultText) {
    const resultLength = resultText.length;
    console.log(this._resultEl);
    const fontSize = window
      .getComputedStyle(this._resultEl)
      .getPropertyValue('font-size')
      .slice(0, -2);

    console.log(fontSize);

    const updatedSize = Math.round(fontSize * 0.75);
    console.log(`Updated Size ${updatedSize}`);
    if (resultLength >= 13) {
      this._resultEl.style.fontSize = `${updatedSize}px`;
    }
  }
} // end CalcDisplayView

export default new CalcDisplayView();
