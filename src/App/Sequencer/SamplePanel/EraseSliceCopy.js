import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eraseSample, resetSlice } from 'App/reducers/sequenceSlice';
import { Button } from 'App/shared/Button';
import { ChevronLeftIcon, CopyIcon, EraserIcon, SawIcon } from 'assets/icons';
import { PastePattern } from 'App/Sequencer/MainSection/PastePattern';

export const Erase = ({ onReturn }) => {
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
    <div className='sample-edit-detail'>
      <Button classes='sample-edit-close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='sample-edit-dummy' />
      <div className='sample-edit-middle'>
        <p className=''>Click and drag to erase cells</p>
        <Button
          classes='sample-edit-btn mod-all'
          disabled={disabled}
          onClick={onEraseAll}
        >
          Erase All
        </Button>
      </div>
      <EraserIcon />
    </div>
  );
};

export const Slice = ({ onReturn }) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  // console.log('rendering: Slice');
  const onReset = () => {
    dispatch(resetSlice(selectedSample));
  };
  return (
    <div className='sample-edit-detail'>
      <Button classes='sample-edit-close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='sample-edit-dummy' />
      <div className='sample-edit-middle'>
        <p>Click each cell to slice into halves or thirds</p>
        <Button classes='sample-edit-btn mod-all' onClick={onReset}>
          Reset All
        </Button>
      </div>
      <SawIcon addClass='slicing' />
    </div>
  );
};

export const Copy = ({ onReturn }) => {
  return (
    <div className={'sample-edit-detail'}>
      <Button classes='sample-edit-close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='sample-edit-dummy' />
      <p className='sample-edit-instructions'>
        Click to paste current sample's pattern
      </p>
      <CopyIcon />
      <PastePattern />
    </div>
  );
};
