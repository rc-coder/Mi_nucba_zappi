import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, removeItemFromCart } from './cartUtils';

const initialState = {
  hidden: true,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartHidden: (state) => {
      state.hidden = !state.hidden;
    },
    addItem: (state, action) => {
      state.cartItems = addItemToCart(state.cartItems, action.payload);
    },
    removeItem: (state, { payload }) => {
      state.cartItems = removeItemFromCart(state.cartItems, payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { toggleCartHidden, addItem, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
