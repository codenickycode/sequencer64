import { useSelector } from 'react-redux';

export const useToneState = () => {
  const countIn = useSelector((state) => state.tone.countIn);
  const loadingSamples = useSelector((state) => state.tone.loadingSamples);

  const state = {};
  state.countingIn = countIn !== '';
  state.transportDisabled = loadingSamples || state.countingIn;

  return state;
};
