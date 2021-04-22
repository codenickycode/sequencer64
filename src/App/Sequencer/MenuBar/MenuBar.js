import React, { useMemo } from 'react';
import { TransportPanel } from './MenuItems/Transport/TransportPanel';
import { UndoRedoMenu } from './MenuItems/UndoRedoMenu';
import { EraseBtn } from './MenuItems/EraseBtn';
import { FileMenu } from './MenuItems/FileMenu';
import { KitBtn } from './MenuItems/OpenPathBtn';
import { MixerMenu } from './MenuItems/MixerMenu';
import { TapMenu } from './MenuItems/TapMenu';
import { DisplayMenu } from './MenuItems/DisplayMenu/DisplayMenu';
import { useSelector } from 'react-redux';
import { Scrollable } from 'App/shared/Scrollable/Scrollable';
import { Info } from './MenuItems/Info';

export const MenuBar = () => {
  const vh = useSelector((state) => state.screen.dimensions.vh);
  const landscape = useSelector((state) => state.screen.dimensions.landscape);

  const memo = useMemo(() => {
    let height = landscape ? vh * 0.15 : vh * 0.1;
    if (height > 100) height = 100;
    return (
      <Scrollable id='menuBar' style={{ height }}>
        <div className='menuItems'>
          <Info />
          <DisplayMenu />
          <FileMenu />
          <KitBtn />
        </div>
        <TransportPanel />
        <div className='menuItems'>
          <MixerMenu />
          <TapMenu />
          <UndoRedoMenu />
          <EraseBtn />
        </div>
      </Scrollable>
    );
  }, [landscape, vh]);
  return memo;
};
