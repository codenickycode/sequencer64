import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Theme = () => {
  const theme = useSelector((state) => state.app.theme);

  useEffect(() => {
    document.getElementById('root').className = `theme${theme}`;
  }, [theme]);
  return null;
};
