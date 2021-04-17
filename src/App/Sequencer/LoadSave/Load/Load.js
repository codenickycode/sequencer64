import cuid from 'cuid';
import React from 'react';
import { useSelector } from 'react-redux';
import { DefaultSequence } from './DefaultSequence';
import { UserSequence } from './UserSequence';
import { useSelectSequence } from './useSelectSequence';

export const Load = () => {
  const props = useSelectSequence();

  return (
    <div id='loadSequence' className='loadSequence'>
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
          <UserColumnTitles />
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
  const defaultSequences = useSelector((state) => state.assets.defaultSequences);
  return (
    <div className='defaultSequences'>
      <p className='title'>Default Sequences</p>
      <DefaultColumnTitles />
      {defaultSequences.map((sequence) => (
        <DefaultSequence key={cuid.slug()} sequence={sequence} {...props} />
      ))}
    </div>
  );
};

const DefaultColumnTitles = () => {
  return (
    <div className='defaultColumnTitles'>
      <p>Name</p>
      <p>Kit</p>
      <p className='bpm'>Bpm</p>
      <p></p>
    </div>
  );
};

const UserColumnTitles = () => {
  return (
    <div className='userColumnTitles'>
      <p>Name</p>
      <p>Date</p>
      <p className='sync'>Sync</p>
      <p className='delete'>Delete</p>
    </div>
  );
};
