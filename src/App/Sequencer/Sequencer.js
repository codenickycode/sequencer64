import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'App/Sequencer/MainSection/Grid/Grid';
import { SamplePanel } from 'App/Sequencer/SamplePanel/SamplePanel';
import { Menu } from 'App/Sequencer/MenuBar/MenuBar';
import { Preparing } from 'App/shared/Preparing';
import { loadInitialSequence } from 'App/reducers/sequenceSlice';
import { SpAlert } from 'App/Sequencer/SamplePanel/SpAlert';
// import { MobileConsole } from 'App/MobileConsole';

export const SequencerPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { shared } = useParams();
  const initialLoad = useSelector(
    (state) => state.sequence.present.initialLoad
  );
  useEffect(() => {
    if (initialLoad) {
      const clearUrl = () => history.replace('/');
      dispatch(loadInitialSequence(shared, clearUrl));
    }
  }, [dispatch, history, initialLoad, shared]);

  // const initialLoad = true;
  return initialLoad ? (
    <Preparing />
  ) : (
    <>
      <div id='sequencer'>
        <div className='mainContainer'>
          <div id='main'>
            <Grid />
            <div id='changeKitPortal' />
            <div id='pastePatternPortal' />
            {/* <MobileConsole /> */}
          </div>
          <div id='samplePanel'>
            <SpAlert />
            <SamplePanel />
          </div>
        </div>
        <Menu />
      </div>
      <div id='fullScreenPortal' />
    </>
  );
};
