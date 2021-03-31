import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon } from 'assets/icons';
import { setShow, VIEWS } from '../../reducers/appSlice';

export const ChangeKit = () => {
  const dispatch = useDispatch();
  const changeKitMemo = useMemo(() => {
    // console.log('rendering: ChangeKit');

    const onClick = () => {
      dispatch(setShow(VIEWS.LOAD_KIT));
    };

    return (
      <div className='menu-items'>
        <Button id='load-kit-btn' classes='menu-btn' onClick={onClick}>
          <KitIcon />
          <label htmlFor='load-kit-btn' className='menu-label'>
            load kit
          </label>
        </Button>
      </div>
    );
  }, [dispatch]);
  return changeKitMemo;
};
