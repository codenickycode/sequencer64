import React, { useMemo } from 'react';
import { TransportPanel } from 'App/Sequencer/MenuBar/TransportPanel';
import { UndoRedoBtn } from 'App/Sequencer/MenuBar/UndoRedoBtn';
import { EraseBtn } from 'App/Sequencer/MenuBar/EraseBtn';
import { LoadSaveBtn } from 'App/Sequencer/MenuBar/LoadSaveBtn';
import { KitBtn } from 'App/Sequencer/MenuBar/KitBtn';
import { TapMenu } from 'App/Sequencer/MenuBar/TapMenu';
import { DisplayMenu } from './DisplayMenu';
import { useSelector } from 'react-redux';
import { Scrollable } from 'App/shared/Scrollable/Scrollable';

export const MenuBar = () => {
  const vh = useSelector((state) => state.screen.dimensions.vh);
  const landscape = useSelector((state) => state.screen.dimensions.landscape);

  const memo = useMemo(() => {
    let height = landscape ? vh * 0.15 : vh * 0.1;
    if (height > 100) height = 100;
    return (
      <Scrollable id='menuBar' style={{ height }}>
        <div className='menuItems'>
          <LoadSaveBtn />
          <KitBtn />
          <TapMenu />
        </div>
        <TransportPanel />
        <div className='menuItems'>
          <UndoRedoBtn />
          <EraseBtn />
          <div className='dummy'>|</div>
          <DisplayMenu />
        </div>
      </Scrollable>
    );
  }, [landscape, vh]);
  return memo;
};
