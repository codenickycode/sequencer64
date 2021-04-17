import React from 'react';
import { SaveIcon } from 'assets/icons';
import { useGoTo } from 'hooks/useGoTo';
import { MenuItem, PopupMenu } from 'App/shared/PopupMenu/PopupMenu';

export const FileBtn = () => {
  const goTo = useGoTo();
  return (
    <PopupMenu name='File' Icon={SaveIcon}>
      <MenuItem item='load' onClick={goTo.load} />
      <MenuItem item='save/share' onClick={goTo.save} />
    </PopupMenu>
  );
};
