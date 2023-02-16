import NumberPadView from './numberPadView.js';

class CalculatorNumberPadView extends NumberPadView {
  _parentEl = document.querySelector('.number_pad');

  _generateMarkup() {
    return `
      <button class="btn number" value="7">7</button>
      <button class="btn number" value="8">8</button>
      <button class="btn number" value="9">9</button>
      <button class="btn number" value="4">4</button>
      <button class="btn number" value="5">5</button>
      <button class="btn number" value="6">6</button>
      <button class="btn number" value="1">1</button>
      <button class="btn number" value="2">2</button>
      <button class="btn number" value="3">3</button>
      <button class="btn number" value="+/-">&plusmn;</button>
      <button class="btn number" value="0">0</button>
      <button class="btn number" value=".">.</button>
    `;
  } // end generateMarkup
} // end of CalculatorNumberPadView

export default new CalculatorNumberPadView();
