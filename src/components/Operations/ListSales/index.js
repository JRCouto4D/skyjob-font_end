import React, { useState, useMemo } from 'react';
import { MdPrint } from 'react-icons/md';

import { Container } from './styles';

function ListSales() {
  const [sales, setSales] = useState([
    {
      id: 1,
      date: '22/11/2020',
      hour: '14:25hs',
      salesman: 'Jefferson Couto',
      total: 'R$210,00',
    },
    {
      id: 2,
      date: '22/11/2020',
      hour: '14:31hs',
      salesman: 'Jefferson Couto',
      total: 'R$325,00',
    },
    {
      id: 3,
      date: '22/11/2020',
      hour: '14:49hs',
      salesman: 'Jefferson Couto',
      total: 'R$452,00',
    },
    {
      id: 4,
      date: '22/11/2020',
      hour: '15:16hs',
      salesman: 'Jefferson Couto',
      total: 'R$117,00',
    },
    {
      id: 4,
      date: '22/11/2020',
      hour: '15:16hs',
      salesman: 'Jefferson Couto',
      total: 'R$117,00',
    },
    {
      id: 4,
      date: '22/11/2020',
      hour: '15:16hs',
      salesman: 'Jefferson Couto',
      total: 'R$117,00',
    },
    {
      id: 4,
      date: '22/11/2020',
      hour: '15:16hs',
      salesman: 'Jefferson Couto',
      total: 'R$117,00',
    },
    {
      id: 4,
      date: '22/11/2020',
      hour: '15:16hs',
      salesman: 'Jefferson Couto',
      total: 'R$117,00',
    },
    {
      id: 4,
      date: '22/11/2020',
      hour: '15:16hs',
      salesman: 'Jefferson Couto',
      total: 'R$117,00',
    },
    {
      id: 4,
      date: '22/11/2020',
      hour: '15:16hs',
      salesman: 'Jefferson Couto',
      total: 'R$117,00',
    },
    {
      id: 4,
      date: '22/11/2020',
      hour: '15:16hs',
      salesman: 'Jefferson Couto',
      total: 'R$117,00',
    },
  ]);

  const listMemo = useMemo(
    () => (
      <ul>
        <li className="table-header">
          <strong>ID</strong>
          <strong>DATA</strong>
          <strong>HORÁRIO</strong>
          <strong>VENDEDOR</strong>
          <strong>TOTAL</strong>
        </li>
        {sales.length >= 1 ? (
          <div className="box-result-table">
            {sales.map((sale) => (
              <li>
                <strong>{`#${sale.id}`}</strong>
                <strong>{sale.date}</strong>
                <strong>{sale.hour}</strong>
                <strong>{sale.salesman}</strong>
                <strong>{sale.total}</strong>
              </li>
            ))}
          </div>
        ) : (
          <h2>NENHUM RESULTADO</h2>
        )}
      </ul>
    ),
    [sales]
  );

  return (
    <Container>
      <main>
        <div className="box-print">
          <button type="button">
            <MdPrint color="#333" size={20} />
            <strong>IMPRIMIR</strong>
          </button>
        </div>
        <div>{listMemo}</div>
        <footer>
          <div className="label-block">
            <strong>NUMERO DE VENDAS:</strong>
            <h3 style={{ color: '#00bfdd' }}>22</h3>
          </div>

          <div className="label-block">
            <strong>TOTAL:</strong>
            <h3>R$3480,00</h3>
          </div>
        </footer>
      </main>
    </Container>
  );
}

export default ListSales;
