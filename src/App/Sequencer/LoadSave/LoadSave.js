import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Load } from 'App/Sequencer/LoadSave/Load/Load';
import { Save } from 'App/Sequencer/LoadSave/Save/Save';
import { Button } from 'App/shared/Button';
import { LoginSection } from './LoginSection';
import { useHistory } from 'react-router';
import { BASE_PATH } from 'App/App';

export const LoadSave = ({ tab }) => {
  const history = useHistory();

  const memo = useMemo(() => {
    const onClose = () => history.push(BASE_PATH);
    const onClick = (e) => {
      if (e.target.id && e.target.id === 'loadSave') onClose();
    };

    const portal = document.getElementById('fullScreenPortal');
    return portal
      ? ReactDOM.createPortal(
          <>
            <div id='loadSave' className={'loadSave'} onClick={onClick}>
              <div className='top'>
                <Tabs tab={tab} />
                <LoginSection />
              </div>
              {tab === 'save' && <Save />}
              {tab === 'load' && <Load />}
            </div>
            <div className={'bottomBtn'}>
              <Button onClick={onClose}>Close</Button>
            </div>
          </>,
          portal
        )
      : null;
  }, [history, tab]);
  return memo;
};

const Tabs = ({ tab }) => {
  const history = useHistory();
  const changeTab = ({ target: { value } }) => {
    history.push(BASE_PATH + '/' + value);
  };
  let loadClasses = 'tab';
  let saveClasses = loadClasses;
  if (tab === 'load') loadClasses += ' selected';
  if (tab === 'save') saveClasses += ' selected';
  return (
    <div className='tabs'>
      <input
        type='button'
        id='load-tab'
        className={loadClasses}
        value='load'
        aria-label='load'
        onClick={changeTab}
      ></input>
      <input
        type='button'
        id='save-tab'
        className={saveClasses}
        value='save'
        aria-label='save'
        onClick={changeTab}
      ></input>
    </div>
  );
};
