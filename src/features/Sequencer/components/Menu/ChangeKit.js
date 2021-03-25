import React, { useMemo } from 'react';
import { ChevronDownIcon } from '../../../../icons';
import * as kits from '../../defaults/defaultKits';
import { useDispatch, useSelector } from 'react-redux';
import { changeKit } from '../../reducers/sequenceSlice';

export const ChangeKit = () => {
  const dispatch = useDispatch();
  const kit = useSelector((state) => state.sequence.present.kit);
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);

  const changeKitMemo = useMemo(() => {
    // console.log('rendering: ChangeKit');

    const onChange = ({ target: { value } }) => {
      dispatch(changeKit(value));
    };

    return (
      <div className='menu-items change-kit'>
        <div className='change-kit-wrapper'>
          <label htmlFor='kit-select'>Select Kit: </label>
          <div
            className={
              buffersLoaded
                ? 'custom-select-wrapper'
                : 'custom-select-wrapper disabled'
            }
          >
            <select
              id='kit-select'
              className='custom-select'
              value={kit}
              onChange={onChange}
            >
              {Object.keys(kits).map((kitName, i) => {
                return (
                  <option key={`ck-${i}-${kitName}`} value={kitName}>
                    {kitName}
                  </option>
                );
              })}
            </select>
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    );
  }, [buffersLoaded, dispatch, kit]);
  return changeKitMemo;
};
