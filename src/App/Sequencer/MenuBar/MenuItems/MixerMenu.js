import { MODES, setMode } from 'App/reducers/editorSlice';
import { MenuItem, PopupMenu } from 'App/shared/PopupMenu/PopupMenu';
import { MixerIcon } from 'assets/icons';
import { useGoTo, useCurrentPath } from 'hooks/useGoTo';
import { useDispatch } from 'react-redux';

export const MixerMenu = () => {
  const dispatch = useDispatch();
  const goTo = useGoTo();
  const { mixing } = useCurrentPath();

  const activeCB = () => {
    goTo.base(() => dispatch(setMode(MODES.INIT)));
  };

  return (
    <>
      <PopupMenu
        addBtnClasses={mixing ? ' mixerBtn active' : 'mixerBtn'}
        name='mixer'
        Icon={MixerIcon}
        active={mixing}
        activeCB={activeCB}
      >
        <MixerMenuItems />
      </PopupMenu>
    </>
  );
};

export const MixerMenuItems = () => {
  const dispatch = useDispatch();
  const goTo = useGoTo();
  const { mixingGlobal, mixingSamples } = useCurrentPath();
  const openPath = (path) => goTo[path](() => dispatch(setMode(MODES.TAP)));
  return (
    <>
      <MenuItem
        item={'Global'}
        selected={mixingGlobal}
        onClick={() => openPath('globalMixer')}
      />
      <MenuItem
        item={'Samples'}
        selected={mixingSamples}
        onClick={() => openPath('sampleMixer')}
      />
    </>
  );
};
