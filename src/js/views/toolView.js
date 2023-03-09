import { LAYOUT_MAP, BtnContainer } from '../config.js';
import View from './View.js';

class ToolView extends View {
  _parentEl = document.querySelector('.tool_container');
  _toolType;

  setTool(toolType = 'Standard') {
    if (this._toolType) {
      this._parentEl.classList.remove(this._toolType.toLowerCase());
    }
    this._toolType = toolType;
    this._parentEl.classList.add(this._toolType.toLowerCase());
  } // end setTool

  addHandlerNav(handler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.nav__btn');

      if (!btn) {
        return;
      }

      const dropdownEl = document.querySelector('.nav__dropdown');
      dropdownEl.classList.toggle('hidden');
      handler();
    });
  }

  _generateMarkup() {
    return `
      <div class="nav__dropdown hidden">
        <button class="nav__btn">
          <img
            src="src/img/menu-symbol.svg"
            alt="menu button, click to open menu"
            class="menu__svg"
          />
        </button>
        <h2 class="nav_list--title">Calculator</h2>
        <ul class="calc_list">
        <li class="list_item">
          Standard
        </li>
        </ul>
        <h2 class="nav_list--title">Converter</h2>
        <ul class="converter_list">
        <li class="list_item">
          Length
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
