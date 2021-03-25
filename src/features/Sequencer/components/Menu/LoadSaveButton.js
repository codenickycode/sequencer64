import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../components/Button';
import { OpenIcon, SaveIcon } from '../../../../icons';
import { setShow } from '../../../../reducers/appSlice';

export const LoadSaveButton = () => {
  const dispatch = useDispatch();

  const onClick = (type) => {
    if (type === 'load') dispatch(setShow('load'));
    if (type === 'save') dispatch(setShow('save'));
    document.getElementById('root').scrollTop = 0;
  };

  // console.log('rendering: LoadSaveButton');
  return (
    <div className='menu-items'>
      <span className='menu-dummy' />
      <Button
        id='load-sequence'
        classes='menu-btn'
        onClick={() => onClick('load')}
      >
        <OpenIcon />
        <label htmlFor='load-sequence' className='menu-label'>
          load
        </label>
      </Button>
      <Button
        id='save-sequence'
        classes='menu-btn'
        onClick={() => onClick('save')}
      >
        <SaveIcon />
        <label htmlFor='save-sequence' className='menu-label'>
          save
        </label>
      </Button>
      <span className='menu-dummy' />
    </div>
  );
};
