import { ClearNotifications } from './ClearNotifications';
import { GetUser } from './GetUser';
import { Storage } from './Storage';
import { Transport } from './Transport';

export const Subscriptions = () => {
  return (
    <>
      <ClearNotifications />
      <GetUser />
      <Storage />
      <Transport />
    </>
  );
};
