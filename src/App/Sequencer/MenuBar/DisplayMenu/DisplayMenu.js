import React from 'react';
import { setTheme, THEMES } from 'App/reducers/appSlice';
import { ANALYZER_MODES } from 'App/reducers/screenSlice';
import { TVIcon } from 'assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  MenuItem,
  MenuItemToggle,
  PopupMenu,
} from 'App/shared/PopupMenu/PopupMenu';
import { useAnalyzerMenu } from './useAnalyzerMenu';

export const DisplayMenu = () => {
  return (
    <PopupMenu name='display' Icon={TVIcon} keepOpenOnSelect={true}>
      <Themes />
      <Analyzer />
    </PopupMenu>
  );
};

const themes = Object.values(THEMES);
const Themes = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.app.theme);
  const changeTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };
  return (
    <>
      <div className='popupMenuSub'>Themes</div>
      {themes.map((theme) => {
        const selected = theme === currentTheme;
        return (
          <MenuItem
            key={`selectTheme${theme}`}
            item={theme}
            selected={selected}
            onClick={changeTheme}
          />
        );
      })}
    </>
  );
};

const analyzerModes = Object.values(ANALYZER_MODES);
const Analyzer = () => {
  const { currentMode, changeMode, toggle, on } = useAnalyzerMenu();

  return (
    <>
      <div className='popupMenuSub'>Analyzer</div>
      {analyzerModes.map((mode) => {
        const selected = mode === currentMode;
        return (
          <MenuItem
            key={`selectAnalyzerMode${mode}`}
            item={mode}
            selected={selected}
            onClick={changeMode}
          />
        );
      })}
      <MenuItemToggle
        item={'Analyzer'}
        on={on}
        onClick={toggle}
        label={`Power: ${on ? 'on' : 'off'}`}
      />
    </>
  );
};
