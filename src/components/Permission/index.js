import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { MdClear } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import history from '../../services/history';
import api from '../../services/api';

import { Modal, Container, Select, Loading } from './styles';

function Permission({ viewPermission, dataSale }) {
  const { company } = useSelector((state) => state.user.profile);

  const [animation, setAnimation] = useState(0);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(0);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const response = await api.get('/search/users', {
          params: {
            company_id: company.id,
          },
        });
        setUsers(response.data);
      } catch (err) {
        toast.error(
          'Algo deu errado e não foi possível carregar a lista de gerentes do sistema.'
        );
      }
    }

    load();
  }, [company]);

  const handleCancel = useCallback(() => {
    setAnimation(1);
    setTimeout(() => {
      setPassword('');
      setSelectedUser(null);
      viewPermission();
    }, 201);
  }, [viewPermission]);

  const handleSubmit = useCallback(() => {
    async function goSubmit() {
      try {
        setLoading(true);

        if (selectedUser === null && password !== '') {
          toast.error('O gerente é importante');
          setError(1);
          setLoading(false);
          return;
        }

        if (password === '' && selectedUser !== null) {
          toast.error('A senha do gerente é importante');
          setError(2);

          const input = document.getElementById('password');
          input.style.borderColor = '#ff1e40';
          setLoading(false);
          return;
        }

        if (password === '' && selectedUser === null) {
          toast.error('O gerente e a senha são importantes');
          setError(3);
          const input = document.getElementById('password');
          input.style.borderColor = '#ff1e40';
          setLoading(false);
          return;
        }

        await api.get('/permission', {
          params: {
            user_id: selectedUser.id,
            password,
          },
        });

        await api.post(
          `/point_sales/${dataSale.pdv}/return/sales/${dataSale.id}`,
          {
            authorized_id: selectedUser.id,
          }
        );
        setLoading(false);
        history.push('/returns/list');
        toast.success('A devolução foi completa com sucesso!!');
      } catch (err) {
        toast.error(
          `Algo deu errado e não foi possível completar esta operação.`
        );
        viewPermission();
      }
    }

    goSubmit();
  }, [dataSale, password, selectedUser, viewPermission]);

  const renderContainer = useMemo(
    () => (
      <Container poup={animation}>
        <div className="box-select">
          {error === 1 || error === 3 ? (
            <strong style={{ color: '#ff1e40' }}>GERENTE *</strong>
          ) : (
            <strong>GERENTE</strong>
          )}
          <Select
            value={selectedUser}
            options={users}
            getOptionValue={(op) => op.id}
            getOptionLabel={(op) => op.name}
            onChange={(value) => {
              setSelectedUser({
                id: value.id,
                name: value.name,
              });
              if (error === 3) {
                setError(2);
              } else {
                setError(0);
              }
              const input = document.getElementById('password');
              input.focus();
            }}
          />
        </div>

        {error === 2 || error === 3 ? (
          <strong style={{ color: '#ff1e40' }}>SENHA *</strong>
        ) : (
          <strong>SENHA</strong>
        )}
        <Input
          type="password"
          id="password"
          name="password"
          autoCapitalize="off"
          autoComplete="off"
          value={password}
          onChange={(e) => {
            if (error === 3) {
              setError(1);
            } else {
              setError(0);
            }

            setPassword(e.target.value);

            const input = document.getElementById('password');
            input.style.borderColor = '#aaa';
            input.style.background = `rgba(255, 255, 255, 0.5)`;
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
            {loading ? (
              <Loading>
                <FaSpinner size={18} color="#ddd" />
              </Loading>
            ) : (
              <strong>OK</strong>
            )}
          </button>
        </div>
      </Container>
    ),
    [
      loading,
      selectedUser,
      users,
      password,
      error,
      animation,
      handleCancel,
      handleSubmit,
    ]
  );

  return (
    <Modal>
      <button type="button" onClick={() => {}}>
        <MdClear size={25} color="#fff" />
      </button>

      {renderContainer}
    </Modal>
  );
}

export default Permission;

Permission.propTypes = {
  viewPermission: PropTypes.func.isRequired,
  dataSale: PropTypes.func.isRequired,
};

Permission.defaulProps = {
  viewPermission: () => {},
  dataSale: null,
};
