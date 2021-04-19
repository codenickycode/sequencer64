import { MODES, setMode } from 'App/reducers/editorSlice';
import { MenuItem, PopupMenu } from 'App/shared/PopupMenu/PopupMenu';
import { MixerIcon } from 'assets/icons';
import { useGoTo, useCurrentPath } from 'hooks/useGoTo';
import { useDispatch } from 'react-redux';

export const MixerMenu = () => {
  return (
    <PopupMenu name='mixer' Icon={MixerIcon}>
      <MixerMenuItems />
    </PopupMenu>
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
