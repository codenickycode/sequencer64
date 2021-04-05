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
        <Button id='changeTheme' classes='menuBtn' onClick={onClick}>
          <PaletteIcon addClass={showThemes ? 'active' : ''} />
          <label className={showThemes ? 'active' : ''} htmlFor='changeTheme'>
            theme
          </label>
        </Button>
        <Themes showThemes={showThemes} />
      </>
    );
  }, [dispatch, showThemes]);
  return memo;
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
        id='synthTheme'
        classes={theme === 'Synth' ? 'themeBtn active' : 'themeBtn'}
        onClick={() => onClick('Synth')}
      >
        <label htmlFor='synthTheme'>Synth</label>
      </Button>
      <Button id='nesTheme' classes='themeBtn' onClick={() => onClick('NES')}>
        <label htmlFor='nesTheme'>NES</label>
      </Button>
      <Button id='snesTheme' classes='themeBtn' onClick={() => onClick('SNES')}>
        <label htmlFor='snesTheme'>SNES</label>
      </Button>
    </div>,
    document.getElementById('themesPortal')
  );
};
