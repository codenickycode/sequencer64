import { MODES, setMode } from 'App/reducers/editorSlice';
import { MenuItem, PopupMenu } from 'App/shared/PopupMenu/PopupMenu';
import { MixerIcon } from 'assets/icons';
import { useGoTo, useCurrentPath } from 'hooks/useGoTo';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const MixerMenu = () => {
  const dispatch = useDispatch();
  const goTo = useGoTo();
  const { mixing } = useCurrentPath();

  const activeCB = useCallback(() => {
    goTo.base(() => dispatch(setMode(MODES.INIT)));
  }, [dispatch, goTo]);

  const memo = useMemo(() => {
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
  }, [activeCB, mixing]);
  return memo;
};

export const MixerMenuItems = () => {
  const goTo = useGoTo();
  const { mixingMain, mixingSamples } = useCurrentPath();
  const openPath = (path) => goTo[path]();
  return (
    <>
      <MenuItem item={'Main'} selected={mixingMain} onClick={() => openPath('mainMixer')} />
      <MenuItem
        item={'Samples'}
        selected={mixingSamples}
        onClick={() => openPath('sampleMixer')}
      />
    </>
  );
};
