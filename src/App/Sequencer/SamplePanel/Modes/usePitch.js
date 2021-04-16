import { setModVal } from 'App/reducers/editorSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePVL } from './usePVL';

export const usePitch = () => {
  const dispatch = useDispatch();
  const state = usePVL();
  const { value, setValue, editAll, dispatchModAll } = state;

  useEffect(() => {
    dispatch(setModVal(value));
    if (editAll) dispatchModAll();
  }, [dispatch, dispatchModAll, editAll, value]);

  const onChange = ({ target: { value } }) => setValue(value);

  return { onChange, ...state };
};
