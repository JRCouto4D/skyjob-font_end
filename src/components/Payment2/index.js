import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setInstallments } from '../../store/module/sale/actions';

import { Container, Modal, Content, Select } from './styles';

function Payment2({ handleview, handleview2, animation, funcCancel, funcOk }) {
  const [selectedInstallments, setSelectedInstallments] = useState({
    installments: 1,
    label: '1X',
  });

  const dispatch = useDispatch();

  const installments = [
    {
      installments: 1,
      label: '1X',
    },
    {
      installments: 2,
      label: '2X',
    },
    {
      installments: 3,
      label: '3X',
    },
  ];

  function setToInstallments() {
    dispatch(setInstallments(selectedInstallments));
  }

  return (
    <Modal>
      <Container poup={animation}>
        <Content>
          <header>
            <h2>PAGAMENTO COM CARTÃO DE CRÉDITO</h2>
          </header>

          <main>
            <strong>NUMERO DE PARCELAS</strong>

            <Select
              value={selectedInstallments}
              options={installments}
              getOptionValue={(op) => op.installments}
              getOptionLabel={(op) => op.label}
              onChange={(value) => {
                setSelectedInstallments({
                  installments: value.installments,
                  label: value.label,
                });
              }}
            />
          </main>

          <footer>
            <button
              type="button"
              className="button-cancel"
              onClick={() => {
                funcCancel();
                setTimeout(() => {
                  handleview();
                }, 201);
              }}
            >
              CANCELAR
            </button>
            <button
              type="button"
              className="button-ok"
              onClick={() => {
                funcOk();
                setToInstallments();
                setTimeout(() => {
                  handleview2();
                }, 201);
              }}
            >
              OK
            </button>
          </footer>
        </Content>
      </Container>
    </Modal>
  );
}

export default Payment2;

Payment2.propTypes = {
  handleview: PropTypes.func,
  handleview2: PropTypes.func,
  animation: PropTypes.number,
  funcCancel: PropTypes.func,
  funcOk: PropTypes.func,
};

Payment2.defaultProps = {
  handleview: () => {},
  handleview2: () => {},
  animation: 0,
  funcCancel: () => {},
  funcOk: () => {},
};
