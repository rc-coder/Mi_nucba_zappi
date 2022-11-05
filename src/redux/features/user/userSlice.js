import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  hiddenMenu: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
      state.hiddenMenu = true;
    },
    toggleMenu: (state) => {
      state.hiddenMenu = !state.hiddenMenu;
    },
  },
});

export const { setCurrentUser, toggleMenu } = userSlice.actions;
export default userSlice.reducer;
