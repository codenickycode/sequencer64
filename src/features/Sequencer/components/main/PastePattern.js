import React, { useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as defaultKits from '../../defaults/defaultKits';
import * as icons from '../../../../icons/kit';
import { MODES } from '../../reducers/editorSlice';
import { paste } from '../../reducers/sequenceSlice';

export const PastePattern = () => {
  const kit = useSelector((state) => state.sequence.present.kit);
  const sounds = defaultKits[kit].sounds;

  const mode = useSelector((state) => state.editor.mode);
  const pasting = mode === MODES.COPYING;

  const pastePatternMemo = useMemo(() => {
    // console.log('rendering: PastePattern');
    let grid = [];
    for (let i = 0, len = sounds.length; i < len; i++) {
      grid.push(i);
    }

    return (
      <div id='paste-pattern' className={pasting ? 'show' : ''}>
        {pasting && (
          <div id='paste-pattern-sounds'>
            {grid.map((i) => {
              return (
                <SoundBtn
                  key={`paste-pattern-${sounds[i].name}`}
                  i={i}
                  icon={sounds[i].icon}
                  color={sounds[i].color}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }, [pasting, sounds]);
  return pastePatternMemo;
};

const SoundBtn = ({ i, icon, color }) => {
  const dispatch = useDispatch();
  const selectedSound = useSelector((state) => state.editor.selectedSound);
  const pattern = useSelector((state) => state.sequence.present.pattern);
  const ref = useRef(null);

  const onClick = () => {
    dispatch(paste({ sound: i, selectedSound }));
    if (ref.current) {
      ref.current.classList.add('selected');
      setTimeout(() => ref.current.classList.remove('selected'));
    }
  };

  let classes = `sound borderDefault`;
  const selected = i === selectedSound;
  if (selected) classes += ' flashing';

  return (
    <div className={classes} onClick={onClick}>
      {selected ? (
        <p className='flashing'>copying...</p>
      ) : (
        <div className='paste-icon-wrapper'>{icons[icon](color)}</div>
      )}
      <div ref={ref} className={selected ? 'cells selected' : 'cells'}>
        {pattern.map((step, s) => {
          const classes = step[i].noteOn ? `cell bg${i} on` : 'cell';
          return <div key={`paste-pattern-${s}-${i}`} className={classes} />;
        })}
      </div>
      <div className='border-flashing' />
    </div>
  );
};
