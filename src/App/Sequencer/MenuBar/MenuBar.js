import React, { useMemo } from 'react';
import { TransportPanel } from './MenuItems/Transport/TransportPanel';
import { UndoRedoBtn } from './MenuItems/UndoRedoBtn';
import { EraseBtn } from './MenuItems/EraseBtn';
import { LoadSaveBtn } from './MenuItems/LoadSaveBtn';
import { KitBtn } from './MenuItems/KitBtn';
import { TapMenu } from './MenuItems/TapMenu';
import { DisplayMenu } from './MenuItems/DisplayMenu/DisplayMenu';
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
