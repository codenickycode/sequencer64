import { configureStore } from '@reduxjs/toolkit';
import sequenceReducer from 'App/reducers/sequenceSlice';
import editorReducer from 'App/reducers/editorSlice';
import toneReducer from 'App/reducers/toneSlice';
import appReducer from 'App/reducers/appSlice';
import assetsReducer from 'App/reducers/assetsSlice';
import screenReducer from 'App/reducers/screenSlice';

export default configureStore({
  reducer: {
    assets: assetsReducer,
    tone: toneReducer,
    sequence: sequenceReducer,
    editor: editorReducer,
    app: appReducer,
    screen: screenReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      // immutableCheck: false,
      // serializableCheck: false,
    });
  },
});
