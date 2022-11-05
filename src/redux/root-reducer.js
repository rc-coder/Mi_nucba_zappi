import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from '../redux/features/cart/cartSlice';
import productsReducer from '../redux/features/products/productsSlice';
import categoriesReducer from '../redux/features/categories/categoriesSlice';
import userReducer from '../redux/features/user/userSlice';
import ordersReducer from '../redux/features/orders/ordersSlice';

const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
  whitelist: ['cart'],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  categories: categoriesReducer,
  user: userReducer,
  orders: ordersReducer,
});

export default persistReducer(persistConfig, rootReducer);
