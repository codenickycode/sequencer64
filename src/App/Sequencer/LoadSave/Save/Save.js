import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShareJSX } from './ShareJSX';
import { SaveJSX } from './SaveJSX';
import { useShareLink } from './useShareLink';
import { useSaveSequence } from './useSaveSequence';
import { Button } from 'App/shared/Button';
import { Preparing } from 'App/shared/Preparing/Preparing';
import { setPreparingDownload } from 'App/reducers/appSlice';
import { recorder } from 'App/Tone';
import { startSequence, stopSequence } from 'App/reducers/thunks/toneThunks';

export const Save = () => {
  const app = useSelector((state) => state.app);
  const userSequences = useSelector((state) => state.assets.userSequences);
  const fileLimit = 20 - userSequences.length;
  const idRef = useRef(null);
  const { newName, handleNewName, userError, save } = useSaveSequence(idRef);
  const { link, copyLink } = useShareLink(idRef);
  const {
    download,
    preparingDownload,
    cancelDownload,
    cycleCount,
    changeCycleCount,
    supported,
    duration,
    timeLeft,
  } = useDownload();
  return (
    <div id='saveSequence' className='saveSequence'>
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
      <div className='download'>
        <h1 className='header'>Download:</h1>
        <div className='downloadMain'>
          {!supported ? (
            <p className='notSupported'>Not supported by your browser</p>
          ) : (
            <>
              {/* <p className='sub'>Bounce a live recording to mp3</p> */}
              <div className='countAndDuration'>
                <div className='cycleCount'>
                  <label htmlFor='cycleCount'>Cycle Count:</label>
                  <Button id='cycleCount' onClick={changeCycleCount}>
                    {cycleCount}
                  </Button>
                </div>
                <p className='duration'>
                  Duration: <span>{formatTime(duration)}</span>
                </p>
              </div>
              <Button classes='downloadBtn' onClick={download}>
                download
              </Button>
            </>
          )}
        </div>
        {preparingDownload && (
          <Preparing
            addClass='preparingDownload'
            message={`Please wait while your mp3 is prepared.\n Do not close this window until complete.\n\nTime left: ${formatTime(
              timeLeft
            )}`}
            targetId='preparingPortalTop'
            cancel={cancelDownload}
          />
        )}
      </div>
    </div>
  );
};

const useDownload = () => {
  const dispatch = useDispatch();
  const preparingDownload = useSelector((state) => state.app.preparingDownload);
  const bpm = useSelector((state) => state.sequence.present.bpm);

  const [duration, setDuration] = useState(0);

  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    let timer;
    if (timeLeft) timer = setTimeout(() => setTimeLeft(timeLeft - 1000), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const [cycleCount, setCycleCount] = useState(1);

  useEffect(() => {
    const beatDuration = 60000 / bpm;
    const cycleDuration = beatDuration * 16;
    let recordingDuration = cycleDuration * cycleCount;
    const tail = 3000;
    recordingDuration += tail;
    setDuration(recordingDuration);
  }, [bpm, cycleCount]);

  const changeCycleCount = () => {
    if (cycleCount === 1) setCycleCount(4);
    if (cycleCount === 4) setCycleCount(8);
    if (cycleCount === 8) setCycleCount(16);
    if (cycleCount === 16) setCycleCount(1);
  };

  const cancelRef = useRef();

  const download = async () => {
    dispatch(setPreparingDownload(true));
    try {
      recorder.start();
      dispatch(stopSequence());
      dispatch(startSequence(cycleCount));
      setTimeLeft(duration);
      await downloadMp3(duration, cancelRef);
    } catch (e) {
      console.log('user cancelled recording');
    } finally {
      dispatch(stopSequence());
      dispatch(setPreparingDownload(false));
    }
  };

  const cancelDownload = () => {
    if (cancelRef.current) cancelRef.current();
    recorder.stop();
    dispatch(stopSequence());
    setTimeLeft(0);
    dispatch(setPreparingDownload(false));
  };

  const supported = navigator.mediaDevices;
  return {
    download,
    preparingDownload,
    cancelDownload,
    supported,
    cycleCount,
    changeCycleCount,
    duration,
    timeLeft,
  };
};

const downloadMp3 = (duration, cancelRef) =>
  new Promise((resolve, reject) => {
    cancelRef.current = reject;
    setTimeout(async () => {
      try {
        const recording = await recorder.stop();
        const url = URL.createObjectURL(recording);
        const anchor = document.createElement('a');
        anchor.download = 'sequencer64.webm';
        anchor.href = url;
        anchor.click();
        resolve();
      } catch (e) {
        reject(e);
      }
    }, duration);
  });

const formatTime = (time) => {
  const timeInSecs = time / 1000;
  const minutes = parseInt(timeInSecs / 60).toString();
  const seconds = parseInt(timeInSecs % 60).toString();
  const formattedDuration = `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  return formattedDuration;
};
