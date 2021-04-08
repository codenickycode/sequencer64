import cuid from 'cuid';
import React from 'react';
import { useSelector } from 'react-redux';
import { DefaultSequence } from './DefaultSequence';
import { UserSequence } from './UserSequence';
import { useSelectSequence } from './useSelectSequence';

export const Load = () => {
  const props = useSelectSequence(); // user/default sharing instance

  return (
    <div className='loadSequence'>
      <UserSequences {...props} />
      <DefaultSequences {...props} />
    </div>
  );
};

const UserSequences = (props) => {
  const userSequences = useSelector((state) => state.assets.userSequences);
  return (
    <div className='userSequences'>
      <p className='title'>User Sequences</p>
      {!userSequences || userSequences.length === 0 ? (
        <p className='sub'>No user sequences</p>
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

const DefaultSequences = (props) => {
  const defaultSequences = useSelector(
    (state) => state.assets.defaultSequences
  );
  return (
    <div className='defaultSequences'>
      <p className='title'>Default Sequences</p>
      <ColumnTitles />
      {defaultSequences.map((sequence) => (
        <DefaultSequence key={cuid.slug()} sequence={sequence} {...props} />
      ))}
    </div>
  );
};

const ColumnTitles = () => {
  return (
    <div className='columnTitles'>
      <p>Name</p>
      <p className='p-left-25'>Kit</p>
      <p>Bpm</p>
      <p></p>
    </div>
  );
};
