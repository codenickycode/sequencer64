const NUM_SCROLLS = 3;

export const getFullyScrolled = (container) => {
  const leftFullyScrolled = container.scrollLeft <= 0;
  const scrollRight = container.scrollLeft + container.clientWidth;
  const fullWidth = NUM_SCROLLS * container.clientWidth;
  const rightFullyScrolled = scrollRight >= fullWidth;
  return { left: leftFullyScrolled, right: rightFullyScrolled };
};

export const getScrollToLeft = (container, dir) => {
  let offset = container.clientWidth;
  if (dir === 'left') offset *= -1;
  const start = container.scrollLeft;
  const left = start + offset;
  return left;
};

export const scrollToTransport = () => {
  const menuBar = document.getElementById('menuBar');
  const transport = document.getElementById('transport');
  if (!menuBar || !transport) return;
  const { left } = transport.getBoundingClientRect();
  menuBar.scrollTo({
    left,
    behavior: 'smooth',
  });
};
