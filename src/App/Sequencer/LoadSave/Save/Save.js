import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { ShareJSX } from './ShareJSX';
import { SaveJSX } from './SaveJSX';
import { useShareLink } from './useShareLink';
import { useSaveSequence } from './useSaveSequence';
import { DownloadJSX } from './DownloadJSX';
import { useDownload } from './useDownload';

export const Save = () => {
  const app = useSelector((state) => state.app);
  const fileLimit = useSelector((state) => 20 - state.assets.userSequences.length);
  const idRef = useRef(null);
  const saveSequence = useSaveSequence(idRef);
  const shareLink = useShareLink(idRef);
  const download = useDownload();
  return (
    <div id='saveSequence' className='saveSequence'>
      <SaveJSX
        fileLimit={fileLimit}
        confirmation={app.confirmation}
        online={app.online}
        loggedIn={app.user.loggedIn}
        fetching={app.fetching}
        {...saveSequence}
      />
      <ShareJSX {...shareLink} online={app.online} loggedIn={app.user.loggedIn} />
      <DownloadJSX {...download} />
    </div>
  );
};
