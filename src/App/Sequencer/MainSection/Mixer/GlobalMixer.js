import { mainBus } from 'App/Tone';
import { Portal } from 'App/shared/Portal';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpDownIcon } from 'assets/icons';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Knob } from './Knob';

export const GlobalMixer = () => {
  return null;
  // return (
  //   <Portal targetId='overGridPortal'>
  //     <div id='mixer' className='mixer'>
  //       <div className='mixItemWrapper'>
  //         {Object.entries(mainBus.mixer).map(([property, node], i) => {
  //           console.log(property, node);
  //           return <MixItem key={`mixItem${i}`} property={property} node={node} />;
  //         })}
  //       </div>
  //     </div>
  //   </Portal>
  // );
};

// const MixItem = ({ property, node }) => {

//   const id = `globalMixItem${property}`;
//   const knobId = `${id}Knob`;
//   return (
//     <div id={id} className='mixItem'>
//       <p className='mixItemName'>{property}</p>
//       <div className='knobWrapper'>
//         <div className='knob' id={knobId} {...touchAndMouse}>
//           <label htmlFor={knobId}>
//             <ArrowUpDownIcon />
//           </label>
//           <Knob value={value} />
//         </div>
//       </div>
//     </div>
//   );
// };
