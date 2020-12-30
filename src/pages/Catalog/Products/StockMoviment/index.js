/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdClear, MdSwapHoriz } from 'react-icons/md';
import { Input } from '@rocketseat/unform';

import history from '../../../../services/history';

// import { formatPrice } from '../../../../util/format';

import { Modal, Container, Content, Select } from './styles';

function StockMoviment({ location }) {
  const product = location.state ? location.state.product : null;
  console.tron.log(product);

  const [animation, setAnimation] = useState(0);
  const [selectedMoviment, setSelectedMoviment] = useState(0);
  const [amount, setAmount] = useState('');

  const moviments = [
    {
      id: 1,
      name: 'ENTRADA',
    },
    {
      id: 2,
      name: 'SAÍDA',
    },
  ];

  function handleCancel() {
    setAnimation(1);

    setTimeout(() => {
      history.goBack();
    }, 201);
  }

  function handleOk() {
    setAnimation(2);

    setTimeout(() => {
      history.goBack();
    }, 201);
  }

  const renderContainer = useMemo(
    () => (
      <Container poup={animation}>
        <header>
          <div className="box-image">
            <img
              src={
                product.image
                  ? product.image.url
                  : `https://ui-avatars.com/api/?color=ab0000&background=f0f0f0&bold=true&format=svg&size=34&rounded=true&name=${product.description}`
              }
            />
          </div>

          <div className="box-info">
            <strong>{product ? product.description : ''}</strong>
            <span>{product.provider ? product.provider.name : ''}</span>
          </div>
        </header>

        <Content>
          <div className="block">
            <strong>TIPO DE ESTOQUE</strong>
            <span>{product.unit ? product.unit.name : ''}</span>
          </div>

          <div className="block">
            <strong>ESTOQUE MÍNIMO</strong>
            <span>{product.minimum_stock ? product.minimum_stock : '0'}</span>
          </div>

          <div className="block">
            <strong>ESTOQUE ATUAL</strong>
            <span>{product.amount_stock ? product.amount_stock : '0'}</span>
          </div>

          <div className="select-block">
            <strong>MOVIMENTO DE</strong>
            <Select
              value={selectedMoviment}
              options={moviments}
              getOptionValue={(op) => op.id}
              getOptionLabel={(op) => op.name}
              onChange={(value) =>
                setSelectedMoviment({
                  id: value.id,
                  name: value.name,
                })
              }
            />
          </div>

          <div className="block">
            <strong>QUANTIDADE</strong>
            <Input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>

          <div className="block-button">
            <strong>MOVIMENTAR</strong>

            <button type="button" onClick={handleOk}>
              <MdSwapHoriz color="#fff" size={30} />
            </button>
          </div>
        </Content>
      </Container>
    ),
    [animation, selectedMoviment]
  );

  return (
    <Modal>
      <button type="button" className="button-close" onClick={handleCancel}>
        <MdClear color="#fff" size={25} />
      </button>

      {renderContainer}
    </Modal>
  );
}

export default StockMoviment;

StockMoviment.propTypes = {
  location: PropTypes.shape(),
};

StockMoviment.defaultProps = {
  location: null,
};
