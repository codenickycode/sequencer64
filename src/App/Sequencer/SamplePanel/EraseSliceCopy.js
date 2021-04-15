import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eraseSample, resetSlice } from 'App/reducers/sequenceSlice';
import { Button } from 'App/shared/Button';
import { ChevronLeftIcon, CopyIcon, EraserIcon, SawIcon } from 'assets/icons';
import { PastePattern } from 'App/Sequencer/MainSection/PastePattern/PastePattern';

export const Erase = ({ onReturn, landscape }) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally[selectedSample].empty
  );
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);

  useEffect(() => {
    if (disabled) onReturn();
  }, [onReturn, disabled]);

  const onEraseAll = () => {
    dispatch(eraseSample({ selectedSample }));
  };

  return (
    <div className={splitSamplePanel ? 'detail' : 'detail dark'}>
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
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);

  const onReset = () => {
    dispatch(resetSlice(selectedSample));
  };
  return (
    <div className={splitSamplePanel ? 'detail' : 'detail dark'}>
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
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);

  return (
    <div className={splitSamplePanel ? 'detail' : 'detail dark'}>
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
