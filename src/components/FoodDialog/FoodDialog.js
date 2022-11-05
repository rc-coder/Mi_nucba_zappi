import styled from 'styled-components';
import { FoodLable } from '../Menu/FoodGrid';
import { nucbazapiRed } from '../../Styles/utilities/Color';
import { formatprice } from '../../Utils';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/features/cart/cartSlice';
import { above } from '../../Styles/utilities/Breakpoints';

const Dialog = styled.div`
  width: 500px;
  background-color: white;
  position: fixed;
  top: 150px;
  z-index: 5;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const DialogBanner = styled.div`
  min-height: 150px;
  margin-bottom: 20px;
  ${({ img }) => `background-image: url(${img})`};
  background-position: center;
  background-size: cover;
  border-radius: 8px 8px 0px 0px;
`;

const DialogBannerName = styled(FoodLable)`
  top: 75px;
  padding: 5px 10px;
`;

export const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

export const DialogContent = styled.div`
  overflow: auto;
  min-height: 100px;
  max-height: 500px;
  padding: 40px;
`;

export const DialogFooter = styled.div`
  box-shadow: 0px -2px 10px 0px gray;
  display: flex;
  justify-content: center;
`;

export const ConfirmButton = styled.div`
  margin: 10px;
  color: white;
  height: 20px;
  border-radius: 8px;
  width: 200px;
  cursor: pointer;
  background-color: ${nucbazapiRed};
  text-align: center;
  padding: 10px;
  &:hover {
    opacity: 0.8;
    color: darkgray;
  }
  &:active {
    opacity: 1;
  }
  /* ${above.med`
  background-color: blue;
  `} */
`;

const FoodDialogContainer = ({ openFood, setOpenFood }) => {
  const dispatch = useDispatch();

  const handlerClose = () => {
    setOpenFood();
  };

  const addToOrder = () => {
    dispatch(addItem(openFood));
    handlerClose();
  };
  return (
    <>
      <DialogShadow onClick={handlerClose} />
      <Dialog>
        <DialogBanner img={openFood.img}>
          <DialogBannerName>{openFood.name}</DialogBannerName>
        </DialogBanner>
        <DialogContent>
          <p>{openFood.description}</p>
        </DialogContent>
        <DialogFooter>
          <ConfirmButton onClick={addToOrder}>
            Agregar: {formatprice(openFood.price)}
          </ConfirmButton>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const FoodDialog = (props) => {
  if (!props.openFood) return null;
  return <FoodDialogContainer {...props} />;
};
