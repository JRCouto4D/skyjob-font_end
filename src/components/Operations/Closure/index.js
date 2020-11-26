import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { MdForward } from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { formatPrice } from '../../../util/format';

import api from '../../../services/api';

import { pdvClosureRequest } from '../../../store/module/statusPDV/actions';

import { Container, Content, Loading } from './styles';

function Closure() {
  const { pdv, loading } = useSelector((state) => state.statusPDV);
  const { company } = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [inCash, setInCash] = useState({ number: 0, total: 0 });
  const [credit, setCredit] = useState({ number: 0, total: 0 });
  const [debit, setDebit] = useState({ number: 0, total: 0 });
  const [dataPdv, setDataPdv] = useState(null);
  const [pdvLoading, setPdvLoading] = useState(false);

  useEffect(() => {
    async function loadPdv() {
      try {
        if (pdv) {
          setPdvLoading(true);

          const response = await api.get(`/point_sales/${pdv.id}`);

          setDataPdv(response.data);

          setPdvLoading(false);
        }
      } catch (err) {
        toast.error(
          `Algo deu errado e não foi possível carregar todas as informações relacionadas ao PDV. ERRO: ${err}`
        );
        setPdvLoading(false);
      }
    }

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
        if (pdv) {
          const response = await api.get(`point_sales/${pdv.id}/sales-list`);
          setTotal(response.data.total);
          setInCash(calcTotalSales(response.data.sales, 1));
          setCredit(calcTotalSales(response.data.sales, 2));
          setDebit(calcTotalSales(response.data.sales, 3));
        }
      } catch (err) {
        toast.error(`ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE`);
      }
    }

    loadSales();
    loadPdv();
  }, [pdv]);

  async function handleClosure() {
    confirmAlert({
      title: 'FECHAMENTO DO PDV',
      message: `DESEJA REALMENTE FECHAR O PONTO DE VENDA #${pdv.id}?`,
      buttons: [
        {
          label: 'SIM',
          onClick: async () => {
            const data = {
              pdv_id: pdv.id,
              company_id: company.id,
            };

            dispatch(pdvClosureRequest(data));
          },
        },
        {
          label: 'NÃO',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <Container>
      {pdvLoading ? (
        <Content>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '658px',
              height: '100%',
            }}
          >
            <Loading>
              <FaSpinner color="#ab0000" size={25} />
            </Loading>
          </div>
        </Content>
      ) : (
        <Content>
          <header>
            <div className="box-left">
              <strong>{pdv ? `PDV: #${pdv.id}` : 'PDV: ???'}</strong>

              <div style={{ marginTop: 10 }}>
                <div className="box-label">
                  <strong>VALOR INICIAL:</strong>
                  <span>
                    ${dataPdv ? formatPrice(dataPdv.initial_value) : '???'}
                  </span>
                </div>

                <div className="box-label">
                  <strong>TOTAL DE VENDAS:</strong>
                  <span>{total}</span>
                </div>
              </div>
            </div>

            <div className="box-right">
              <strong>VALOR EM CAIXA</strong>
              <span>
                {dataPdv
                  ? formatPrice(dataPdv.initial_value + dataPdv.flow_value)
                  : `???`}
              </span>
            </div>
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
