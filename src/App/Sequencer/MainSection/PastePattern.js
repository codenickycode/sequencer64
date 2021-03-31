import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as defaultKits from 'utils/defaultKits';
import * as icons from 'assets/icons/kit';
import { MODES } from 'App/reducers/editorSlice';
import { paste } from 'App/reducers/sequenceSlice';
import { Button } from 'App/shared/Button';
import { useFadeIn } from 'utils/useFadeIn';

export const PastePattern = () => {
  const kit = useSelector((state) => state.sequence.present.kit);
  const samples = defaultKits[kit].samples;

  const mode = useSelector((state) => state.editor.mode);
  const pasting = mode === MODES.COPYING;
  const { fadeInClass } = useFadeIn(pasting);

  const pastePatternMemo = useMemo(() => {
    // console.log('rendering: PastePattern');
    let grid = [];
    for (let i = 0, len = samples.length; i < len; i++) {
      grid.push(i);
    }
    return (
      <div id='paste-pattern' className={'paste-pattern' + fadeInClass}>
        <div id='paste-pattern-samples'>
          {grid.map((i) => {
            return (
              <SampleBtn
                key={`paste-pattern-${samples[i].name}`}
                i={i}
                icon={samples[i].icon}
                color={samples[i].color}
              />
            );
          })}
        </div>
      </div>
    );
  }, [fadeInClass, samples]);
  return pasting ? pastePatternMemo : null;
};

const SampleBtn = ({ i, icon, color }) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const pattern = useSelector((state) => state.sequence.present.pattern);

  const [flashClass, setFlashClass] = useState('cells');
  const onClick = () => {
    dispatch(paste({ sample: i, selectedSample }));
    setFlashClass('cells selected');
    setTimeout(() => setFlashClass('cells'));
  };

  let classes = `sample borderDefault`;
  const selected = i === selectedSample;
  if (selected) classes += ' flashing';

  return (
    <Button classes={classes} onClick={onClick}>
      {selected ? (
        <p className='flashing'>copying...</p>
      ) : (
        <div className='paste-icon-wrapper'>{icons[icon](color)}</div>
      )}
      <div className={flashClass}>
        {pattern.map((step, s) => {
          const classes = step[i].noteOn ? `cell bg${i} on` : 'cell';
          return <div key={`paste-pattern-${s}-${i}`} className={classes} />;
        })}
      </div>
      <div className='border-flashing' />
    </Button>
  );
};
