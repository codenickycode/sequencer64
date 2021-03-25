import { configureStore } from '@reduxjs/toolkit';
import sequenceReducer from './features/Sequencer/reducers/sequenceSlice';
import editorReducer from './features/Sequencer/reducers/editorSlice';
import toneReducer from './features/Sequencer/reducers/toneSlice';
import appReducer from './reducers/appSlice';

export default configureStore({
  reducer: {
    sequence: sequenceReducer,
    editor: editorReducer,
    tone: toneReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    });
  },
});
