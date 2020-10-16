import React from 'react';
import PropTypes from 'prop-types';
import { MdDeleteForever, MdCreate, MdForward, MdReply } from 'react-icons/md';

import { Container, ButttonGoPayment } from './styles';

function BoxItensSale({ button }) {
  const itens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Container>
      <div className="box-top">
        <header>
          <div className="header-box-left">
            <strong>VENDA:</strong>
            <span>#123456</span>
          </div>

          <button type="button">
            <MdDeleteForever size={25} color="#f0f0f0" />
          </button>
        </header>

        <main>
          <ul>
            {itens.map(() => (
              <li>
                <div className="box-item-description">
                  <span>2x #1213312312312</span>
                  <strong>MASS TITANIUM 17500 3kg - MORANGO</strong>
                </div>

                <div className="box-item-price">
                  <span>R$70,00</span>
                  <strong>R$140,00</strong>
                </div>

                <div className="box-item-actions">
                  <button type="button">
                    <MdCreate size={20} color="#333" />
                  </button>

                  <button type="button">
                    <MdDeleteForever size={20} color="#ff0f0f" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>

      <footer>
        <div className="box-subtotal">
          <div className="subtotal-box-left">
            <div className="label-block">
              <strong>SUBTOTAL:</strong>
              <span>R$320,00</span>
            </div>

            <div className="label-block">
              <strong>DESCONTO:</strong>
              <span>0,00%</span>
            </div>
          </div>

          <div className="subtotal-box-right">
            <strong>TOTAL A PAGAR</strong>
            <span>R$320,00</span>
          </div>
        </div>

        {button === 0 ? (
          <ButttonGoPayment type="button" color="#8bc53d" fontSize={25}>
            <MdForward size={40} color="#fff" />
            <strong>RECEBER COMPRA</strong>
          </ButttonGoPayment>
        ) : (
          <ButttonGoPayment type="button" color="#00bfdd" fontSize={18}>
            <MdReply size={40} color="#fff" />
            <strong>CONTINUAR COMPRANDO</strong>
          </ButttonGoPayment>
        )}
      </footer>
    </Container>
  );
}

export default BoxItensSale;

BoxItensSale.propTypes = {
  button: PropTypes.number,
};

BoxItensSale.defaultProps = {
  button: 0,
};
