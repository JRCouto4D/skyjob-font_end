import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startSaleRequest } from '../../../../store/module/sale/actions';

import { Container } from './styles';

function StartSale() {
  const { pdv } = useSelector((state) => state.statusPDV);
  const { company } = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  async function startSale() {
    const data = {
      pdv_id: pdv.id,
      type_sale: 1,
      company_id: company.id,
    };

    dispatch(startSaleRequest(data));
  }

  return (
    <Container>
      <header>
        <h1>CAIXA ABERTO</h1>
        <span>PRÓXIMO CLIENTE</span>
      </header>

      <button type="button" onClick={startSale}>
        INICIAR VENDA
      </button>
    </Container>
  );
}

export default StartSale;
