import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdPrint } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { formatPrice } from '../../../util/format';

import { Container, Loading } from './styles';

function ListSales() {
  const [sales, setSales] = useState([]);
  const [numberSales, setNumberSales] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { pdv } = useSelector((state) => state.statusPDV);

  function setTotalSales(data = []) {
    const dataTotal = data.map((sale) => sale.total);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    setTotal(dataTotal.reduce(reducer, 0));
  }

  const loadSales = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`point_sales/${pdv.id}/sales-list`);

      setSales(response.data.sales);
      setNumberSales(response.data.total);
      setTotalSales(response.data.sales);

      setLoading(false);
    } catch (err) {
      setSales([]);
      toast.error('ALDO DEU ERRADO, POR FAVOR TENTE MAIS TARDE');
    }
  }, [pdv]);

  useEffect(() => {
    loadSales();
    setTotalSales();
  }, [loadSales]);

  useEffect(() => console.tron.log(sales), [sales]);

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
                <strong>
                  {sale.complete_at
                    ? format(parseISO(sale.complete_at), 'dd/MM/yyyy')
                    : ''}
                </strong>
                <strong>
                  {sale.complete_at
                    ? format(parseISO(sale.complete_at), "HH: mm 'hs'")
                    : ''}
                </strong>
                <strong>
                  {sale.point_sale.user ? sale.point_sale.user.name : ''}
                </strong>
                <strong>
                  {sale.total ? formatPrice(sale.total) : 'R$0,00'}
                </strong>
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
        {loading ? (
          <Loading>
            <FaSpinner color="#ab0000" size={25} />
          </Loading>
        ) : (
          sales.length >= 1 && (
            <div className="box-print">
              <button type="button">
                <MdPrint color="#333" size={20} />
                <strong>IMPRIMIR</strong>
              </button>
            </div>
          )
        )}
        <div>{listMemo}</div>
        <footer>
          <div className="label-block">
            <strong>NUMERO DE VENDAS:</strong>
            <h3 style={{ color: '#00bfdd' }}>{numberSales}</h3>
          </div>

          <div className="label-block">
            <strong>TOTAL:</strong>
            <h3>{formatPrice(total)}</h3>
          </div>
        </footer>
      </main>
    </Container>
  );
}

export default ListSales;
