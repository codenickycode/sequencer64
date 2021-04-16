import { Button } from 'App/shared/Button';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const TransportBtn = ({ id, onClick, Icon, show }) => {
  const transportDisabled = useTransportDisabled();
  const memo = useMemo(() => {
    return !show ? null : (
      <Button
        id={id}
        aria-label={id}
        classes='menuBtn'
        disabled={transportDisabled}
        onClick={onClick}
      >
        <Icon />
      </Button>
    );
  }, [id, onClick, show, transportDisabled]);
  return memo;
};

const useTransportDisabled = () => {
  const countIn = useSelector((state) => state.tone.countIn);
  const loadingSamples = useSelector((state) => state.tone.loadingSamples);

  const countingIn = countIn !== '';
  const transportDisabled = loadingSamples || countingIn;

  return transportDisabled;
};
