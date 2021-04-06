export const hideEditable = () => {
  const cells = document.querySelectorAll('.on');
  cells.forEach((cell) => cell.classList.remove('flashing'));
};

export const showEditable = () => {
  const cells = document.querySelectorAll('.on');
  cells.forEach((cell) => cell.classList.add('flashing'));
};
