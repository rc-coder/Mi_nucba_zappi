import { FormContent, FormStyled, Input } from '../UI';
import useForm from '../../hooks/useForm';
import { COSTO_ENVIO, VALIDATOR_REQUIRE } from '../../Utils';
import { CardSummary } from '../CardSummary/CardSummary';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createOrder,
  purchaseInit,
} from '../../redux/features/orders/ordersSlice';
import { clearCart } from '../../redux/features/cart/cartSlice';
import { useEffect } from 'react';
import { Spinner } from '../UI/Spinner';

export const CheckOutForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { purchased, loading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const [formState, InputHandler] = useForm(
    {
      domicilio: {
        value: '',
        isValid: false,
      },
      localidad: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!formState.isValid) {
      alert('Completa todos los datos');
      return;
    }
    const orderData = {
      userId: currentUser.id,
      shippingDetails: {
        domicilio: formState.inputs.domicilio.value,
        localidad: formState.inputs.localidad.value,
      },
      items: [...cartItems],
      shippingPrice: COSTO_ENVIO,
      subtotal: subTotal,
      total: COSTO_ENVIO + subTotal,
    };

    dispatch(createOrder(orderData));
    dispatch(clearCart());
  };

  useEffect(() => {
    if (purchased) {
      dispatch(purchaseInit());
      navigate('/mis-ordenes');
    }
  }, [purchased]);

  return (
    <form onSubmit={handlerSubmit}>
      <FormStyled>
        <FormContent>
          <Input
            id="domicilio"
            type="text"
            label="Domicilio"
            onInput={InputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Campo Obligatorio"
          />
          <Input
            id="localidad"
            type="text"
            label="Localidad"
            onInput={InputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Campo Obligatorio"
          />
        </FormContent>
      </FormStyled>
      <CardSummary
        isValid={!formState.isValid}
        subTotal={subTotal}
        envio={COSTO_ENVIO}
      />

      {loading && <Spinner />}
    </form>
  );
};
