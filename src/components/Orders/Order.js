import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatprice } from '../../Utils';
import { toggleCartHidden } from '../../redux/features/cart/cartSlice';
import {
  DialogContent,
  DialogFooter,
  ConfirmButton,
  DialogShadow,
} from '../FoodDialog/FoodDialog';
import { QuantityManage } from './QuantityManage';

const OrderStyled = styled.div`
  position: fixed;
  right: 0px;
  top: 93px;
  width: 340px;
  background-color: white;
  height: calc(100% - 93px);
  z-index: 10;
  box-shadow: 4px 0px 5px 4px gray;
  display: flex;
  flex-direction: column;
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(100%)')};
  transition-property: transform;
  transition-duration: 0.5s;
`;

const OrderContent = styled(DialogContent)`
  padding: 20px;
  max-height: 100%;
  height: 100%;
`;

const OrderContainer = styled.div`
  padding: 10px 10px;
  border-bottom: 1px solid #f7f7f7;
`;

const OrderItem = styled.div`
  padding: 10px 5px;
  display: grid;
  grid-template-columns: 50px 100px 100px;
  justify-content: space-between;
`;

const ItemImg = styled.div`
  width: 46px;
  height: 46px;
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
`;

export const Order = () => {
  const { hidden } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const total = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const dispatch = useDispatch();

  const handlerToggle = () => {
    dispatch(toggleCartHidden());
  };

  return (
    <>
      {hidden && <DialogShadow onClick={handlerToggle} />}
      <OrderStyled show={hidden}>
        {cartItems?.length === 0 ? (
          <OrderContent>Nada por aqui</OrderContent>
        ) : (
          <OrderContent>
            <OrderContainer>Tu pedido:</OrderContainer>
            {cartItems.map((item) => (
              <OrderContainer key={item.id}>
                <OrderItem>
                  <ItemImg img={item.img} />
                  <div>
                    <div>{item.name}</div>
                    {formatprice(item.price * item.quantity)}
                  </div>
                  <div>
                    <QuantityManage item={item} />
                  </div>
                </OrderItem>
              </OrderContainer>
            ))}
          </OrderContent>
        )}
        <DialogFooter>
          <Link to="/checkout" onClick={handlerToggle}>
            <ConfirmButton>Pagar {formatprice(total)}</ConfirmButton>
          </Link>
        </DialogFooter>
      </OrderStyled>
    </>
  );
};
