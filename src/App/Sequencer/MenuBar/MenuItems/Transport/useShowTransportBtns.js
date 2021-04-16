import { areWeTapRecording } from 'App/reducers/useAbstractState/useEditorState';
import { useSelector } from 'react-redux';

export const useShowTransportBtns = () => {
  const transportStarted = useSelector((state) => state.tone.transportState === 'started');
  const tapRecording = useSelector((state) => areWeTapRecording(state.editor.mode));

  const show = {};
  show.recordBtn = tapRecording && !transportStarted;
  show.restartBtn = tapRecording && transportStarted;
  show.startBtn = !tapRecording && !transportStarted;
  show.pauseBtn = !tapRecording && transportStarted;

  return show;
};
