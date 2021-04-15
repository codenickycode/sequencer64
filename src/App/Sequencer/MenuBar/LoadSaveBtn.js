import React from 'react';
import { Button } from 'App/shared/Button';
import { OpenIcon, SaveIcon } from 'assets/icons';
import { PATHS, useGoTo } from 'utils/hooks/useGoTo';

export const LoadSaveBtn = () => {
  const goTo = useGoTo();

  const onClick = (path) => {
    goTo(path);
    document.getElementById('root').scrollTop = 0;
  };

  // console.log('rendering: LoadSaveButton');
  return (
    <>
      <Button
        id='load-sequence'
        classes='menuBtn'
        onClick={() => onClick(PATHS.LOAD)}
      >
        <OpenIcon />
        <label htmlFor='load-sequence'>load</label>
      </Button>
      <Button
        id='save-sequence'
        classes='menuBtn'
        onClick={() => onClick(PATHS.SAVE)}
      >
        <SaveIcon />
        <label htmlFor='save-sequence'>save</label>
      </Button>
    </>
  );
};
