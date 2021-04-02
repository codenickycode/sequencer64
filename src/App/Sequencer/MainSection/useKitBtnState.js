import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from 'App/reducers/appSlice';
import { changeKit } from 'App/reducers/sequenceSlice';

export const useKitBtnState = (kitName, available) => {
  const dispatch = useDispatch();

  const sequenceKit = useSelector((state) => state.sequence.present.kit);
  const selected = kitName === sequenceKit;

  const [ready, setReady] = useState(available);
  const [showReady, setShowReady] = useState(false);
  const prevReadyRef = useRef(ready);
  useEffect(() => {
    let timer;
    if (ready) {
      if (!showReady && !prevReadyRef.current) {
        setShowReady(true);
        prevReadyRef.current = true;
      }
      timer = setTimeout(() => setShowReady(false), 1500);
    }
    return () => clearTimeout(timer);
  }, [ready, showReady]);

  const [fetching, setFetching] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const btnDisabled = disabled || fetching;

  const classes = {
    btn: selected ? 'selected' : !ready ? 'dim-border' : '',
    ready: showReady ? 'ready show' : 'ready',
    name: fetching ? 'name flashing' : !ready ? 'name dim' : 'name',
    icon: fetching ? 'flashing' : '',
  };

  const onClick = async () => {
    setDisabled(true);
    try {
      dispatch(changeKit(kitName));
      setReady(true);
    } catch (e) {
      if (!ready) {
        dispatch(setStatus('Error downloading kit: ', kitName));
      } else {
        dispatch(setStatus('Error loading kit: ', kitName));
      }
    } finally {
      setDisabled(false);
      setFetching(false);
    }
  };

  const state = { selected, ready, classes, btnDisabled };
  const functions = { onClick };

  return { state, functions };
};
