import React, { useState } from 'react';
import {
  MdFilterList,
  MdPrint,
  MdFastRewind,
  MdFastForward,
} from 'react-icons/md';

import history from '../../../../services/history';
import { formatPrice } from '../../../../util/format';

import { Container, Content, Body, BoxNavigation } from './styles';

function ListReturns() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(3);
  const [returns, setReturns] = useState([
    {
      id: 123122,
      total: 150,
      completed_at: '10/12/2020',
      created_at: '13/12/2020',
      authorization: 'Jefferson Rocha Couto',
    },
    {
      id: 12314232,
      total: 245.6,
      completed_at: '11/12/2020',
      created_at: '12/12/2020',
      authorization: 'Jefferson Rocha Couto',
    },
    {
      id: 3122,
      total: 90,
      completed_at: '17/12/2020',
      created_at: '19/12/2020',
      authorization: 'Jefferson Rocha Couto',
    },
    {
      id: 3122,
      total: 90,
      completed_at: '17/12/2020',
      created_at: '19/12/2020',
      authorization: 'Jefferson Rocha Couto',
    },
    {
      id: 3122,
      total: 90,
      completed_at: '17/12/2020',
      created_at: '19/12/2020',
      authorization: 'Jefferson Rocha Couto',
    },
    {
      id: 3122,
      total: 90,
      completed_at: '17/12/2020',
      created_at: '19/12/2020',
      authorization: 'Quézia Reis Cardozo Couto',
    },
    {
      id: 3122,
      total: 90,
      completed_at: '17/12/2020',
      created_at: '19/12/2020',
      authorization: 'Jefferson Rocha Couto',
    },
    {
      id: 3122,
      total: 90,
      completed_at: '17/12/2020',
      created_at: '19/12/2020',
      authorization: 'Jefferson Rocha Couto',
    },
  ]);

  return (
    <Container>
      <Content>
        <header>
          <div className="header-box-left">
            <strong>LISTA DE</strong>
            <h1>DEVOLUÇÕES</h1>
          </div>

          <div className="header-box-right">
            <button className="filter-button" onClick={() => {}} type="button">
              <MdFilterList color="#ab0000" size={50} />
            </button>

            <button
              type="button"
              onClick={() => history.push('/returns/setsales')}
              className="new-return-button"
            >
              <span>NOVA</span>
              <strong>DEVOLUÇÃO</strong>
            </button>
          </div>
        </header>

        <BoxNavigation>
          <div className="box-pagination">
            <button type="button" onClick={() => {}}>
              <MdFastRewind color="#fff" size={20} />
            </button>
            <strong>{`${page} de ${total}`}</strong>
            <button type="button" onClick={() => {}}>
              <MdFastForward color="#fff" size={20} />
            </button>
          </div>

          <button type="button" className="print-button" onClick={() => {}}>
            <MdPrint color="#333" size={20} />
            <strong>IMPRIMIR</strong>
          </button>
        </BoxNavigation>

        <Body>
          <ul>
            <li className="table-header">
              <strong>#ID</strong>
              <strong>R$ TOTAL</strong>
              <strong>DATA DA VENDA</strong>
              <strong>DATA DE DEVOLUÇÃO</strong>
              <strong>AUTORIZAÇÃO</strong>
            </li>
            {returns.map((rt) => (
              <div className="item-table">
                <li>
                  <span>{`#${rt.id}`}</span>
                  <span>{formatPrice(rt.total)}</span>
                  <span>{rt.completed_at}</span>
                  <span>{rt.created_at}</span>
                  <span>{rt.authorization}</span>
                </li>
              </div>
            ))}
          </ul>
        </Body>
      </Content>
    </Container>
  );
}

export default ListReturns;
