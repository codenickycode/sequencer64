import cuid from 'cuid';
import React from 'react';
import { useSelector } from 'react-redux';
import { DefaultSequence } from './DefaultSequence';
import { UserSequence } from './UserSequence';
import { useSelectSequence } from './useSelectSequence';

export const Load = () => {
  const props = useSelectSequence(); // user/default sharing instance

  return (
    <div className='load-sequence'>
      <div className='sequence-select'>
        <UserSection {...props} />
        <DefaultSection {...props} />
      </div>
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
              <UserSequence key={cuid.slug()} sequence={sequence} {...props} />
            ))
            .reverse()}
        </>
      )}
    </div>
  );
};

const DefaultSection = (props) => {
  const defaultSequences = useSelector((state) => state.app.defaultSequences);
  return (
    <div className='sequence-select-group'>
      <p className='sequence-select-sub'>Default Sequences</p>
      <ColumnTitles />
      {defaultSequences.map((sequence) => (
        <DefaultSequence key={cuid.slug()} sequence={sequence} {...props} />
      ))}
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
