import React from 'react';
import { MdDone } from 'react-icons/md';

import BoxPDV from '../../../../components/Box_point-sale';
import BoxItens from '../../../../components/Box_itens-sales2';

import { Container, BoxLeft, Content, Footer, BoxRight } from './styles';

function Payment() {
  return (
    <BoxPDV poup>
      <Container>
        <BoxLeft>
          <Content>
            <h1>Box-left</h1>
          </Content>

          <Footer>
            <button type="button">
              <strong>CONFIRMAR PAGAMENTO</strong>
              <MdDone color="#fff" size={25} />
            </button>
          </Footer>
        </BoxLeft>
        <BoxRight>
          <BoxItens />
        </BoxRight>
      </Container>
    </BoxPDV>
  );
}

export default Payment;
