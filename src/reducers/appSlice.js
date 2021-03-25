import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const INITIAL_USER = {
  googleId: '',
  twitterId: '',
  facebookId: '',
  githubId: '',
  username: '',
  sequences: [],
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  status: { count: 0, message: 'loading' },
  show: '',
  fetching: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setShow: (state, { payload }) => {
      state.show = payload;
    },
    setUser: (state, { user, status }) => {
      state.user = user;
      state.status = status;
    },
    setStatus: (state, { payload }) => {
      state.status.count++;
      state.status.message = `${state.status.count}#${payload}`;
    },
    setFetching: (state, { payload }) => {
      state.fetching = payload;
    },
  },
});

export const getUser = () => async (dispatch) => {
  try {
    dispatch(appSlice.actions.setFetching(true));
    const res = await axios.get(
      // 'https://drumnickydrum-sequencer.herokuapp.com/user',
      'http://localhost:4000/user',
      {
        withCredentials: true,
      }
    );
    if (res.data) {
      dispatch(setUser({ user: res.data, status: 'User logged in' }));
    }
  } catch (e) {
    console.log('Get User ERROR ->\n');
    console.log(e.response?.data || e.message);
    dispatch(appSlice.actions.setStatus('User not logged in'));
  } finally {
    dispatch(appSlice.actions.setFetching(false));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(appSlice.actions.setFetching(true));
    await axios({
      url: 'http://localhost:4000/user/logout',
      method: 'GET',
      withCredentials: true,
    });
    dispatch(setUser(INITIAL_USER));
  } catch (e) {
    console.log('Logout ERROR ->\n', e);
    dispatch(appSlice.actions.setStatus('Error logging out'));
  } finally {
    dispatch(appSlice.actions.setFetching(false));
  }
};

export const { setShow, setUser, setStatus, setFetching } = appSlice.actions;

export default appSlice.reducer;
