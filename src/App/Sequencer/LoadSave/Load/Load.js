import cuid from 'cuid';
import React from 'react';
import { useSelector } from 'react-redux';
import { defaultSequences } from 'utils/defaultSequences';
import { DefaultSequence } from './DefaultSequence';
import { UserSequence } from './UserSequence';
import { useSelectSequence } from './useSelectSequence';

export const Load = () => {
  const props = useSelectSequence();

  return (
    <div className='load-sequence'>
      <div className='sequence-select'>
        <UserSection {...props} />
        <DefaultSection {...props} />
      </div>
    </div>
  );
};

const DefaultSection = (props) => {
  return (
    <div className='sequence-select-group'>
      <p className='sequence-select-sub'>Default Sequences</p>
      <ColumnTitles />
      {defaultSequences.map((sequence) => (
        <DefaultSequence key={cuid()} sequence={sequence} {...props} />
      ))}
    </div>
  );
};

const UserSection = (props) => {
  const userSequences = useSelector((state) => state.app.userSequences);
  return (
    <div className='sequence-select-group'>
      <p className='sequence-select-sub'>User Sequences</p>
      {!userSequences || userSequences.length === 0 ? (
        <p>No user sequences</p>
      ) : (
        <>
          <ColumnTitles />
          {userSequences
            ?.map((sequence) => (
              <UserSequence key={cuid()} sequence={sequence} {...props} />
            ))
            .reverse()}
        </>
      )}
    </div>
  );
};

const ColumnTitles = () => {
  return (
    <div className='load-sequence-sub'>
      <p>Name</p>
      <p className='p-left-25'>Kit</p>
      <p>Bpm</p>
      <p></p>
    </div>
  );
};
