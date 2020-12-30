/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MdClear, MdSwapHoriz } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { lighten } from 'polished';

import history from '../../../../services/history';

import api from '../../../../services/api';

import { Modal, Container, Content, Select } from './styles';

function StockMoviment({ location }) {
  const product = location.state ? location.state.product : null;
  console.tron.log(product);

  const [animation, setAnimation] = useState(0);
  const [selectedMoviment, setSelectedMoviment] = useState(0);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(0);

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

  const handleOk = useCallback(() => {
    async function movimentStock() {
      try {
        await api.put(`/moviment_stock/product/${product.id}`, {
          moviment: selectedMoviment.id,
          amount: Number(amount),
        });

        toast.success('O estoque do produto foi movimentado.');
        setAmount('');
        setError(0);
        setSelectedMoviment(0);
        history.goBack();
      } catch (err) {
        toast.error('Algo deu errado e não possível movimentar o estoque.');
        setAmount('');
        setError(0);
        setSelectedMoviment(0);
        history.goBack();
      }
    }

    if (selectedMoviment === 0) {
      setError(1);

      toast.error('Informe o movimento no estoque.');
      return;
    }

    if (amount === '' || amount === 0) {
      setError(2);
      const input = document.getElementById('amount');
      input.focus();
      input.style.borderColor = '#FF1E40';
      input.style.background = lighten(0.4, '#FF1E40');

      toast.error('A quantidade a movimentar no estoque é obrigatória.');
      return;
    }

    if (selectedMoviment.id === 2 && product.amount_stock < amount) {
      setError(2);
      const input = document.getElementById('amount');
      input.focus();
      input.style.borderColor = '#FF1E40';
      input.style.background = lighten(0.4, '#FF1E40');

      toast.error(
        'A quantidade do movimento de saída é maior que a quantidade em estoque.'
      );
      return;
    }

    setAnimation(2);

    setTimeout(() => {
      movimentStock();
    }, 201);
  }, [amount, product, selectedMoviment]);

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
            {error === 1 ? (
              <strong style={{ color: '#FF1E40' }}>* MOVIMENTO DE</strong>
            ) : (
              <strong>MOVIMENTO DE</strong>
            )}
            <Select
              value={selectedMoviment}
              options={moviments}
              getOptionValue={(op) => op.id}
              getOptionLabel={(op) => op.name}
              onChange={(value) => {
                setSelectedMoviment({
                  id: value.id,
                  name: value.name,
                });
                setError(0);
                const input = document.getElementById('amount');
                input.focus();
                input.style.borderColor = '#ddd';
                input.style.background = 'none';
              }}
            />
          </div>

          <div className="block">
            {error === 2 ? (
              <strong style={{ color: '#FF1E40' }}>* QUANTIDADE</strong>
            ) : (
              <strong>QUANTIDADE</strong>
            )}
            <Input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => {
                setError(0);
                setAmount(e.target.value);
                const input = document.getElementById('amount');

                input.style.borderColor = '#ddd';
                input.style.background = 'none';
              }}
              onKeyPress={(e) => {
                const key = e.which || e.keyCode;

                if (key === 13) {
                  handleOk();
                }
              }}
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
    [animation, selectedMoviment, amount, error, handleOk, moviments, product]
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
