export const pressDown = (ref) => {
  if (ref.current) {
    if (!ref.current.hasAttribute('disabled'))
      ref.current.classList.add('pressed');
  }
};

export const pressUp = (ref) => {
  if (ref.current) ref.current.classList.remove('pressed');
};
