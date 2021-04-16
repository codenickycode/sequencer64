import { Button } from 'App/shared/Button';
import { CloseIcon } from 'assets/icons';
import { MODES } from 'App/reducers/editorSlice';
import { useMemo } from 'react';
import { useModeBtn, useSampleEditMenu } from './useSampleEditMenu';

export const SampleEditMenu = () => {
  const { container, onClose } = useSampleEditMenu();
  const memo = useMemo(() => {
    return (
      <div ref={container.ref} id='editMenu' className={container.class}>
        <Button classes='close' onClick={onClose}>
          <CloseIcon />
        </Button>
        <div className='sampleMenuBtn dummy' />
        <ModeBtn mode={MODES.ERASE} />
        <ModeBtn mode={MODES.SLICE} />
        <ModeBtn mode={MODES.COPY} />
        <ModeBtn mode={MODES.MOD_VELOCITY} />
        <ModeBtn mode={MODES.MOD_LENGTH} />
        <ModeBtn mode={MODES.MOD_PITCH} />
      </div>
    );
  }, [container.class, container.ref, onClose]);
  return memo;
};

const ModeBtn = ({ mode }) => {
  const { modeName, Icon, disabled, selectMode } = useModeBtn(mode);

  const memo = useMemo(() => {
    return (
      <Button classes='sampleMenuBtn' disabled={disabled} onClick={selectMode}>
        <Icon />
        <p>{modeName}</p>
      </Button>
    );
  }, [disabled, modeName, selectMode]);
  return memo;
};
