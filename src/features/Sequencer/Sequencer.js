import React from 'react';
import { Grid } from './components/main/Grid';
import { PastePattern } from './components/main/PastePattern';
import { LoadKit, LoadKitInfo } from './components/main/LoadKit';
import { SamplePanel } from './components/sample-panel/SamplePanel';
import { LoadSaveSequence } from './components/load/LoadSaveSequence';
import { Menu } from './components/Menu';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Preparing } from './Preparing';
import { loadInitialSequence } from './reducers/sequenceSlice';

export const SequencerPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { shared } = useParams();
  const initialLoad = useSelector(
    (state) => state.sequence.present.initialLoad
  );

  if (initialLoad) {
    const clearUrl = () => history.replace('/');
    // const clearUrl = () => {};
    dispatch(loadInitialSequence(shared, clearUrl));
  }

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
          <LoadKitInfo />
        </div>
        <Menu />
      </div>
      <LoadSaveSequence />
    </>
  );
};
