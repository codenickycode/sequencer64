import { Kit, mainBus } from 'App/Tone';
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

  const sample0Vol = useSelector((state) => state.sequence.present.sampleMixer[0].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[0].vol.setValFromRotary(sample0Vol);
  }, [sample0Vol]);

  const sample0Pan = useSelector((state) => state.sequence.present.sampleMixer[0].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[0].pan.setValFromRotary(sample0Pan);
  }, [sample0Pan]);

  const sample1Vol = useSelector((state) => state.sequence.present.sampleMixer[1].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[1].vol.setValFromRotary(sample1Vol);
  }, [sample1Vol]);

  const sample1Pan = useSelector((state) => state.sequence.present.sampleMixer[1].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[1].pan.setValFromRotary(sample1Pan);
  }, [sample1Pan]);

  const sample2Vol = useSelector((state) => state.sequence.present.sampleMixer[2].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[2].vol.setValFromRotary(sample2Vol);
  }, [sample2Vol]);

  const sample2Pan = useSelector((state) => state.sequence.present.sampleMixer[2].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[2].pan.setValFromRotary(sample2Pan);
  }, [sample2Pan]);

  const sample3Vol = useSelector((state) => state.sequence.present.sampleMixer[3].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[3].vol.setValFromRotary(sample3Vol);
  }, [sample3Vol]);

  const sample3Pan = useSelector((state) => state.sequence.present.sampleMixer[3].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[3].pan.setValFromRotary(sample3Pan);
  }, [sample3Pan]);

  const sample4Vol = useSelector((state) => state.sequence.present.sampleMixer[4].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[4].vol.setValFromRotary(sample4Vol);
  }, [sample4Vol]);

  const sample4Pan = useSelector((state) => state.sequence.present.sampleMixer[4].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[4].pan.setValFromRotary(sample4Pan);
  }, [sample4Pan]);

  const sample5Vol = useSelector((state) => state.sequence.present.sampleMixer[5].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[5].vol.setValFromRotary(sample5Vol);
  }, [sample5Vol]);

  const sample5Pan = useSelector((state) => state.sequence.present.sampleMixer[5].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[5].pan.setValFromRotary(sample5Pan);
  }, [sample5Pan]);

  const sample6Vol = useSelector((state) => state.sequence.present.sampleMixer[6].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[6].vol.setValFromRotary(sample6Vol);
  }, [sample6Vol]);

  const sample6Pan = useSelector((state) => state.sequence.present.sampleMixer[6].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[6].pan.setValFromRotary(sample6Pan);
  }, [sample6Pan]);

  const sample7Vol = useSelector((state) => state.sequence.present.sampleMixer[7].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[7].vol.setValFromRotary(sample7Vol);
  }, [sample7Vol]);

  const sample7Pan = useSelector((state) => state.sequence.present.sampleMixer[7].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[7].pan.setValFromRotary(sample7Pan);
  }, [sample7Pan]);

  const sample8Vol = useSelector((state) => state.sequence.present.sampleMixer[8].vol);
  useEffect(() => {
    if (!Kit.samples[0].vol) return;
    Kit.samples[8].vol.setValFromRotary(sample8Vol);
  }, [sample8Vol]);

  const sample8Pan = useSelector((state) => state.sequence.present.sampleMixer[8].pan);
  useEffect(() => {
    if (!Kit.samples[0].pan) return;
    Kit.samples[8].pan.setValFromRotary(sample8Pan);
  }, [sample8Pan]);

  return null;
};
