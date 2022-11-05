import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebaseUtils';
import { toggleMenu } from '../../redux/features/user/userSlice';
import {
  MenuOptionElement,
  MenuOptions,
  Shadow,
  UserMenuStyled,
  WelcomeTitle,
} from './UserMenuElements';

export const UserMenu = ({ user }) => {
  const { hiddenMenu } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleMenu());
  };
  return (
    <>
      {!hiddenMenu && <Shadow onClick={handleToggle}></Shadow>}

      <UserMenuStyled show={!hiddenMenu}>
        <WelcomeTitle>Hola {user.displayName}! </WelcomeTitle>
        <MenuOptions>
          <Link to={'/mis-ordenes'}>
            <MenuOptionElement onClick={handleToggle}>
              Mis Ordenes
            </MenuOptionElement>
          </Link>

          <MenuOptionElement onClick={() => auth.signOut()}>
            Cerrar sesion
          </MenuOptionElement>
        </MenuOptions>
      </UserMenuStyled>
    </>
  );
};
