import { Notifications } from './Notifications';
import { GetUser } from './GetUser';
import { Storage } from './Storage';
import { Display } from './Display';
import { Transport } from './Transport';

export const Subscriptions = () => {
  return (
    <>
      <Notifications />
      <GetUser />
      <Storage />
      <Transport />
      <Display />
    </>
  );
};
