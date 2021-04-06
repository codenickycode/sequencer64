import { Notifications } from './Notifications';
import { GetUser } from './GetUser';
import { Storage } from './Storage';
import { Theme } from './Theme';
import { Transport } from './Transport';

export const Subscriptions = () => {
  return (
    <>
      <Notifications />
      <GetUser />
      <Storage />
      <Transport />
      <Theme />
    </>
  );
};
