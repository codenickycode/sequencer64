import { mainBus } from 'App/Tone';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Mixer = () => {
  const mainVolume = useSelector((state) => state.sequence.present.mainMixer.volume);
  useEffect(() => {
    mainBus.mixer.volume.setValFromRotary(mainVolume);
  }, [mainVolume]);

  const reverb = useSelector((state) => state.sequence.present.mainMixer.reverb);
  useEffect(() => {
    mainBus.mixer.reverb.setValFromRotary(reverb);
  }, [reverb]);

  const filter = useSelector((state) => state.sequence.present.mainMixer.filter);
  useEffect(() => {
    mainBus.mixer.filter.setValFromRotary(filter);
  }, [filter]);

  const warp = useSelector((state) => state.sequence.present.mainMixer.warp);
  useEffect(() => {
    mainBus.mixer.warp.setValFromRotary(warp);
  }, [warp]);

  const crush = useSelector((state) => state.sequence.present.mainMixer.crush);
  useEffect(() => {
    mainBus.mixer.crush.setValFromRotary(crush);
  }, [crush]);

  const distort = useSelector((state) => state.sequence.present.mainMixer.distort);
  useEffect(() => {
    mainBus.mixer.distort.setValFromRotary(distort);
  }, [distort]);

  return null;
};
