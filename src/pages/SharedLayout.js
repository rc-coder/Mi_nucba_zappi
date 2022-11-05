import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Order } from '../components/Orders/Order';

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Order />
      <Outlet />
    </>
  );
};

export default SharedLayout;
