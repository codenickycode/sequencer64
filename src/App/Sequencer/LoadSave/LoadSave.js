import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Load } from 'App/Sequencer/LoadSave/Load/Load';
import { Save } from 'App/Sequencer/LoadSave/Save/Save';
import { Button } from 'App/shared/Button';
import { LoginSection } from './LoginSection';
import { PATHS, useGoTo } from 'utils/useGoTo';

export const LoadSave = ({ tab }) => {
  const goTo = useGoTo();

  const memo = useMemo(() => {
    const onClose = () => goTo(PATHS.BASE);
    const onClick = (e) => {
      if (e.target.id && e.target.id === 'loadSave') onClose();
    };

    const portal = document.getElementById('fullScreenPortal');
    return portal
      ? ReactDOM.createPortal(
          <>
            <div id='loadSave' className='loadSave' onClick={onClick}>
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
  }, [goTo, tab]);
  return memo;
};

const Tabs = ({ tab }) => {
  const goTo = useGoTo();
  const changeTab = ({ target: { value } }) => {
    if (value === 'load') goTo(PATHS.LOAD);
    if (value === 'save') goTo(PATHS.SAVE);
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
