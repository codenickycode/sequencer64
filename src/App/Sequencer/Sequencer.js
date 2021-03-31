import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'App/Sequencer/MainSection/Grid/Grid';
import { PastePattern } from 'App/Sequencer/MainSection/PastePattern';
import { LoadKit, LoadKitInfo } from 'App/Sequencer/MainSection/LoadKit';
import { SamplePanel } from 'App/Sequencer/SamplePanel/SamplePanel';
import { LoadSaveSequence } from 'App/Sequencer/LoadSave/LoadSaveSequence';
import { Menu } from 'App/Sequencer/MenuBar/MenuBar';
import { Preparing } from 'App/shared/Preparing';
import { loadInitialSequence } from 'App/reducers/sequenceSlice';

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
          <PastePattern />
          <LoadKit />
        </div>
        <div id='sample-panel'>
          <SamplePanel />
          <div id='kit-info-portal' />
        </div>
        <Menu />
      </div>
      <LoadSaveSequence />
    </>
  );
};
