import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "currentUsers",
  initialState,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.user = { ...payload };
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
