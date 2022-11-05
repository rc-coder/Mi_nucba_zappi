import styled from 'styled-components';
import { COSTO_ENVIO, formatprice } from '../../Utils';
import { CustomButton } from '../UI';
import { useSelector } from 'react-redux';

export const CardContainer = styled.div`
  max-width: 660px;
  width: 100%;
`;

export const CardSummaryStyled = styled.div`
  margin-top: 62px;
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
`;

export const CardSummaryContent = styled.div`
  padding: 24px 32px 15px;
  border-radius: 15px 15px;
  background-color: #fff;
`;

export const UlCard = styled.ul`
  list-style: none;
  padding: 0;
`;

export const LiCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  color: #9faab7;
  margin-bottom: 15px;
`;

export const RowCard = styled.hr`
  height: 1px;
  width: 100%;
  background-color: #e5edef;
`;

export const TotalCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const CardSummary = ({ isValid, envio, subTotal }) => {
  return (
    <CardContainer>
      <CardSummaryStyled>
        <CardSummaryContent>
          <UlCard>
            <LiCard>
              <p>Costo de productos</p>
              <span>{formatprice(subTotal)}</span>
            </LiCard>
            <LiCard>
              <p>Costo de envío</p>
              <span>{formatprice(envio)}</span>
            </LiCard>
          </UlCard>
          <RowCard />
          <TotalCard>
            <h4>Total</h4>
            <h4>{formatprice(envio + subTotal)}</h4>
          </TotalCard>
          <CustomButton w="100%" m="0px" disabled={isValid}>
            Pagar
          </CustomButton>
        </CardSummaryContent>
      </CardSummaryStyled>
    </CardContainer>
  );
};
