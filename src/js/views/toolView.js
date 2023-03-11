import { LAYOUT_MAP, BtnContainer } from '../config.js';
import View from './View.js';

class ToolView extends View {
  _parentEl = document.querySelector('.tool_container');
  _toolType;

  setTool(toolType = 'Standard') {
    if (this._toolType) {
      this._parentEl.classList.remove(LAYOUT_MAP.get(this._toolType).type);
    }
    this._toolType = toolType;
    this._parentEl.classList.add(LAYOUT_MAP.get(this._toolType).type);
  } // end setTool

  addHandlerMenuSelection(handler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.list_btn');
      if (!btn) {
        return;
      }

      handler(btn.value);
    });
  }
  _addHandlerNav() {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.nav__btn');

      if (!btn) {
        return;
      }

      const dropdownEl = document.querySelector('.nav__dropdown');
      dropdownEl.classList.toggle('hidden');
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
          <button class="list_btn" value="Standard">Standard</button>
        </li>
        </ul>
        <h2 class="nav_list--title">Converter</h2>
        <ul class="converter_list">
        <li class="list_item">
          <button class="list_btn" value="Length">Length</button>
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
      ${LAYOUT_MAP.get(this._toolType).layout}
      `;
  } // end generateMarkup

  initComponents(components) {
    for (const component of Object.values(components)) {
      component?.init();
    } // end for
    this._addHandlerNav();
  }
} // end ToolView

export default new ToolView();

{
}
