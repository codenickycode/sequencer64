import { setStatus } from 'App/reducers/appSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ORIGIN } from 'utils/network';

export const useShareLink = (idRef) => {
  const dispatch = useDispatch();
  const confirmation = useSelector((state) => state.app.confirmation);
  const [link, setLink] = useState('');

  useEffect(() => {
    if (confirmation.match(/cloud/)) {
      setLink(`${ORIGIN}/sequencer/${idRef.current}`);
    }
  }, [confirmation, idRef]);

  const copyLink = () => {
    try {
      const copyText = document.getElementById('sequence-link');
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand('copy');
      dispatch(setStatus('Link copied to clipboard'));
    } catch (e) {
      console.error('copyLink error -> ', e);
    }
  };

  return { link, copyLink };
};
