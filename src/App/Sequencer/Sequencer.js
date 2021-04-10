import React, { useEffect, useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'App/Sequencer/MainSection/Grid/Grid';
import { SamplePanel } from 'App/Sequencer/SamplePanel/SamplePanel';
import { Menu } from 'App/Sequencer/MenuBar/MenuBar';
import { loadInitialSequence } from 'App/reducers/sequenceSlice';
import { SpAlert } from 'App/Sequencer/SamplePanel/SpAlert';
// import { MobileConsole } from 'App/MobileConsole';
import { PATHS } from 'utils/useGoTo';

export const SequencerPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { shared } = useParams();
  const pathname = useLocation().pathname;
  const initialLoad = useSelector(
    (state) => state.sequence.present.initialLoad
  );
  useEffect(() => {
    if (initialLoad) {
      const path = pathname === PATHS.LOAD ? PATHS.LOAD : PATHS.BASE;
      const clearUrl = () => history.replace(path);
      dispatch(loadInitialSequence(shared, clearUrl));
    }
  }, [dispatch, history, initialLoad, pathname, shared]);

  useEffect(() => {
    if (!initialLoad)
      document.getElementById('preparingPortal').style.display = 'none';
  });

  // const initialLoad = true;
  const memo = useMemo(() => {
    return initialLoad ? null : (
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
    );
  }, [initialLoad]);
  return memo;
};
