import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MyOrders } from '../components/MyOrders/MyOrders';
import { fetchOrder } from '../redux/features/orders/ordersSlice';
import { CheckoutContainerStyled } from './OrdersElements';
import CheckoutBackground from '../assets/checkout.jpg';

const Orders = () => {
  const { currentUser } = useSelector((state) => state.user);
  let { orders, error } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchOrders = useCallback(async () => {
    await dispatch(fetchOrder(currentUser.id));
  }, [dispatch, currentUser]);

  if (!currentUser) {
    navigate('/');
  }
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <CheckoutContainerStyled img={CheckoutBackground}>
      <MyOrders orders={orders} />
    </CheckoutContainerStyled>
  );
};

export default Orders;
