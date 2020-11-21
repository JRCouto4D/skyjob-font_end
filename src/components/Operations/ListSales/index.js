import React, { useState, useMemo } from 'react';
import { MdPrint } from 'react-icons/md';

import { Container } from './styles';

function ListSales() {
  const [sales, setSales] = useState([]);

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
          <div className="box-result-table">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <h2>NENHUM RESULTADO</h2>
            </div>
          </div>
        )}
      </ul>
    ),
    [sales]
  );

  return (
    <Container>
      <main>
        {sales.length >= 1 && (
          <div className="box-print">
            <button type="button">
              <MdPrint color="#333" size={20} />
              <strong>IMPRIMIR</strong>
            </button>
          </div>
        )}
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
