import { setTheme, setShowDisplayMenu } from 'App/reducers/appSlice';
import { setAnalyzerOn } from 'App/reducers/screenSlice';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { Button } from 'App/shared/Button';
import { TVIcon } from 'assets/icons';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Display = () => {
  const dispatch = useDispatch();
  const showDisplayMenu = useSelector((state) => state.app.showDisplayMenu);

  const onClick = useCallback(() => {
    dispatch(setShowDisplayMenu(!showDisplayMenu));
  }, [dispatch, showDisplayMenu]);

  const memo = useMemo(() => {
    return (
      <div className='menuBtnWrapper'>
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
  const analyzerOn = useSelector((state) => state.screen.analyzerOn);
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP || mode === MODES.TAP_RECORD;

  const changeTheme = useCallback(
    (newTheme) => {
      dispatch(setTheme(newTheme));
    },
    [dispatch]
  );

  const toggleAnalyzer = useCallback(() => {
    const newAnalyzerOn = !analyzerOn;
    dispatch(setAnalyzerOn(newAnalyzerOn));
    if (!splitSamplePanel && mode && !tapping) dispatch(setMode(null));
  }, [analyzerOn, dispatch, mode, splitSamplePanel, tapping]);

  const memo = useMemo(() => {
    return (
      <div className={showDisplayMenu ? 'menuItem show' : 'menuItem'}>
        <div className='menuItemSub'>Themes</div>
        <Button
          id={`${THEMES.JOKER}Theme`}
          classes={
            theme === THEMES.JOKER ? 'menuItemBtn active' : 'menuItemBtn'
          }
          onClick={() => changeTheme(THEMES.JOKER)}
        >
          <label htmlFor={`${THEMES.JOKER}Theme`}>{THEMES.JOKER}</label>
        </Button>
        <Button
          id={`${THEMES.NES}Theme`}
          classes={theme === THEMES.NES ? 'menuItemBtn active' : 'menuItemBtn'}
          onClick={() => changeTheme(THEMES.NES)}
        >
          <label htmlFor={`${THEMES.NES}Theme`}>{THEMES.NES}</label>
        </Button>
        <Button
          id={`${THEMES.TMNT}Theme`}
          classes={theme === THEMES.TMNT ? 'menuItemBtn active' : 'menuItemBtn'}
          onClick={() => changeTheme(THEMES.TMNT)}
        >
          <label htmlFor={`${THEMES.TMNT}Theme`}>{THEMES.TMNT}</label>
        </Button>
        <Button
          id={`${THEMES.BLACK}Theme`}
          classes={
            theme === THEMES.BLACK ? 'menuItemBtn active' : 'menuItemBtn'
          }
          onClick={() => changeTheme(THEMES.BLACK)}
        >
          <label htmlFor={`${THEMES.BLACK}Theme`}>{THEMES.BLACK}</label>
        </Button>
        <Button
          id={`${THEMES.WHITE}Theme`}
          classes={
            theme === THEMES.WHITE ? 'menuItemBtn active' : 'menuItemBtn'
          }
          onClick={() => changeTheme(THEMES.WHITE)}
        >
          <label htmlFor={`${THEMES.WHITE}Theme`}>{THEMES.WHITE}</label>
        </Button>
        <div className='menuItemSub'>Analyzer</div>
        <Button
          id='toggleAnalyzer'
          classes={analyzerOn ? 'menuItemBtn active' : 'menuItemBtn'}
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
