import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import {
  MdFilterList,
  MdPrint,
  MdFastRewind,
  MdFastForward,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import history from '../../../../services/history';
import api from '../../../../services/api';

import { formatPrice } from '../../../../util/format';

import { Container, Content, Body, BoxNavigation, Loading } from './styles';

function ListReturns() {
  const { company } = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [prePage, setPrePage] = useState(0);
  const [total, setTotal] = useState(3);
  const [returns, setReturns] = useState([]);

  const loadReturns = useCallback(() => {
    async function load() {
      setLoading(true);

      const response = await api.get(`company/${company.id}/returns/list`, {
        params: {
          page,
        },
      });

      setReturns(response.data.returns);
      setTotal(response.data.total);
      setPrePage(Math.ceil(response.data.total / 8));
      setLoading(false);
    }
    load();
  }, [page, company]);

  useEffect(() => {
    loadReturns();
  }, [loadReturns]);

  function nextPage() {
    setPrePage(Math.ceil(total / 5));
    setPage(page < prePage ? page + 1 : page);

    loadReturns();
  }

  function prevPage() {
    setPage(page >= 2 ? page - 1 : page);

    loadReturns();
  }

  const tableMemo = useMemo(
    () => (
      <ul>
        <li className="table-header">
          <strong>#ID</strong>
          <strong>DATA DE DEVOLUÇÃO</strong>
          <strong>DATA DA VENDA</strong>
          <strong>R$ TOTAL</strong>
          <strong>AUTORIZAÇÃO</strong>
        </li>
        {returns.length >= 1 ? (
          returns.map((rt) => (
            <div className="item-table">
              <li>
                <span>{rt.sale ? `#${rt.sale.id}` : ''}</span>
                <span>
                  {rt ? format(parseISO(rt.createdAt), 'dd/MM/yyyy') : ''}
                </span>
                <span>
                  {rt.sale
                    ? format(parseISO(rt.sale.complete_at), 'dd/MM/yyyy')
                    : ''}
                </span>
                <span>{rt.sale ? formatPrice(rt.sale.total) : ''}</span>
                <span>{rt.authorized ? rt.authorized.name : ''}</span>
              </li>
            </div>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '320px',
              background: 'rgba(0, 0, 0, 0.05)',
            }}
          >
            <h1>NENHUM RESULTADO</h1>
          </div>
        )}
      </ul>
    ),
    [returns]
  );

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
              onClick={() => history.push('/returns/setsale')}
              className="new-return-button"
            >
              <span>NOVA</span>
              <strong>DEVOLUÇÃO</strong>
            </button>
          </div>
        </header>

        <BoxNavigation>
          <div className="box-pagination">
            <button type="button" onClick={prevPage} disabled={page === 1}>
              <MdFastRewind color="#fff" size={20} />
            </button>
            <strong>{`${page} de ${prePage}`}</strong>
            <button type="button" onClick={nextPage} disabled={page >= prePage}>
              <MdFastForward color="#fff" size={20} />
            </button>
          </div>

          <button type="button" className="print-button" onClick={() => {}}>
            <MdPrint color="#333" size={20} />
            <strong>IMPRIMIR</strong>
          </button>
        </BoxNavigation>

        <Body>
          {loading ? (
            <Loading>
              <FaSpinner size={25} color="#ccc" />
            </Loading>
          ) : (
            tableMemo
          )}
        </Body>
      </Content>
    </Container>
  );
}

export default ListReturns;
