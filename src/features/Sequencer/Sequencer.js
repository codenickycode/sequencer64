import React from 'react';
import { Grid } from './components/main/Grid';
import { PastePattern } from './components/main/PastePattern';
import { LoadKit, LoadKitInfo } from './components/main/LoadKit';
import { SamplePanel } from './components/sample-panel/SamplePanel';
import { LoadSaveSequence } from './components/load/LoadSaveSequence';
import { Menu } from './components/Menu';
import { PatternRefProvider } from './providers/PatternRef';

export const SequencerPage = () => {
  // console.log('rendering: SequencerPage');
  return (
    <PatternRefProvider>
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
    </PatternRefProvider>
  );
};
