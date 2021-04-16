import { EDITOR_MODE_INFO, setInfo } from 'App/reducers/editorSlice';
import { areWeEditing } from 'App/reducers/useAbstractState/useEditorState';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useShowAndHideClass } from 'utils/hooks/useShowAndHide';
import { Analyzer } from './Analyzer';

export const VisualPanel = () => {
  return (
    <div id='visualPanel' className='visualPanel'>
      <Info />
      <Analyzer />
    </div>
  );
};

const Info = () => {
  const { state, classes } = useInfoState();

  const memo = useMemo(() => {
    return (
      <div className={classes.container}>
        {state.countIn ? (
          <p className={classes.countIn}>{state.countIn}</p>
        ) : (
          <p className={classes.infoText}>{state.infoText}</p>
        )}
      </div>
    );
  }, [classes, state]);

  return memo;
};

const useInfoState = () => {
  const editorMode = useSelector((state) => state.editor.mode);

  const state = {};
  state.editing = areWeEditing(editorMode);
  state.transportStarted = useSelector((state) => state.tone.transportState === 'started');
  state.analyzerOn = useSelector((state) => state.screen.analyzer.on);
  state.countIn = useSelector((state) => state.tone.countIn);
  state.infoText = useSelector((state) => state.editor.info);
  state.flashInfo = useSelector((state) => state.app.flashInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInfo(EDITOR_MODE_INFO[editorMode]));
  }, [dispatch, editorMode]);

  const classes = useInfoStyle(state);

  return { state, classes };
};

const useInfoStyle = (state) => {
  const classes = {};
  classes.countIn = useShowAndHideClass('countIn', 100, state.countIn);
  classes.infoText = useShowAndHideClass('infoText', 3000, state.infoText, state.flashInfo);

  let showInfo = !state.editing;
  if (state.transportStarted && state.analyzerOn) showInfo = false;
  classes.container = showInfo ? 'info show' : 'info';

  return classes;
};
