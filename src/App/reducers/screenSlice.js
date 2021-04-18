import { createSlice } from '@reduxjs/toolkit';
import store from 'App/store';
import { getSS } from 'utils/storage';
import { startAnalyzer, stopAnalyzer } from './functions/animations';

export const ANALYZER_MODES = {
  BARS: 'bars',
  WAVE: 'wave',
  RIPPLE: 'ripple',
};

export const getDimensions = () => {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const landscape = vw > vh;
  let mainContainerHeight = landscape ? vh * 0.85 : vh * 0.9;
  if (mainContainerHeight < vh - 100) mainContainerHeight = vh - 100;
  let appRight = vw;
  if (vw > 1440) appRight = vw - (vw - 1440);
  return { vw, vh, appRight, landscape, mainContainerHeight };
};

const INITIAL_DIMENSIONS = getDimensions();
const INITIAL_SPLIT =
  INITIAL_DIMENSIONS.mainContainerHeight > 500 && INITIAL_DIMENSIONS.landscape;

const INITIAL_ANALYZER = {
  on: getSS('analyzerOn') ?? INITIAL_SPLIT,
  mode: getSS('analyzerMode') || ANALYZER_MODES.BARS,
};

const INITIAL_STATE = {
  dimensions: INITIAL_DIMENSIONS,
  splitSamplePanel: INITIAL_SPLIT,
  analyzer: INITIAL_ANALYZER,
};

export const screenSlice = createSlice({
  name: 'screen',
  initialState: INITIAL_STATE,
  reducers: {
    setDimensions: (state) => {
      state.dimensions = getDimensions();
      state.splitSamplePanel =
        state.dimensions.mainContainerHeight > 500 && state.dimensions.landscape;
    },
    setAnalyzerOnFinally: (state, { payload }) => {
      state.analyzer.on = payload;
    },
    setAnalyzerOn: (state, { payload }) => {
      state.analyzer.on = payload;
      if (state.analyzer.on) startAnalyzer();
      else stopAnalyzer();
    },
    setAnalyzerMode: (state, { payload }) => {
      state.analyzer.mode = payload;
      state.analyzer.on = true;
    },
  },
});

export const { setDimensions, setAnalyzerMode, setAnalyzerOn } = screenSlice.actions;

export default screenSlice.reducer;

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', afterRotate);
window.addEventListener('blur', () => {
  window.addEventListener('focus', redraw);
});

let resizeTimer;
let prevWidth = null;
const root = document.getElementById('root');
const preparingPortal = document.getElementById('preparingPortal');

function handleResize() {
  if (document.documentElement.clientWidth === prevWidth) return; // touch scroll bug hack
  clearTimeout(resizeTimer);
  root.style.display = 'none';
  preparingPortal.style.display = 'initial';
  resizeTimer = setTimeout(redraw, 350);
}
handleResize();

function afterRotate() {
  redraw();
  window.location.reload();
}

function redraw() {
  setTimeout(function () {
    preparingPortal.style.display = 'none';
    root.style.display = 'initial';
    document.body.style.display = 'none';
    document.body.style.display = 'initial';
    store.dispatch(setDimensions());
    prevWidth = document.documentElement.clientWidth;
  }, 350);
  window.removeEventListener('focus', redraw);
}
