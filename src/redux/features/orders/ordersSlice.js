import { uuidv4 } from '@firebase/util';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDoc } from 'firebase/firestore';
import {
  createOrderDocument,
  getOrders,
} from '../../../firebase/firebaseUtils';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null,
};

// const createOrderSuccess = (orderData) => {
//   return {
//     orderData: orderData,
//   };
// };

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData) => {
    try {
      const orderRef = await createOrderDocument({
        id: uuidv4(),
        ...orderData,
      });

      const querySnapshot = await getDoc(orderRef);

      return querySnapshot;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async (userId) => {
    try {
      const fetchedOrders = await getOrders(userId);

      return fetchedOrders;
    } catch (error) {
      console.log(error);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    purchaseInit: (state) => {
      state.purchased = false;
    },
  },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loading = true;
      state.purchased = false;
    },
    [createOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.purchased = true;
      state.orders = [{ id: payload.id, ...payload.data() }];
    },
    [createOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.purchased = false;
      state.error = payload.error;
    },
    [fetchOrder.pending]: (state) => {
      state.loading = true;
    },
    [fetchOrder.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.orders = [...payload];
    },
    [fetchOrder.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
  },
});

export const { purchaseInit } = ordersSlice.actions;
export default ordersSlice.reducer;
