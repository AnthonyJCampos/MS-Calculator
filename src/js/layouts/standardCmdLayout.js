class StandardCmdLayout {
  _generateButtons() {
    return `
    <button class="btn cmd" value="%">&percnt;</button>
    <button class="btn cmd" value="clear entry">CE</button>
    <button class="btn cmd" value="clear">C</button>
    <button class="btn cmd" value="back">Back</button>
    <button class="btn cmd" value="inverse">
      x<span class="standard_expo">-1</span>
    </button>
    <button class="btn cmd" value="sqr">
      x<span class="standard_expo">2</span>
    </button>
    <button class="btn cmd" value="sqrt">&Sqrt;</button>
    <button class="btn cmd" value="/">&divide;</button>
    <button class="btn cmd" value="*">&times;</button>
    <button class="btn cmd" value="-">&minus;</button>
    <button class="btn cmd" value="+">&plus;</button>
    <button class="btn cmd" value="=">&equals;</button>
    `;
  } // end generateMarkup
} // end of StandardCmdLayout

export default new StandardCmdLayout();
