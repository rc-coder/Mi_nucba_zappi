import styled from 'styled-components';
import { nucbazapiGray } from '../../Styles/utilities';

// styled(ScrollContainer)

export const TagsMenu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow-x: hidden;
  margin: 20px 0;
  padding: 10px 0;
  /* @media screen and (max-width: 600px) {
    justify-content: flex-start;
  } */
`;

export const TagCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  background: ${({ selected }) => (selected ? '#e8e8e8' : '#fff')};
  /* color: ${(props) => props.theme.gray}; */
  color: ${nucbazapiGray};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.09);
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 10px;
  &:hover {
    background: #e8e8e8;
    box-shadow: none;
  }
`;

export const TagImg = styled.div`
  border-radius: 50%;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  width: 30px;
  height: 30px;
  margin-right: 20px;
`;
