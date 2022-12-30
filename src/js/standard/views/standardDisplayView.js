class StandardDisplayView {
  #parentEl = document.querySelector('.calc_display_container');
  #resultEl = document.querySelector('.calc_display_expression');
  #expressionEl = document.querySelector('.calc_display_result');
  #data;

  render(data) {
    const { expression, result } = data;
    this.#expressionEl.textContent = expression;
    this.#resultEl.textContent = result;
  }
} // end ExpressionView

export default StandardDisplayView();
