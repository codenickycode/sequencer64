import cuid from 'cuid';
import { useMemo } from 'react';

export const DefaultSequence = ({ sequence, selectSequence, selectedId }) => {
  const { _id, name, bpm, kit } = sequence;
  const selected = selectedId === _id;
  const memo = useMemo(() => {
    const handleSelect = (e) => selectSequence(e, _id);
    return (
      <div
        key={cuid.slug()}
        className={selected ? 'defaultSequence selected' : 'defaultSequence'}
        onClick={handleSelect}
      >
        <p>{name}</p>
        <p>{kit}</p>
        <p className='bpm'>{bpm}</p>
        <p></p>
      </div>
    );
  }, [_id, bpm, kit, name, selectSequence, selected]);
  return memo;
};
