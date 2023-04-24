import { menuIcon } from '../../icons/icons.js';
import { removeAllClassesExcept } from '../helpers/helper.js';

class NavView {
  _parentEl = document.querySelector('.tool_main_container');

  render(data) {
    if (!data) {
      return;
    }

    // 1. get key data components

    const { defaultTool, toolSelections } = data;

    // 2. remove previous styling
    removeAllClassesExcept('tool_main_container');

    // 3.
    this._parentEl.classList.add(defaultTool.type.toLowerCase());

    const markup = this._generateMarkup(toolSelections, defaultTool.tool);

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  } // end render

  update(data) {
    if (!data) {
      return;
    }

    // 1. remove previous styling
    removeAllClassesExcept('tool_main_container');

    // 2.
    this._parentEl.classList.add(data.type.toLowerCase());

    this._parentEl.querySelector('.tool__title').textContent = data.title;
  } // end update

  addHandlerMenuSelection(handler) {
    this._parentEl.addEventListener('click', function (event) {
      const btn = event.target.closest('.list_btn');
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

  addHandlerWindowClick() {
    window.addEventListener('click', function (event) {
      if (
        !event.target.matches('.nav__btn') &&
        !event.target.matches('.nav__dropdown')
      ) {
        const dropdownEl = document.querySelector('.nav__dropdown');

        if (!dropdownEl) {
          console.error('error in toolview window click event');
          return;
        }
        dropdownEl.classList.add('hidden');
      }
    });
  } // end addHandlerWindowClick

  _generateMarkup(toolSelections, defaultTool) {
    return `
      <div class="nav__dropdown hidden">  
        <button class="nav__btn">
         ${menuIcon}
        </button>
        ${toolSelections
          .map(toolCollection => this._gnerateNavOptionList(toolCollection))
          .join('')}
      </div> 
      <nav class="nav">
        <button class="nav__btn">
        ${menuIcon}
        </button>
        <h2 class="tool__title">${defaultTool}</h2>
      </nav>
      `;
  } // end generateMarkup

  _clear() {
    this._parentEl.innerHTML = '';
  } // end clear

  _gnerateNavOptionList(toolCollection) {
    return `
    <h2 class="nav_list--title">${toolCollection.type}</h2>
    <ul>
      ${toolCollection.tools
        .map(toolOption => this._generateNavOptions(toolOption))
        .join('')}
    </ul>`;
  }

  _generateNavOptions(option) {
    return `
    <li class="list_item">
      <button class="list_btn" value="${option}" aria-label="${option}">${option}</button>
    </li>
    `;
  }
} // end NavView

export default new NavView();
