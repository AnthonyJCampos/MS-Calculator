import { menuIcon } from '../../img/icons.js';

class ToolView {
  _parentEl = document.querySelector('.tool_container');
  _toolType;

  render(layoutPackage) {
    if (!layoutPackage) {
      return;
    }

    // remove previous styling
    if (this._toolType) {
      this._parentEl.classList.remove(this._toolType);
    }
    const { toolType, toolTitle, toolLayout } = layoutPackage;
    // set the current tool type, options converter or calculator
    this._toolType = toolType;
    // add new tool type styling
    this._parentEl.classList.add(this._toolType);
    const markup = this._generateMarkup(toolLayout, toolTitle);

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  initComponents(components) {
    for (const component of Object.values(components)) {
      component?.init();
    } // end for
  }

  addHandlerMenuSelection(handler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.list_btn');
      console.log(`Button Clicked: ${btn}`);
      if (!btn) {
        return;
      }

      handler(btn.value);
    });
  }

  addHandlerNav() {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.nav__btn');

      if (!btn) {
        return;
      }

      const dropdownEl = document.querySelector('.nav__dropdown');
      dropdownEl.classList.toggle('hidden');
    });
  }
  _generateMarkup(toolLayout, toolTitle) {
    return `
      <div class="nav__dropdown hidden">
        <button class="nav__btn">
         ${menuIcon}
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
        ${menuIcon}
        </button>
        <h2 class="tool__title">${toolTitle}</h2>
      </nav>
      ${toolLayout}
      `;
  } // end generateMarkup

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear
} // end ToolView

export default new ToolView();
