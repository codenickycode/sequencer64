import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeKit } from 'App/reducers/sequenceSlice';
import { setFetchingSamples } from 'App/reducers/assetsSlice';
import { setStatus } from 'App/reducers/appSlice';
import { preFetchSamples } from 'api';

export const useKitBtnState = (i, counterRef) => {
  const dispatch = useDispatch();

  const serviceWorkerActive = useSelector(
    (state) => state.app.serviceWorkerActive
  );
  const sequenceKit = useSelector((state) => state.sequence.present.kit);
  const kit = useSelector((state) => {
    return Object.values(state.assets.kits)[i];
  });
  const { name, available, fetching } = kit;
  const btnDisabled = fetching;
  const selected = kit.name === sequenceKit;

  const prevAvailRef = useRef(available);
  const [readyClasses, setReadyClasses] = useState('ready');
  useEffect(() => {
    let timer;
    if (available && !prevAvailRef.current) {
      prevAvailRef.current = true;
      setReadyClasses('ready show');
      timer = setTimeout(() => setReadyClasses('ready'), 1500);
    }
    return () => clearTimeout(timer);
  }, [available, name]);

  const classes = {
    btn: selected ? 'selected' : !available ? 'borderDim' : '',
    ready: readyClasses,
    name: fetching ? 'name flashing' : !available ? 'name dim' : 'name',
    icon: fetching ? 'flashing' : '',
  };

  const onClick = async () => {
    if (available || !serviceWorkerActive) return dispatch(changeKit(name));
    dispatch(setFetchingSamples({ kit: name, fetching: true }));
    const thisClick = ++counterRef.current;
    const [received, error] = await preFetchSamples(kit.samples);
    if (received && thisClick === counterRef.current) dispatch(changeKit(name));
    if (error) dispatch(setStatus('Error loading kit: ', name));
    dispatch(
      setFetchingSamples({ kit: name, fetching: false, available: received })
    );
  };

  const state = { selected, available, classes, btnDisabled, name };
  const functions = { onClick };

  return { state, functions };
};
