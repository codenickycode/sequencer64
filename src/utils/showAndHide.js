export const showAndHideClass = (setter, classes, timeout) => {
  setter(classes + ' show');
  try {
    setTimeout(() => setter(classes), timeout);
  } catch (e) {
    console.log('component unloaded');
  }
};

export const addAndRemoveClass = (setter, initialClasses, classesToAdd, timeout) => {
  setter(initialClasses + ' ' + classesToAdd);
  try {
    setTimeout(() => setter(initialClasses), timeout);
  } catch (e) {
    console.log('component unloaded');
  }
};

export const showAndHideInfo = (setter, info, timeout) => {
  setter(info);
  try {
    setTimeout(() => setter(''), timeout);
  } catch (e) {
    console.log('component unloaded');
  }
};
