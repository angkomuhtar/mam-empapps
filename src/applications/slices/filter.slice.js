import {createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    keyword: '',
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
});

export const {setKeyword} = filterSlice.actions;
export default filterSlice.reducer;
