import { useMemo } from 'react';
import { useTouchAndMouse } from 'utils/hooks/useTouchAndMouse';
import * as icons from 'assets/icons/kit';
import { useSampleBtn, useSampleBtnContainer } from './useSampleBtns';

const SampleBtnContainer = () => {
  const { kit, selectSample, selectedSample } = useSampleBtnContainer();
  const sampleBtnsMemo = useMemo(() => {
    return !kit ? null : (
      <div className='sampleBtns'>
        {kit.samples.map((sample, i) => (
          <SampleBtn
            key={`sample-menu-${sample.name}`}
            i={i}
            sample={sample}
            selectSample={selectSample}
            selected={selectedSample === i}
          />
        ))}
        <div id='sampleBtnsBorder' />
      </div>
    );
  }, [kit, selectSample, selectedSample]);
  return sampleBtnsMemo;
};
export { SampleBtnContainer as SampleBtns };

const SampleBtn = ({ i, sample, selectSample, selected }) => {
  const { containerClass, startFunc, onClick } = useSampleBtn(selectSample, selected, i);
  const { onTouchStart, onMouseDown } = useTouchAndMouse(startFunc);
  const memo = useMemo(() => {
    return (
      <div
        className={containerClass}
        onTouchStart={onTouchStart}
        onMouseDown={onMouseDown}
        onClick={onClick}
        aria-label={sample.name}
      >
        {icons[sample.icon](sample.color)}
        <div className={`border border${i}`} />
        <div className='bgFlash' />
        <div className={`bgSelected bg${i}`} />
      </div>
    );
  }, [containerClass, i, onClick, onMouseDown, onTouchStart, sample]);
  return memo;
};
