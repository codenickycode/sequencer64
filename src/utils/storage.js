import { useState, useEffect } from 'react';

export const getLS = (field) => JSON.parse(localStorage.getItem(field));
export const setLS = (field, value) =>
  localStorage.setItem(field, JSON.stringify(value));

export const getSS = (field) => JSON.parse(sessionStorage.getItem(field));
export const setSS = (field, value) =>
  sessionStorage.setItem(field, JSON.stringify(value));

export const useStateAndLS = (key, val) => {
  const [state, setState] = useState(getLS(key) || val);
  useEffect(() => {
    setLS(key, state);
  }, [key, state]);

  return [state, setState];
};

export const useStateAndSS = (key, val) => {
  const [state, setState] = useState(getSS(key) || val);
  useEffect(() => {
    setSS(key, state);
  }, [key, state]);

  return [state, setState];
};
