import styled from 'styled-components';
import { ReactComponent as ShoppingIcon } from '../../assets/cart-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartHidden } from '../../redux/features/cart/cartSlice';

const CartIconStyled = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ItemCount = styled.div`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;

//Esto nos permite importar imagenes como componentes de redux y le podemos pasar props

export const CartIcon = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) =>
    state.cart.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
  );

  return (
    <CartIconStyled onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon style={{ width: '24px', height: '24px' }} />
      <ItemCount>{quantity}</ItemCount>
    </CartIconStyled>
  );
};
