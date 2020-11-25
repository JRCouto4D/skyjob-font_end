import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { MdForward } from 'react-icons/md';

import { formatPrice } from '../../../util/format';

import { Container, Content, Loading } from './styles';

function Closure() {
  const { pdv } = useSelector((state) => state.statusPDV);

  const [loading, setLoading] = useState(false);

  async function handleClosure() {
    setLoading(!loading);
  }

  return (
    <Container>
      <Content>
        <header>
          <strong style={{ color: '#ccc' }}>{`PDV: #${pdv.id}`}</strong>
          <strong>{`TOTAL DE VENDAS: ${16}`}</strong>
        </header>

        <div className="box-main">
          <div className="label-block">
            <strong>PAGAMENTOS EM DINHEIRO</strong>
            <span>{`TOTAL: ${formatPrice(510)}`}</span>
          </div>

          <div className="label-block">
            <strong>PAGAMENTOS COM CATÃO DE CRÉDITO</strong>
            <span>{`TOTAL: ${formatPrice(811.5)}`}</span>
          </div>

          <div className="label-block">
            <strong>PAGAMENTOS COM CATÃO DE DÉBITO</strong>
            <span>{`TOTAL: ${formatPrice(214)}`}</span>
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
    </Container>
  );
}

export default Closure;
