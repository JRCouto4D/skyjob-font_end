import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { MdForward } from 'react-icons/md';
import { toast } from 'react-toastify';

import { formatPrice } from '../../../util/format';

import api from '../../../services/api';

import { Container, Content, Loading } from './styles';

function Closure() {
  const { pdv } = useSelector((state) => state.statusPDV);

  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [inCash, setInCash] = useState({ number: 0, total: 0 });
  const [credit, setCredit] = useState({ number: 0, total: 0 });
  const [debit, setDebit] = useState({ number: 0, total: 0 });

  useEffect(() => {
    function calcTotalSales(data = [], type = 1) {
      const dataSale = data.filter((sale) => sale.payment === type);
      const dataTotal = dataSale.map((sale) => sale.total);

      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      return {
        number: dataSale.length,
        total: dataTotal.reduce(reducer, 0),
      };
    }

    async function loadSales() {
      try {
        const response = await api.get(`point_sales/${pdv.id}/sales-list`);
        setTotal(response.data.total);
        setInCash(calcTotalSales(response.data.sales, 1));
        setCredit(calcTotalSales(response.data.sales, 2));
        setDebit(calcTotalSales(response.data.sales, 3));
      } catch (err) {
        toast.error(`ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE`);
      }
    }

    loadSales();
  }, [pdv]);

  async function handleClosure() {
    setLoading(!loading);
  }

  return (
    <Container>
      {pdv && total !== 0 && (
        <Content>
          <header>
            <strong style={{ color: '#ccc' }}>{`PDV: #${pdv.id}`}</strong>
            <strong>{`TOTAL DE VENDAS: ${total}`}</strong>
          </header>

          <div className="box-main">
            <div className="label-block">
              <div className="top-label-block">
                <strong>PAGAMENTOS EM DINHEIRO</strong>
                <span>{`(${inCash.number})`}</span>
              </div>
              <span>{`TOTAL: ${formatPrice(inCash.total)}`}</span>
            </div>

            <div className="label-block">
              <div className="top-label-block">
                <strong>PAGAMENTOS COM CATÃO DE CRÉDITO</strong>
                <span>{`(${credit.number})`}</span>
              </div>
              <span>{`TOTAL: ${formatPrice(credit.total)}`}</span>
            </div>

            <div className="label-block">
              <div className="top-label-block">
                <strong>PAGAMENTOS COM CATÃO DE DÉBITO</strong>
                <span>{`(${debit.number})`}</span>
              </div>
              <span>{`TOTAL: ${formatPrice(debit.total)}`}</span>
            </div>
          </div>

          <button type="button" onClick={handleClosure}>
            {loading ? (
              <Loading>
                <FaSpinner color="#fff" size={20} />
              </Loading>
            ) : (
              <>
                <MdForward color="#fff" size={45} />
                <strong>CONFIMER FECHAMENTO</strong>
              </>
            )}
          </button>
        </Content>
      )}
    </Container>
  );
}

export default Closure;
