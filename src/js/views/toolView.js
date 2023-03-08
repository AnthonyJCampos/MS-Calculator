import { LAYOUT_MAP, BtnContainer } from '../config.js';
import View from './View.js';

class ToolView extends View {
  _parentEl = document.querySelector('.tool_container');
  _toolType = 'Standard';

  setTool(toolType = 'Standard') {
    this._toolType = toolType;
  } // end setTool

  addHandlerNav(handler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closet('.nav__dropdown');
      if (!btn) {
        return;
      }

      btn.toggle('hidden');
    });
  }

  _generateMarkup() {
    return `
      <div class="nav__dropdown hidden">
        <button class="nav__dropdown">
          <img
            src="src/img/menu-symbol.svg"
            alt="menu button, click to open menu"
            class="menu__svg"
          />
        </button>
        <h2 class="calc_list--title">Calculator</h2>
        <ul class="calc_list">
        <li class="calc_item">
          Standard
        </li>
        </ul>
      </div> 
      <nav class="nav">
        <button class="nav__btn">
          <img
            src="src/img/menu-symbol.svg"
            alt="menu button, click to open menu"
            class="menu__svg"
          />
        </button>
        <h2 class="tool__title">${this._toolType}</h2>
      </nav>
      ${LAYOUT_MAP.get(this._toolType)}
      `;
  } // end generateMarkup

  initComponents(components) {
    for (const component of Object.values(components)) {
      component?.init();
    } // end for
  }
} // end ToolView

export default new ToolView();

{
}
