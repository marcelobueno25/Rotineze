import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    hasSeenOnboarding: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setHasSeenOnboarding: (state) => {
      state.hasSeenOnboarding = true;
    },
  },
});

export const { setUser, clearUser, setHasSeenOnboarding } = authSlice.actions;
export default authSlice.reducer;
