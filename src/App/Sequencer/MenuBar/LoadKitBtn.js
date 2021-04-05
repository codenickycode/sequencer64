import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'App/shared/Button';
import { KitIcon } from 'assets/icons';
import { setShow, VIEWS } from '../../reducers/appSlice';

export const LoadKitBtn = () => {
  const dispatch = useDispatch();
  const changeKitMemo = useMemo(() => {
    // console.log('rendering: LoadKitBtn');

    const onClick = () => {
      dispatch(setShow(VIEWS.LOAD_KIT));
    };

    return (
      <Button id='loadKitBtn' classes='menuBtn' onClick={onClick}>
        <KitIcon />
        <label htmlFor='loadKitBtn'>kit</label>
      </Button>
    );
  }, [dispatch]);
  return changeKitMemo;
};
