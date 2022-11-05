import { OrderResume } from '../components/MyOrders/OrderResume';
import { CheckoutContainerStyled } from './CheckOutElements';
import CheckoutBackground from '../assets/checkout.jpg';

const Resume = () => {
  return (
    <CheckoutContainerStyled img={CheckoutBackground}>
      <OrderResume />
    </CheckoutContainerStyled>
  );
};

export default Resume;
