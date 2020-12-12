import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MdClear } from 'react-icons/md';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import history from '../../../../services/history';
import api from '../../../../services/api';

import { Modal, Container } from './styles';

function SetSale() {
  const [sale_id, setSale_id] = useState('');
  const [animation, setAnimation] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const inputSetSale = document.getElementById('id_sale');
    inputSetSale.focus();
  }, []);

  const handleCancel = useCallback(() => {
    setAnimation(1);
    setTimeout(() => {
      history.goBack();
    }, 201);
  }, []);

  const handleSubmit = useCallback(() => {
    async function loadDataSale() {
      try {
        let response = null;

        if (sale_id === '') {
          setError(true);
          const input = document.getElementById('id_sale');
          input.style.borderColor = '#ff1e40';
          input.focus();

          toast.error('Informe o código da venda.');
          return;
        }

        response = await api.get(`/search/sale/${sale_id}`);

        const dataSale = response.data;

        response = await api.get(`/sale/${dataSale.id}/itens/list`);

        const dataItens = response.data;

        if (dataSale === null || dataItens.length <= 0) {
          toast.error('Código inválido.');
          setSale_id('');

          setError(true);
          const input = document.getElementById('id_sale');
          input.style.borderColor = '#ff1e40';
          input.focus();
          return;
        }

        setAnimation(2);
        setTimeout(() => {
          history.push('/returns', { dataSale, dataItens });
        }, 201);
      } catch (err) {
        toast.error(
          `Algo deu errado e não foi possível carregar os dados da venda.\n\n## ERRO: ${err} ##`
        );
        setSale_id('');
      }
    }

    loadDataSale();
  }, [sale_id]);

  const renderContainer = useMemo(
    () => (
      <Container poup={animation}>
        {error ? (
          <strong style={{ color: '#ff1e40' }}>CÓDIGO DA VENDA *</strong>
        ) : (
          <strong>CÓDIGO DA VENDA</strong>
        )}
        <Input
          type="text"
          id="id_sale"
          name="id_sale"
          value={sale_id}
          onChange={(e) => {
            setError(false);
            setSale_id(e.target.value);

            const input = document.getElementById('id_sale');
            input.style.borderColor = '#aaa';
          }}
          onKeyPress={(e) => {
            const key = e.which || e.keyCode;

            if (key === 13) {
              handleSubmit();
            }
          }}
        />

        <div className="box-button">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            CANCELAR
          </button>
          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
          >
            OK
          </button>
        </div>
      </Container>
    ),
    [sale_id, error, animation, handleCancel, handleSubmit]
  );

  return (
    <Modal>
      <button type="button" onClick={handleCancel}>
        <MdClear size={25} color="#fff" />
      </button>

      {renderContainer}
    </Modal>
  );
}

export default SetSale;
