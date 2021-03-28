import { getUserFromCloud, getUserFromIDB, mergeSequences } from './user';
import { cloudUser, idbUser } from '../../utils/mocks/user';

global.fetch = jest.fn(() => {
  Promise.resolve({});
});

let payload;
beforeEach(() => {
  payload = { user: { username: '', sequences: [] }, message: '' };
});

it('gets user from cloud', async () => {
  await getUserFromCloud(payload);
  expect(payload.user.username).toBe(cloudUser.username);
});
