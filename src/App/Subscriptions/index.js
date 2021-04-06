import { ClearNotifications } from './ClearNotifications';
import { GetUser } from './GetUser';
import { Info } from './Info';
import { Storage } from './Storage';
import { Theme } from './Theme';
import { Transport } from './Transport';

export const Subscriptions = () => {
  return (
    <>
      <ClearNotifications />
      <GetUser />
      <Storage />
      <Transport />
      <Theme />
      <Info />
    </>
  );
};
