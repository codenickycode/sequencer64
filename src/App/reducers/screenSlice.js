import { createSlice } from '@reduxjs/toolkit';
import store from 'App/store';

export const getDimensions = () => {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const landscape = vw > vh;
  let mainContainerHeight = landscape ? vh * 0.85 : vh * 0.9;
  if (mainContainerHeight < vh - 100) mainContainerHeight = vh - 100;
  return { vw, vh, landscape, mainContainerHeight };
};

const INITIAL_DIMENSIONS = getDimensions();
const INITIAL_SPLIT =
  INITIAL_DIMENSIONS.mainContainerHeight > 500 && INITIAL_DIMENSIONS.landscape;

const INITIAL_STATE = {
  dimensions: INITIAL_DIMENSIONS,
  splitSamplePanel: INITIAL_SPLIT,
  analyzerOn: INITIAL_SPLIT,
};
console.log(INITIAL_STATE);

export const screenSlice = createSlice({
  name: 'screen',
  initialState: INITIAL_STATE,
  reducers: {
    setDimensions: (state) => {
      state.dimensions = getDimensions();
      state.splitSamplePanel =
        state.dimensions.mainContainerHeight > 500 &&
        state.dimensions.landscape;
    },
    setAnalyzerOn: (state, { payload }) => {
      state.analyzerOn = payload;
    },
  },
});

export const { setDimensions, setAnalyzerOn } = screenSlice.actions;

export default screenSlice.reducer;

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', afterRotate);
window.addEventListener('blur', () => {
  window.addEventListener('focus', redraw);
});

let resizeTimer;
let prevWidth = document.documentElement.clientWidth;
const root = document.getElementById('root');
const preparingPortal = document.getElementById('preparingPortal');

function handleResize() {
  if (document.documentElement.clientWidth === prevWidth) return; // touch scroll bug hack
  clearTimeout(resizeTimer);
  root.style.display = 'none';
  preparingPortal.style.display = 'initial';
  resizeTimer = setTimeout(redraw, 350);
}

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
