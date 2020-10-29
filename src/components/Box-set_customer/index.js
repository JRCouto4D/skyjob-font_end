import React from 'react';
import PropTypes from 'prop-types';

import { Container, Modal } from './styles';

function BoxSetCustomer({ handleInfoFalse, animation, setAnimation }) {
  return (
    <Modal>
      <Container poup={animation}>
        <h1>Box set customer</h1>
        <button
          type="button"
          onClick={() => {
            setAnimation();
            setTimeout(() => {
              handleInfoFalse();
            }, 201);
          }}
        >
          CANCELAR
        </button>
      </Container>
    </Modal>
  );
}

export default BoxSetCustomer;

BoxSetCustomer.propTypes = {
  handleInfoFalse: PropTypes.func,
  animation: PropTypes.number,
  setAnimation: PropTypes.func,
};

BoxSetCustomer.defaultProps = {
  handleInfoFalse: () => {},
  animation: 0,
  setAnimation: () => {},
};
