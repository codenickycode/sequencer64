import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eraseSample, resetSlice } from 'App/reducers/sequenceSlice';
import { Button } from 'App/shared/Button';
import { ChevronLeftIcon, CopyIcon, EraserIcon, SawIcon } from 'assets/icons';
import { PastePattern } from 'App/Sequencer/MainSection/PastePattern';

export const Erase = ({ onReturn, landscape }) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally[selectedSample].empty
  );

  useEffect(() => {
    let timer;
    if (disabled) timer = setTimeout(() => onReturn(), 500);
    return () => clearTimeout(timer);
  }, [onReturn, disabled]);

  const onEraseAll = () => {
    dispatch(eraseSample({ selectedSample }));
  };

  // console.log('rendering: Erase');
  return (
    <div className='detail'>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='dummy' />
      <div className='middle'>
        {landscape && <EraserIcon />}
        <p className=''>Click and drag to erase cells</p>
        <Button disabled={disabled} onClick={onEraseAll}>
          Erase All
        </Button>
      </div>
      {!landscape && <EraserIcon />}
    </div>
  );
};

export const Slice = ({ onReturn, landscape }) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  // console.log('rendering: Slice');
  const onReset = () => {
    dispatch(resetSlice(selectedSample));
  };
  return (
    <div className='detail'>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='dummy' />
      <div className='middle'>
        {landscape && <SawIcon addClass='slicing' />}
        <p>Click each cell to slice into halves or thirds</p>
        <Button onClick={onReset}>Reset All</Button>
      </div>
      {!landscape && <SawIcon addClass='slicing' />}
    </div>
  );
};

export const Copy = ({ onReturn, landscape }) => {
  return (
    <div className='detail'>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='dummy' />
      <div className='middle'>
        {landscape && <CopyIcon />}
        <p>Click to paste current sample's pattern</p>
      </div>
      {!landscape && <CopyIcon />}
      <PastePattern />
    </div>
  );
};
