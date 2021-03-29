import React, { useContext, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { useDispatch, useSelector } from 'react-redux';
import { getLS, setLS } from './utils/storage';
import { loadSamples } from './features/Sequencer/reducers/toneSlice';
import { Kit } from './features/Sequencer/providers/Kit';
import { getUser } from './reducers/appSlice';

export const Responder = () => {
  const dispatch = useDispatch();

  // App Reducer
  const online = useSelector((state) => state.app.online);
  // const username = useSelector((state) => state.app.user.username);
  // const loggedIn = useSelector((state) => state.app.user.loggedIn);
  // const userSequences = useSelector((state) => state.app.userSequences);
  // const statusMessage = useSelector((state) => state.app.status.message);
  // const statusCount = useSelector((state) => state.app.status.count);
  // const show = useSelector((state) => state.app.show);
  // const fetching = useSelector((state) => state.app.fetching);
  // const confirmation = useSelector((state) => state.app.confirmation);
  // const error = useSelector((state) => state.app.error);
  // const networkError = useSelector((state) => state.app.networkError);
  // const serviceWorkerActive = useSelector(
  //   (state) => state.app.serviceWorkerActive
  // );

  // App effects
  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onlineRef = useRef(online);
  useEffect(() => {
    if (online) {
      if (!onlineRef.current) {
        console.log('back online');
        dispatch(getUser());
      }
      onlineRef.current = true;
    } else {
      console.log('offline');
      onlineRef.current = false;
    }
  }, [dispatch, online]);

  // Tone Reducer
  const bufferedKit = useSelector((state) => state.tone.bufferedKit);
  const loadingBuffers = useSelector((state) => state.tone.buffersLoading);
  // const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);
  // const bufferError = useSelector((state) => state.tone.bufferError);
  // const transportState = useSelector((state) => state.tone.transportState);
  // const restarting = useSelector((state) => state.tone.restarting);
  // const reloadSamples = useSelector((state) => state.tone.reloadSamples);

  // Editor Reducer
  // const selectedSample = useSelector((state) => state.editor.selectedSample);
  // const mode = useSelector((state) => state.editor.mode);
  // const spAlertCount = useSelector((state) => state.editor.spAlert.count);
  // const spAlertMessage = useSelector((state) => state.editor.spAlert.message);
  // const modVelocity = useSelector((state) => state.editor.mods.velocity);
  // const modPitch = useSelector((state) => state.editor.mods.pitch);
  // const modLength = useSelector((state) => state.editor.mods.length);
  // const tapCellById = useSelector((state) => state.editor.tapCellById);
  // const toggleOn = useSelector((state) => state.editor.toggleOn);

  // Sequence Reducer
  const sequenceId = useSelector((state) => state.sequence.present._id);
  const sequenceName = useSelector((state) => state.sequence.present.name);
  const sequenceBpm = useSelector((state) => state.sequence.present.bpm);
  const sequenceLength = useSelector((state) => state.sequence.present.length);
  const sequencePattern = useSelector(
    (state) => state.sequence.present.pattern
  );
  const sequenceKitName = useSelector((state) => state.sequence.present.kit);
  // const noteTally = useSelector((state) => state.sequence.present.noteTally);
  // const undoStatus = useSelector((state) => state.sequence.present.undoStatus);

  // Sequence effects
  useEffect(() => {
    setLS('sequenceId', sequenceId);
  }, [sequenceId]);

  useEffect(() => {
    setLS('sequenceName', sequenceName);
  }, [sequenceName]);

  useEffect(() => {
    Tone.Transport.bpm.value = sequenceBpm;
    setLS('sequenceBpm', sequenceBpm);
  }, [sequenceBpm]);

  useEffect(() => {
    setLS('sequenceLength', sequenceLength);
  }, [sequenceLength]);

  useEffect(() => {
    setLS('sequencePattern', sequencePattern);
  }, [sequencePattern]);

  useEffect(() => {
    setLS('sequenceKitName', sequenceKitName);
  }, [sequenceKitName]);

  const { kitRef } = useContext(Kit);
  useEffect(() => {
    if (bufferedKit !== sequenceKitName && !loadingBuffers) {
      dispatch(loadSamples(kitRef.current));
    }
  }, [bufferedKit, dispatch, sequenceKitName, loadingBuffers, kitRef]);

  return null;
};
