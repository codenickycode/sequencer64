import { fft } from 'App/Tone';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const Analyzer = () => {
  const step = useSelector((state) => state.tone.step);
  const [spectrum, setSpectrum] = useState(Array.from(fft.getValue()));
  const transportState = useSelector((state) => state.tone.transportState);

  useEffect(() => {
    if (transportState !== 'started') setSpectrum([]);
  }, [transportState]);

  useEffect(() => {
    setSpectrum(Array.from(fft.getValue()));
  }, [step]);

  return (
    <div className='analyzer'>
      <p className='overlay'>Select a sample to edit</p>
      <div className='freqs'>
        {grid.map((i) => {
          let db = spectrum[i] * 200 || 0;
          return <Freq key={`freq-${i}`} i={i} db={db} />;
        })}
      </div>
    </div>
  );
};

const Freq = ({ i, db }) => {
  const prevDb = useRef(db);
  const [scale, setScale] = useState(db);

  useEffect(() => {
    if (db < prevDb.current) setScale(0);
    else setScale(db * 1.25);
    prevDb.current = db;
  }, [db]);

  const memo = useMemo(() => {
    const red = 255 - (i + 1) * 7;
    const blue = i * 7;
    return (
      <div
        className='freq'
        style={{
          transform: `scaleY(${scale})`,
          transition: scale ? '60ms' : '2s',
          backgroundColor: `rgb(${red},0,${blue})`,
        }}
      />
    );
  }, [i, scale]);
  return memo;
};

const grid = [];
for (let i = 3; i < 36; i++) {
  grid.push(i);
}
