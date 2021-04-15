export const showAndHideClass = (setter, classes, timeout) => {
  setter(classes + ' show');
  setTimeout(() => setter(classes), timeout);
};

export const showAndHideInfo = (setter, info, timeout) => {
  setter(info);
  setTimeout(() => setter(''), timeout);
};
