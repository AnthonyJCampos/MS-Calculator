class ToolView {
  _parentEl = document.querySelector('.tool_main_container');

  render(layout) {
    if (!layout) {
      return;
    }

    const markup = this._generateMarkup(layout);
    this._clear();
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  } // end render

  initComponents(components) {
    for (const component of Object.values(components)) {
      component?.init();
    } // end for
  }

  _generateMarkup(toolLayout) {
    return `
      ${toolLayout}
      `;
  } // end generateMarkup

  _clear() {
    document.querySelector('.tool')?.remove();
    // this is required for calculators
    document.querySelector('.history')?.remove();
  } // end clear
} // end ToolView

export default new ToolView();
