import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeKit } from 'App/reducers/sequenceSlice';

export const useKitBtnState = (i) => {
  const dispatch = useDispatch();

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
    dispatch(changeKit(name));
  };

  const state = { selected, available, classes, btnDisabled, name };
  const functions = { onClick };

  return { state, functions };
};
