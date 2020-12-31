import React from 'react';
import PropTypes from 'prop-types';
import {
  MdHome,
  MdPermContactCalendar,
  MdDescription,
  MdExitToApp,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { signOut } from '../../../store/module/auth/actions';

import history from '../../../services/history';

import { Content } from './styles';

function Menu({ animation, view, close }) {
  const dispatch = useDispatch();

  return (
    <Content poup={animation} view={view}>
      <nav>
        <button
          type="button"
          onClick={() => {
            close();
            history.push('/main');
          }}
        >
          <MdHome color="#f0f0f0" size={20} />
          <strong>INÍCIO</strong>
        </button>

        <button
          type="button"
          onClick={() => {
            close();
            history.push('/admin/customers');
          }}
        >
          <MdPermContactCalendar color="#f0f0f0" size={20} />
          <strong>CLIENTES</strong>
        </button>

        <button
          type="button"
          onClick={() => {
            close();
            history.push('/contracts');
          }}
        >
          <MdDescription color="#f0f0f0" size={20} />
          <strong>CONTRATOS</strong>
        </button>
      </nav>

      <button type="button" onClick={() => dispatch(signOut())}>
        <MdExitToApp color="#f0f0f0" size={25} />
        <strong>Sair</strong>
      </button>
    </Content>
  );
}

export default Menu;

Menu.propTypes = {
  animation: PropTypes.number,
  view: PropTypes.bool,
  close: PropTypes.func,
};

Menu.defaultProps = {
  animation: 0,
  view: false,
  close: () => {},
};
