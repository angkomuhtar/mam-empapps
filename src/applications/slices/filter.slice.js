import {createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    keyword: '',
    month: '',
  },
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    },
  },
});

export const {setKeyword, setMonth} = filterSlice.actions;
export default filterSlice.reducer;
