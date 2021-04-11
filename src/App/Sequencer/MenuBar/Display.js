import {
  setTheme,
  setShowDisplayMenu,
  setAnalyzerOn,
} from 'App/reducers/appSlice';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { Button } from 'App/shared/Button';
import { TVIcon } from 'assets/icons';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Display = () => {
  const dispatch = useDispatch();
  const showDisplayMenu = useSelector((state) => state.app.showDisplayMenu);

  const onClick = useCallback(
    (e) => {
      console.log(e);
      dispatch(setShowDisplayMenu(!showDisplayMenu));
    },
    [dispatch, showDisplayMenu]
  );

  const memo = useMemo(() => {
    return (
      <div className='displayBtnWrapper'>
        <Button
          id='displayBtn'
          classes={showDisplayMenu ? 'menuBtn active' : 'menuBtn'}
          onClick={onClick}
        >
          <TVIcon />
          <label htmlFor='displayBtn'>display</label>
        </Button>
        <Themes />
      </div>
    );
  }, [onClick, showDisplayMenu]);
  return memo;
};

const THEMES = {
  JOKER: 'Joker',
  NES: 'NES',
  TMNT: 'TMNT',
  BLACK: 'Black',
  WHITE: 'White',
};

const Themes = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const showDisplayMenu = useSelector((state) => state.app.showDisplayMenu);
  const analyzerOn = useSelector((state) => state.app.analyzerOn);
  const splitSamplePanel = useSelector((state) => state.app.splitSamplePanel);
  const mode = useSelector((state) => state.editor.mode);

  const changeTheme = useCallback(
    (newTheme) => {
      dispatch(setTheme(newTheme));
    },
    [dispatch]
  );

  const toggleAnalyzer = useCallback(() => {
    const newAnalyzerOn = !analyzerOn;
    dispatch(setAnalyzerOn(newAnalyzerOn));
    if (!splitSamplePanel && mode && mode !== MODES.TAP)
      dispatch(setMode(null));
  }, [analyzerOn, dispatch, mode, splitSamplePanel]);

  const memo = useMemo(() => {
    return (
      <div className={showDisplayMenu ? 'displayMenu show' : 'displayMenu'}>
        <div className='displayMenuSub'>Themes</div>
        <Button
          id={`${THEMES.JOKER}Theme`}
          classes={
            theme === THEMES.JOKER ? 'displayMenuBtn active' : 'displayMenuBtn'
          }
          onClick={() => changeTheme(THEMES.JOKER)}
        >
          <label htmlFor={`${THEMES.JOKER}Theme`}>{THEMES.JOKER}</label>
        </Button>
        <Button
          id={`${THEMES.NES}Theme`}
          classes={
            theme === THEMES.NES ? 'displayMenuBtn active' : 'displayMenuBtn'
          }
          onClick={() => changeTheme(THEMES.NES)}
        >
          <label htmlFor={`${THEMES.NES}Theme`}>{THEMES.NES}</label>
        </Button>
        <Button
          id={`${THEMES.TMNT}Theme`}
          classes={
            theme === THEMES.TMNT ? 'displayMenuBtn active' : 'displayMenuBtn'
          }
          onClick={() => changeTheme(THEMES.TMNT)}
        >
          <label htmlFor={`${THEMES.TMNT}Theme`}>{THEMES.TMNT}</label>
        </Button>
        <Button
          id={`${THEMES.BLACK}Theme`}
          classes={
            theme === THEMES.BLACK ? 'displayMenuBtn active' : 'displayMenuBtn'
          }
          onClick={() => changeTheme(THEMES.BLACK)}
        >
          <label htmlFor={`${THEMES.BLACK}Theme`}>{THEMES.BLACK}</label>
        </Button>
        <Button
          id={`${THEMES.WHITE}Theme`}
          classes={
            theme === THEMES.WHITE ? 'displayMenuBtn active' : 'displayMenuBtn'
          }
          onClick={() => changeTheme(THEMES.WHITE)}
        >
          <label htmlFor={`${THEMES.WHITE}Theme`}>{THEMES.WHITE}</label>
        </Button>
        <div className='displayMenuSub'>Analyzer</div>
        <Button
          id='toggleAnalyzer'
          classes={analyzerOn ? 'displayMenuBtn active' : 'displayMenuBtn'}
          onClick={toggleAnalyzer}
        >
          <label htmlFor='toggleAnalyzer'>
            Power: {analyzerOn ? 'on' : 'off'}
          </label>
        </Button>
      </div>
    );
  }, [analyzerOn, changeTheme, showDisplayMenu, theme, toggleAnalyzer]);
  return memo;
};
