import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdReceipt } from 'react-icons/md';

import bleed from '../../../assets/sangria.png';
import reinforcement from '../../../assets/reforço.png';
import closure from '../../../assets/fechamento.png';
import operations from '../../../assets/operacoes.png';

import { Container } from './styles';

function Menu({
  handleListSales,
  handleBleed,
  handleReinforcement,
  handleClosure,
  handleOperations,
}) {
  const [click, setCLick] = useState(0);

  const handleClickMenu = useMemo(
    () => (
      <nav>
        <button
          type="button"
          onClick={() => {
            handleListSales();
            setCLick(0);
          }}
          style={{ background: click === 0 ? '#00bfdd' : '#333' }}
        >
          <MdReceipt color="#fff" size={80} />
          <strong className="sales">VENDAS</strong>
        </button>

        <button
          type="button"
          onClick={() => {
            handleBleed();
            setCLick(1);
          }}
          style={{ background: click === 1 ? '#00bfdd' : '#333' }}
        >
          <img src={bleed} alt="bleed" />
          <strong>SANGRIA</strong>
        </button>

        <button
          type="button"
          onClick={() => {
            handleReinforcement();
            setCLick(2);
          }}
          style={{ background: click === 2 ? '#00bfdd' : '#333' }}
        >
          <img src={reinforcement} alt="reinforcement" />
          <strong>REFORÇO</strong>
        </button>

        <button
          type="button"
          onClick={() => {
            handleClosure();
            setCLick(3);
          }}
          style={{ background: click === 3 ? '#00bfdd' : '#333' }}
        >
          <img src={closure} alt="closure" className="img-closure" />
          <strong>FECHAMENTO</strong>
        </button>

        <button
          type="button"
          onClick={() => {
            handleOperations();
            setCLick(4);
          }}
          style={{ background: click === 4 ? '#00bfdd' : '#333' }}
        >
          <img src={operations} alt="operations" />
          <strong>OPERAÇÕES</strong>
        </button>
      </nav>
    ),
    [
      click,
      handleListSales,
      handleBleed,
      handleReinforcement,
      handleClosure,
      handleOperations,
    ]
  );

  return <Container>{handleClickMenu}</Container>;
}

export default Menu;

Menu.propTypes = {
  handleListSales: PropTypes.func,
  handleBleed: PropTypes.func,
  handleReinforcement: PropTypes.func,
  handleClosure: PropTypes.func,
  handleOperations: PropTypes.func,
};

Menu.defaultProps = {
  handleListSales: () => {},
  handleBleed: () => {},
  handleReinforcement: () => {},
  handleClosure: () => {},
  handleOperations: () => {},
};
