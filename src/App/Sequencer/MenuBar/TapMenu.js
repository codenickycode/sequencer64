import ReactDOM from 'react-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { TapIcon } from 'assets/icons';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { useLocation } from 'react-router';
import { PATHS } from 'utils/useGoTo';
import { usePopupMenu } from 'utils/usePopupMenu';

export const TapMenu = () => {
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
  } = usePopupMenu();
  // console.log('rendering: ChangeKitBtn');
  let addClasses = ' tap';
  if (tapping) addClasses += ' active';
  if (tapRecording) addClasses += ' active record';
  return (
    <div ref={btnRef} className='menuBtnWrapper'>
      <Button
        id='tapMenuBtn'
        classes={btnClasses + addClasses}
        disabled={showingKits}
        onClick={onClick}
      >
        <TapIcon />
        <label htmlFor='tapMenuBtn'>tap</label>
      </Button>
      {renderMenu && (
        <TapPopupMenu menuStyle={menuStyle} menuClasses={menuClasses} />
      )}
    </div>
  );
};

const TapPopupMenu = ({ menuStyle, menuClasses }) => {
  const dispatch = useDispatch();

  const portal = document.getElementById('popupMenuPortal');
  return !portal
    ? null
    : ReactDOM.createPortal(
        <div style={menuStyle} className={menuClasses}>
          <div className='popupMenuSub'>Tap Modes</div>
          <Button
            id='tapMode'
            classes='popupMenuBtn'
            onClick={() => dispatch(setMode(MODES.TAP))}
          >
            <label htmlFor='tapMode'>Play</label>
          </Button>
          <Button
            id='tapRecordMode'
            classes='popupMenuBtn'
            onClick={() => dispatch(setMode(MODES.TAP_RECORD))}
          >
            <label htmlFor='tapRecordMode'>Record</label>
          </Button>
          <Button
            id='tapModeOff'
            classes='popupMenuBtn'
            onClick={() => dispatch(setMode(null))}
          >
            <label htmlFor='tapModeOff'>Off</label>
          </Button>
        </div>,
        portal
      );
};
