import { arraySections } from '../../../data/data';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: arraySections,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
