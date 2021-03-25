import React, { useState } from 'react';
import axios from 'axios';

export const FetchKit = () => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState('click to fetch');

  const onClick = async () => {
    try {
      setFetching(true);
      const res = await axios.get(
        // 'https://drumnickydrum-sequencer.herokuapp.com/??',
        'http://localhost:4000/kits/analog/ch.mp3',
        {
          withCredentials: true,
        }
      );
      setConfirmation('got it!');
      console.log(res.data);
    } catch (e) {
      setError(e.response.data);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div id='fetch-kit'>
      <p>{confirmation}</p>
      <p className='error'>{error ? error : 'no error'}</p>
      <button onClick={onClick} disabled={fetching}>
        fetch kit
      </button>
    </div>
  );
};
