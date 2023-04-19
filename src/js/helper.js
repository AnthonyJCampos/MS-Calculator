export const resizeText = function (container, content) {
  let fontSize = parseFloat(window.getComputedStyle(content).fontSize);
  const maxHeight = container.offsetHeight;

  while (content.scrollHeight > maxHeight) {
    fontSize -= 1;
    content.style.fontSize = `${fontSize}px`;

    console.log('here');
  }
};
