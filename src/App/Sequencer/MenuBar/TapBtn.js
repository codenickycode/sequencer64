import ReactDOM from 'react-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useLocation } from 'react-router';
import { PATHS } from 'utils/useGoTo';
import { useMenu } from 'utils/useMenu';

export const TapBtn = () => {
  const pathname = useLocation().pathname;
  const showingKits = pathname === PATHS.CHANGE_KIT;
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;
  const tapRecording = mode === MODES.TAP_RECORD;

  const {
    btnClasses,
    btnRef,
    onClick,
    menuStyle,
    menuClasses,
    renderMenu,
  } = useMenu();
  // console.log('rendering: ChangeKitBtn');
  let addClasses = ' tap';
  if (tapping) addClasses += ' active';
  if (tapRecording) addClasses += ' active record';
  return (
    <div ref={btnRef} className='menuBtnWrapper'>
      <Button
        id='tapModeBtn'
        classes={btnClasses + addClasses}
        disabled={showingKits}
        onClick={onClick}
      >
        <TapIcon />
        <label htmlFor='tapModeBtn'>tap</label>
      </Button>
      {renderMenu && (
        <TapMenu menuStyle={menuStyle} menuClasses={menuClasses} />
      )}
    </div>
  );
};

const TapMenu = ({ menuStyle, menuClasses }) => {
  const dispatch = useDispatch();

  const portal = document.getElementById('menuPortal');
  return !portal
    ? null
    : ReactDOM.createPortal(
        <div style={menuStyle} className={menuClasses}>
          <div className='menuItemSub'>Tap Modes</div>
          <Button
            id='tapMode'
            classes='menuItemBtn'
            onClick={() => dispatch(setMode(MODES.TAP))}
          >
            <label htmlFor='tapMode'>Play</label>
          </Button>
          <Button
            id='tapRecordMode'
            classes='menuItemBtn'
            onClick={() => dispatch(setMode(MODES.TAP_RECORD))}
          >
            <label htmlFor='tapRecordMode'>Record</label>
          </Button>
          <Button
            id='tapModeOff'
            classes='menuItemBtn'
            onClick={() => dispatch(setMode(null))}
          >
            <label htmlFor='tapModeOff'>Off</label>
          </Button>
        </div>,
        portal
      );
};
