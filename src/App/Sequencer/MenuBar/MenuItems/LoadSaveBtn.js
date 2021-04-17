import React, { useMemo } from 'react';
import { Button } from 'App/shared/Button';
import { OpenIcon, SaveIcon } from 'assets/icons';
import { useGoTo } from 'hooks/useGoTo';

export const LoadSaveBtn = () => {
  const goTo = useGoTo();

  const memo = useMemo(() => {
    return (
      <>
        <Button id='load-sequence' classes='menuBtn' onClick={goTo.load}>
          <OpenIcon />
          <label htmlFor='load-sequence'>load</label>
        </Button>
        <Button id='save-sequence' classes='menuBtn' onClick={goTo.save}>
          <SaveIcon />
          <label htmlFor='save-sequence'>save</label>
        </Button>
      </>
    );
  }, [goTo]);
  return memo;
};
