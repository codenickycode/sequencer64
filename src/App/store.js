import { configureStore } from '@reduxjs/toolkit';
import sequenceReducer from 'App/reducers/sequenceSlice';
import editorReducer from 'App/reducers/editorSlice';
import toneReducer from 'App/reducers/toneSlice';
import appReducer from 'App/reducers/appSlice';

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
