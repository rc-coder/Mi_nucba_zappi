import { Foods } from '../../../data/data';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foods: Foods,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
