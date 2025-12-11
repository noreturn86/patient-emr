import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  patient: null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPatient: (state, action) => {
      state.patient = action.payload.patient;
      state.token = action.payload.token;

      // Persist token to localStorage
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.patient = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearPatient: (state) => {
      state.patient = null;
    },
  },
});

export const { setPatient, logout, patient } = authSlice.actions;
export default authSlice.reducer;