import { setPreparingDownload } from 'App/reducers/appSlice';
import { startSequence, stopSequence } from 'App/reducers/thunks/toneThunks';
import { recorder } from 'App/Tone';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useDownload = () => {
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
