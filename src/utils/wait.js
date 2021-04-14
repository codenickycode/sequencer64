export const wait = (timeout, func) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (func) func();
      resolve();
    }, timeout);
  });
