import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useSelector } from 'react-redux';
import { MdSwapHoriz, MdSettings } from 'react-icons/md';

import logo from '../../assets/logo3.png';

import {
  Container,
  BoxLeft,
  BoxActions,
  BoxRight,
  GoSell,
  GoOperations,
} from './styles';

function BoxPointSale({ children, poup }) {
  const { pdv } = useSelector((state) => state.statusPDV);

  return (
    <Container>
      <BoxLeft>
        <div>
          <img src={logo} alt="logo" />

          <div className="box-date">
            <strong>
              {format(new Date(), 'iiii', {
                locale: pt,
              }).toUpperCase()}
            </strong>

            <span>{format(new Date(), 'dd/MM/yyyy')}</span>
          </div>

          <div className="info-block">
            <strong>VENDEDOR</strong>
            <span>{pdv ? pdv.user.name.toUpperCase() : ''}</span>
          </div>

          <div className="info-block">
            <strong>PDV</strong>
            <span>
              {pdv ? pdv.cash_register.description.toUpperCase() : ''}
            </span>
          </div>
        </div>

        <BoxActions>
          <GoSell to="/pdv" color={poup ? '#ab0000' : '#333'}>
            <MdSwapHoriz size={50} color="#fff" />
            <strong>VENDER</strong>
          </GoSell>

          <GoOperations to="/operations" color={poup ? '#333' : '#ab0000'}>
            <MdSettings size={50} color="#fff" />
            <strong>OPERAÇÕES</strong>
          </GoOperations>
        </BoxActions>
      </BoxLeft>

      <BoxRight>{children}</BoxRight>
    </Container>
  );
}

export default BoxPointSale;

BoxPointSale.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

BoxPointSale.defaultProps = {
  children: null,
};

BoxPointSale.propTypes = {
  poup: PropTypes.bool,
};

BoxPointSale.defaultProps = {
  poup: true,
};
