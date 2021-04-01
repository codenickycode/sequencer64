import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'App/Sequencer/MainSection/Grid/Grid';
import { LoadKit } from 'App/Sequencer/MainSection/LoadKit';
import { SamplePanel } from 'App/Sequencer/SamplePanel/SamplePanel';
import { LoadSaveSequence } from 'App/Sequencer/LoadSave/LoadSaveSequence';
import { Menu } from 'App/Sequencer/MenuBar/MenuBar';
import { Preparing } from 'App/shared/Preparing';
import { loadInitialSequence } from 'App/reducers/sequenceSlice';
import { SpAlert } from 'App/Sequencer/SamplePanel/SpAlert';

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

  return initialLoad ? (
    <Preparing />
  ) : (
    <>
      <div id='sequencer'>
        <div id='main'>
          <Grid />
          <LoadKit />
          <div id='paste-pattern-portal' />
        </div>
        <div id='sample-panel'>
          <SpAlert />
          <SamplePanel />
          <div id='kit-info-portal' />
        </div>
        <Menu />
      </div>
      <LoadSaveSequence />
    </>
  );
};