import ReactDOM from 'react-dom';
import { setShow, VIEWS } from 'App/reducers/appSlice';
import { Button } from 'App/shared/Button';
import { PaletteIcon } from 'assets/icons';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'App/reducers/appSlice';

export const ChangeTheme = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.show);
  const showThemes = show === VIEWS.THEMES;

  const memo = useMemo(() => {
    const onClick = () => {
      dispatch(setShow(showThemes ? '' : VIEWS.THEMES));
    };
    return (
      <>
        <Button
          id='changeTheme'
          classes={showThemes ? 'menuBtn active' : 'menuBtn'}
          onClick={onClick}
        >
          <PaletteIcon />
          <label htmlFor='changeTheme'>theme</label>
        </Button>
        <Themes showThemes={showThemes} />
      </>
    );
  }, [dispatch, showThemes]);
  return memo;
};

const THEMES = {
  JOKER: 'Joker',
  NES: 'NES',
  TMNT: 'TMNT',
  BLACK: 'Black',
  WHITE: 'White',
};

const Themes = ({ showThemes }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);

  const onClick = (newTheme) => {
    dispatch(setTheme(newTheme));
  };
  return ReactDOM.createPortal(
    <div className={showThemes ? 'themes show' : 'themes'}>
      <Button
        id={`${THEMES.JOKER}Theme`}
        classes={theme === THEMES.JOKER ? 'themeBtn active' : 'themeBtn'}
        onClick={() => onClick(THEMES.JOKER)}
      >
        <label htmlFor={`${THEMES.JOKER}Theme`}>{THEMES.JOKER}</label>
      </Button>
      <Button
        id={`${THEMES.NES}Theme`}
        classes={theme === THEMES.NES ? 'themeBtn active' : 'themeBtn'}
        onClick={() => onClick(THEMES.NES)}
      >
        <label htmlFor={`${THEMES.NES}Theme`}>{THEMES.NES}</label>
      </Button>
      <Button
        id={`${THEMES.TMNT}Theme`}
        classes={theme === THEMES.TMNT ? 'themeBtn active' : 'themeBtn'}
        onClick={() => onClick(THEMES.TMNT)}
      >
        <label htmlFor={`${THEMES.TMNT}Theme`}>{THEMES.TMNT}</label>
      </Button>
      <Button
        id={`${THEMES.BLACK}Theme`}
        classes={theme === THEMES.BLACK ? 'themeBtn active' : 'themeBtn'}
        onClick={() => onClick(THEMES.BLACK)}
      >
        <label htmlFor={`${THEMES.BLACK}Theme`}>{THEMES.BLACK}</label>
      </Button>
      <Button
        id={`${THEMES.WHITE}Theme`}
        classes={theme === THEMES.WHITE ? 'themeBtn active' : 'themeBtn'}
        onClick={() => onClick(THEMES.WHITE)}
      >
        <label htmlFor={`${THEMES.WHITE}Theme`}>{THEMES.WHITE}</label>
      </Button>
    </div>,
    document.getElementById('themesPortal')
  );
};
