import styled from 'styled-components';
import { Title } from '../UI';

export const FoodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

//podemos usar styled como funcion y al pasar title como argumento podemos extender de ese componente

export const FoodLable = styled(Title)`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  font-size: 15px;
`;

export const Food = styled.div`
  position: relative;
  height: 100px;
  /* con $ {x} se puede correr JavaScript, todas las props que le pasemos al componente Food, pasaran como parametro a la funcion anonima dentro de $ {x},
  de esta manera background-image es dinamico */
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  filter: contrast(75%);
  padding: 10px;
  font-size: 25px;
  margin-top: 5px;
  color: black;
  border-radius: 7px;
  transition-property: box-shadow margin-top;
  transition-duration: 0.1s;
  box-shadow: 0px 0px 2px 0px gray;
  &:hover {
    cursor: pointer;
    filter: contrast(100%);
    box-shadow: 0px 0px 15px 0px gray;
    margin-top: 0px;
  }
`;

//para hacer hover o cualquier pseudoclase de css se usa &:hover... indica que en ese elemento se usa una pseudoclase hover
