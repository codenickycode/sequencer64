export const getY = (e) => {
  let y;
  if (e.touches) y = e.touches[0].clientY;
  else y = e.clientY;
  return y;
};
