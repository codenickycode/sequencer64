import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eraseSample, resetSlice } from 'App/reducers/sequenceSlice';
import { Button } from 'App/shared/Button';
import { ChevronLeftIcon, CopyIcon, EraserIcon, SawIcon } from 'assets/icons';
import { PastePattern } from 'App/Sequencer/MainSection/PastePattern/PastePattern';

const ModeDetail = ({
  onReturn,
  Icon,
  addIconClass = '',
  instruction,
  btnClick,
  btnLabel,
  children,
}) => {
  const landscape = useSelector((state) => state.screen.landscape);
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);

  return (
    <div className={splitSamplePanel ? 'detail' : 'detail dark'}>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='dummy' />
      <div className='middle'>
        {landscape && <Icon addClass={addIconClass} />}
        <p>{instruction}</p>
        {btnClick && <Button onClick={btnClick}>{btnLabel}</Button>}
      </div>
      {!landscape && <Icon addClass={addIconClass} />}
      {children}
    </div>
  );
};

export const Erase = ({ onReturn }) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally[selectedSample].empty
  );

  useEffect(() => {
    if (disabled) onReturn();
  }, [onReturn, disabled]);

  const onEraseAll = () => {
    dispatch(eraseSample({ selectedSample }));
  };
  const instruction = ' Click and drag to erase notes';
  return (
    <ModeDetail
      onReturn={onReturn}
      Icon={EraserIcon}
      instruction={instruction}
      btnClick={onEraseAll}
      btnLabel='Erase All'
    />
  );
};

export const Slice = ({ onReturn }) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const onReset = () => {
    dispatch(resetSlice(selectedSample));
  };
  const instruction = 'Click active notes to slice into halves or thirds';
  return (
    <ModeDetail
      onReturn={onReturn}
      Icon={SawIcon}
      addIconClass='slicing'
      instruction={instruction}
      btnClick={onReset}
      btnLabel='Reset All'
    />
  );
};

export const Copy = ({ onReturn }) => {
  const instruction = "Click to paste current instrument's pattern";
  return (
    <ModeDetail onReturn={onReturn} Icon={CopyIcon} instruction={instruction}>
      <PastePattern />
    </ModeDetail>
  );
};
