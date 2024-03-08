import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  paginationCount: 1,
};

const dataAllSlice = createSlice({
  name: 'dataAllSlice',
  initialState: initialState,
  reducers: {
    changePaginationCount: (state, action) => {
      state.paginationCount = action.payload;
    },
  },
});

export const { changePaginationCount } = dataAllSlice.actions;
export default dataAllSlice.reducer;
