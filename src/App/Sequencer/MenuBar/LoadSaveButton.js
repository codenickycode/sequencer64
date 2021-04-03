import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { OpenIcon, SaveIcon } from 'assets/icons';
import { setShow } from 'App/reducers/appSlice';

export const LoadSaveButton = () => {
  const dispatch = useDispatch();

  const onClick = (type) => {
    if (type === 'load') dispatch(setShow('load'));
    if (type === 'save') dispatch(setShow('save'));
    document.getElementById('root').scrollTop = 0;
  };

  // console.log('rendering: LoadSaveButton');
  return (
    <div className='menuItems'>
      <span className='dummy' />
      <Button
        id='load-sequence'
        classes='menuBtn'
        onClick={() => onClick('load')}
      >
        <OpenIcon />
        <label htmlFor='load-sequence'>load</label>
      </Button>
      <Button
        id='save-sequence'
        classes='menuBtn'
        onClick={() => onClick('save')}
      >
        <SaveIcon />
        <label htmlFor='save-sequence'>save</label>
      </Button>
      <span className='dummy' />
    </div>
  );
};
