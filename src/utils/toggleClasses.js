export const hideEditable = () => {
  const cells = document.querySelectorAll('.on');
  cells.forEach((cell) => cell.classList.remove('flashing'));
};

export const showEditable = () => {
  const cells = document.querySelectorAll('.on');
  cells.forEach((cell) => cell.classList.add('flashing'));
};

export const highlightSamplePanel = () => {
  const sp = document.getElementById('samplePanel');
  sp.classList.add('highlight');
};

export const unhighlightSamplePanel = () => {
  const sp = document.getElementById('samplePanel');
  sp.classList.remove('highlight');
};
