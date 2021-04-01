import cuid from 'cuid';
import { useMemo } from 'react';

export const DefaultSequence = ({ sequence, selectSequence, selectedId }) => {
  const { _id, name, bpm, kit } = sequence;
  const selected = selectedId === _id;
  const memo = useMemo(() => {
    const handleSelect = (e) => selectSequence(e, _id);
    return (
      <div
        key={cuid()}
        className={selected ? 'sequence selected' : 'sequence'}
        onClick={handleSelect}
      >
        <p>{name}</p>
        <p className='p-left-25'>{kit}</p>
        <p>{bpm}</p>
        <p></p>
      </div>
    );
  }, [_id, bpm, kit, name, selectSequence, selected]);
  return memo;
};
