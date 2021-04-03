import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { ShareJSX } from './ShareJSX';
import { SaveJSX } from './SaveJSX';
import { useShareLink } from './useShareLink';
import { useSaveSequence } from './useSaveSequence';

export const Save = () => {
  const app = useSelector((state) => state.app);
  const fileLimit = 20 - app.userSequences.length;
  const idRef = useRef(null);
  const { newName, handleNewName, userError, save } = useSaveSequence(idRef);
  const { link, copyLink } = useShareLink(idRef);
  // console.log('rendering: SaveSequence');
  return (
    <div className='saveSequence'>
      <ShareJSX
        link={link}
        copyLink={copyLink}
        online={app.online}
        loggedIn={app.user.loggedIn}
      />
      <SaveJSX
        userError={userError}
        fileLimit={fileLimit}
        confirmation={app.confirmation}
        online={app.online}
        loggedIn={app.user.loggedIn}
        save={save}
        newName={newName}
        handleNewName={handleNewName}
        fetching={app.fetching}
      />
    </div>
  );
};
