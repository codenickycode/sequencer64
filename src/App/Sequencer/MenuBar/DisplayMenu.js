import ReactDOM from 'react-dom';
import { setTheme } from 'App/reducers/appSlice';
import { setAnalyzerOn } from 'App/reducers/screenSlice';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { Button } from 'App/shared/Button';
import { TVIcon } from 'assets/icons';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePopupMenu } from 'utils/usePopupMenu';

export const DisplayMenu = () => {
  const {
    btnClasses,
    btnRef,
    onClick,
    menuStyle,
    menuClasses,
    renderMenu,
  } = usePopupMenu(true);

  return (
    <div ref={btnRef} className='menuBtnWrapper'>
      <Button id='displayBtn' classes={btnClasses} onClick={onClick}>
        <TVIcon />
        <label htmlFor='displayBtn'>display</label>
      </Button>
      {renderMenu && (
        <DisplayPopupMenu menuStyle={menuStyle} menuClasses={menuClasses} />
      )}
    </div>
  );
};

const THEMES = {
  JOKER: 'Joker',
  NES: 'NES',
  TMNT: 'TMNT',
  BLACK: 'Black',
  WHITE: 'White',
};

const DisplayPopupMenu = ({ menuStyle, menuClasses }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const analyzerOn = useSelector((state) => state.screen.analyzerOn);
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP || mode === MODES.TAP_RECORD;

  const changeTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  const toggleAnalyzer = useCallback(() => {
    const newAnalyzerOn = !analyzerOn;
    dispatch(setAnalyzerOn(newAnalyzerOn));
    if (!splitSamplePanel && mode && !tapping) dispatch(setMode(null));
  }, [analyzerOn, dispatch, mode, splitSamplePanel, tapping]);

  const portal = document.getElementById('popupMenuPortal');
  return !portal
    ? null
    : ReactDOM.createPortal(
        <div style={menuStyle} className={menuClasses}>
          <div className='popupMenuSub'>Themes</div>
          <Button
            id={`${THEMES.JOKER}Theme`}
            classes={
              theme === THEMES.JOKER ? 'popupMenuBtn active' : 'popupMenuBtn'
            }
            onClick={() => changeTheme(THEMES.JOKER)}
          >
            <label htmlFor={`${THEMES.JOKER}Theme`}>{THEMES.JOKER}</label>
          </Button>
          <Button
            id={`${THEMES.NES}Theme`}
            classes={
              theme === THEMES.NES ? 'popupMenuBtn active' : 'popupMenuBtn'
            }
            onClick={() => changeTheme(THEMES.NES)}
          >
            <label htmlFor={`${THEMES.NES}Theme`}>{THEMES.NES}</label>
          </Button>
          <Button
            id={`${THEMES.TMNT}Theme`}
            classes={
              theme === THEMES.TMNT ? 'popupMenuBtn active' : 'popupMenuBtn'
            }
            onClick={() => changeTheme(THEMES.TMNT)}
          >
            <label htmlFor={`${THEMES.TMNT}Theme`}>{THEMES.TMNT}</label>
          </Button>
          <Button
            id={`${THEMES.BLACK}Theme`}
            classes={
              theme === THEMES.BLACK ? 'popupMenuBtn active' : 'popupMenuBtn'
            }
            onClick={() => changeTheme(THEMES.BLACK)}
          >
            <label htmlFor={`${THEMES.BLACK}Theme`}>{THEMES.BLACK}</label>
          </Button>
          <Button
            id={`${THEMES.WHITE}Theme`}
            classes={
              theme === THEMES.WHITE ? 'popupMenuBtn active' : 'popupMenuBtn'
            }
            onClick={() => changeTheme(THEMES.WHITE)}
          >
            <label htmlFor={`${THEMES.WHITE}Theme`}>{THEMES.WHITE}</label>
          </Button>
          <div className='popupMenuSub'>Analyzer</div>
          <Button
            id='toggleAnalyzer'
            classes={analyzerOn ? 'popupMenuBtn active' : 'popupMenuBtn'}
            onClick={toggleAnalyzer}
          >
            <label htmlFor='toggleAnalyzer'>
              Power: {analyzerOn ? 'on' : 'off'}
            </label>
          </Button>
        </div>,
        portal
      );
};
