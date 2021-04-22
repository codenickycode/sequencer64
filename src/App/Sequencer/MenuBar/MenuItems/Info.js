import { Button } from 'App/shared/Button';
import { LogoIcon } from 'assets/icons';

export const Info = () => {
  const onClick = () => {};

  return (
    <div className='menuBtnWrapper'>
      <Button id='infoBtn' classes='menuBtn' onClick={onClick}>
        <LogoIcon />
        <label htmlFor='infoBtn'>Info</label>
      </Button>
    </div>
  );
};
