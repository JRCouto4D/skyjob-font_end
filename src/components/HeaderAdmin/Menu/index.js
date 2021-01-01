import React from 'react';
import PropTypes from 'prop-types';
import {
  MdHome,
  MdPermContactCalendar,
  MdDescription,
  MdExitToApp,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../../store/module/auth/actions';

import history from '../../../services/history';

import { Content } from './styles';

function Menu({ animation, view, close }) {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  return (
    <Content poup={animation} view={view}>
      <div className="box-topo">
        <div className="box-user">
          <div className="box-img">
            <img
              src={
                profile && profile.avatar
                  ? profile.avatar.url
                  : `https://ui-avatars.com/api/?color=40e0d0&background=fff&bold=true&format=svg&size=34&rounded=true&name=${profile.description}`
              }
              alt={profile ? profile.description : ''}
            />
          </div>
          <div className="box-info">
            <strong>{profile ? profile.description.toUpperCase() : ''}</strong>
            <span>{profile ? profile.email : ''}</span>
          </div>
        </div>

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
      </div>

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
