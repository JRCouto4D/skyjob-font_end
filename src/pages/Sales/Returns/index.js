import React, { useMemo } from 'react';

import { formatPrice } from '../../../util/format';

import { Container, Content, TableItens } from './styles';

function Returns() {
  const itens = [
    {
      id: 1,
      description: 'CREATINA 300G',
      amount: 1,
      retail_price: 35,
      discount: 10,
      total: 31.5,
    },
    {
      id: 1,
      description: 'CREATINA 300G',
      amount: 1,
      retail_price: 35,
      discount: 10,
      total: 31.5,
    },
    {
      id: 1,
      description: 'CREATINA 300G',
      amount: 1,
      retail_price: 35,
      discount: 10,
      total: 31.5,
    },
    {
      id: 1,
      description: 'CREATINA 300G',
      amount: 1,
      retail_price: 35,
      discount: 10,
      total: 31.5,
    },
    {
      id: 1,
      description: 'CREATINA 300G',
      amount: 1,
      retail_price: 35,
      discount: 10,
      total: 31.5,
    },
    {
      id: 1,
      description: 'CREATINA 300G',
      amount: 1,
      retail_price: 35,
      discount: 10,
      total: 31.5,
    },
    {
      id: 1,
      description: 'CREATINA 300G',
      amount: 1,
      retail_price: 35,
      discount: 10,
      total: 31.5,
    },
    {
      id: 1,
      description: 'CREATINA 300G',
      amount: 1,
      retail_price: 35,
      discount: 10,
      total: 31.5,
    },
  ];

  const memoList = useMemo(() => {
    return (
      <TableItens>
        <li className="header">
          <strong>ID</strong>
          <strong>DESCRIÇÃO</strong>
          <strong>QUANTIDADE</strong>
          <strong>R$ VAREJO</strong>
          <strong>% DISCONTO</strong>
          <strong>R$ TOTAL</strong>
        </li>

        <div className="item-table">
          {itens.map((item) => (
            <li>
              <span>{item.id ? `#${item.id}` : ''}</span>
              <span>{item.description ? item.description : ''}</span>
              <span>{item.amount ? item.amount : ''}</span>
              <span>
                {item.retail_price ? formatPrice(item.retail_price) : ''}
              </span>
              <span>{item.discount}</span>
              <span>{item.total ? formatPrice(item.total) : ''}</span>
            </li>
          ))}
        </div>
      </TableItens>
    );
  }, [itens]);

  return (
    <Container>
      <Content>
        <header>
          <strong>DEVOLUÇÃO</strong>
          <h1>DE VENDAS</h1>
        </header>

        <div className="body">
          <div className="label-block">
            <strong>ID</strong>
            <span>#122318235612</span>
          </div>

          <div className="label-block">
            <strong>TIPO:</strong>
            <span>VAREJO</span>
          </div>

          <div className="label-block">
            <strong>CLIENTE:</strong>
            <span>JEFFERSON ROCHA COUTO</span>
          </div>

          <div className="label-block">
            <strong>CPF/CNPJ</strong>
            <span>122318235612</span>
          </div>

          <div className="label-block">
            <strong>TOTAL</strong>
            <span>R$ 120,00</span>
          </div>

          <div className="label-block">
            <strong>PAGAMENTO</strong>
            <span>A VISTA</span>
          </div>

          <div className="label-block">
            <strong>DATA</strong>
            <span>12/11/2020</span>
          </div>

          <div className="label-block">
            <strong>HORÁRIO</strong>
            <span>19:30hs</span>
          </div>
        </div>

        <strong
          style={{
            marginTop: 15,
            marginBottom: 5,
            fontSize: 18,
            color: '#999',
            fontWeight: 'normal',
          }}
        >
          ITENS DA VENDA
        </strong>
        <hr />

        {memoList}

        <footer>
          <button type="button" className="cancel-button">
            CANCELAR
          </button>
          <button type="button" className="confirm-button">
            CONFIRMAR DEVOLUÇÃO
          </button>
        </footer>
      </Content>
    </Container>
  );
}

export default Returns;
