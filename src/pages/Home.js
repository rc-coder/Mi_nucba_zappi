import { Banner } from '../components/Banner/Banner';
import { Menu } from '../components/Menu/Menu';
import { FoodDialog } from '../components/FoodDialog/FoodDialog';

const Home = ({ openFood }) => {
  return (
    <>
      <FoodDialog {...openFood} />
      <Banner>
        <h2>La mejor comida del Oeste</h2>
        <p>Pide Online rápido y fácil</p>
      </Banner>
      <Menu {...openFood} />
    </>
  );
};

export default Home;
