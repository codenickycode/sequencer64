import React from 'react';
import { Button } from 'App/shared/Button';
import { OpenIcon, SaveIcon } from 'assets/icons';
import { useHistory, useLocation } from 'react-router';
import { BASE_PATH } from 'App/App';

export const LoadSaveBtn = () => {
  const history = useHistory();
  const pathname = useLocation().pathname;

  const onClick = (type) => {
    if (type === 'load') {
      if (pathname.match(/save/)) {
        history.push(pathname.split(/save/) + 'load');
      } else {
        history.push(BASE_PATH + '/load');
      }
    }
    if (type === 'save') {
      if (pathname.match(/load/)) {
        history.push(pathname.split(/load/) + 'save');
      } else {
        history.push(BASE_PATH + '/save');
      }
    }
    document.getElementById('root').scrollTop = 0;
  };

  // console.log('rendering: LoadSaveButton');
  return (
    <>
      <Button
        id='load-sequence'
        classes='menuBtn'
        onClick={() => onClick('load')}
      >
        <OpenIcon />
        <label htmlFor='load-sequence'>load</label>
      </Button>
      <Button
        id='save-sequence'
        classes='menuBtn'
        onClick={() => onClick('save')}
      >
        <SaveIcon />
        <label htmlFor='save-sequence'>save</label>
      </Button>
    </>
  );
};
