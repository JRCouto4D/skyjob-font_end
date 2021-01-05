import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdPrint } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import InputImg from './ImageInput';

import api from '../../../../services/api';
import history from '../../../../services/history';

import {
  Container,
  Content,
  Header,
  InputBlock,
  Loading,
  Select,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('* O nome do funcionário é obrigatório.'),
  email: Yup.string()
    .email('* Preencha o campo com um email válido.')
    .required('* O email é obrigatorio.'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 digitos')
    .required('* A senha é obrigatória.'),
  confirmPassword: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 digitos')
    .required('* A confirmação da senha é obrigatória.'),
  avatar_id: Yup.number(),
});

const schema2 = Yup.object().shape({
  name: Yup.string().required('* O nome do funcionário é obrigatório.'),
  email: Yup.string()
    .email('* Preencha o campo com um email válido.')
    .required('* O email é obrigatorio.'),
  password: Yup.string(),
  confirmPassword: Yup.string(),
  avatar_id: Yup.number(),
});

function EmployeeForm({ location }) {
  const { company } = useSelector((state) => state.user.profile);

  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selecteLevel, setSelecteLevel] = useState(
    location.state
      ? {
          id: location.state.employee.access_level,
          label: `NÍVEL ${location.state.employee.access_level}`,
        }
      : null
  );
  const level = [
    {
      id: 1,
      label: 'NÍVEL 1',
    },
    {
      id: 2,
      label: 'NÍVEL 2',
    },
  ];

  function handleCancel() {
    const input = document.getElementById('name');
    input.value = '';

    const input2 = document.getElementById('email');
    input2.value = '';

    const input3 = document.getElementById('password');
    input3.value = '';

    const input4 = document.getElementById('confirmPassword');
    input4.value = '';

    setSelecteLevel(null);
  }

  async function handleSubmit(data) {
    setLoading(true);

    if (!location.state) {
      const response = await api.get(`/users/company/${company.id}`);
      const { users } = response.data;

      const checkEmail = users.filter((user) => user.email === data.email);

      if (checkEmail.length >= 1) {
        toast.error('Este email já está registrado no sistema');
        setError(1);

        const input = document.getElementById('email');
        input.focus();
        setLoading(false);
        return;
      }
    }

    if (selecteLevel === null) {
      toast.error('O nível de acesso do funcionário é obrigatótio');
      setError(2);
      setLoading(false);
      return;
    }

    if (!location.state && data.password !== data.confirmPassword) {
      setError(3);
      const input = document.getElementById('password');
      input.focus();

      toast.error('As senhas não correspondem.');
      setLoading(false);
      return;
    }

    const dataPreview = location.state
      ? {
          name: data.name,
          email: data.email,
          access_level: selecteLevel.id,
          avatar_id: data.avatar_id,
        }
      : {
          name: data.name,
          email: data.email,
          password: data.password,
          access_level: selecteLevel.id,
          avatar_id: data.avatar_id,
        };

    if (location.state) {
      try {
        const { employee } = location.state;
        await api.put(`/users/${employee.id}/update`, dataPreview);

        toast.success('O funcionário foi editado com sucesso.');
        setLoading(false);
        history.push('/employees');
      } catch (err) {
        toast.error(
          'Algo deu errado e o funcionário não foi editado. Tente mais tarde'
        );
        setLoading(false);
        setError(0);
      }
    } else {
      try {
        await api.post('/users', dataPreview);

        toast.success('O funcionário foi registrado com sucesso.');
        setLoading(false);
        history.push('/employees');
      } catch (err) {
        toast.error(
          'Algo deu errado e o funcionário não foi registrado. Tente mais tarde'
        );
        setLoading(false);
        setError(0);
      }
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <div className="header-box-left">
            <h1>CADASTRO DE FUNCIONÁRIOS</h1>
            <div className="header-navigation">
              <Link to="/employees">funcionários</Link>
              <strong>/ cadastro</strong>
            </div>
          </div>

          <button type="button" onClick={() => {}}>
            <MdPrint color="#999" size={20} />
            <strong>IMPRIMIR</strong>
          </button>
        </Header>

        <Form
          initialData={location.state && location.state.employee}
          schema={location.state ? schema2 : schema}
          onSubmit={handleSubmit}
        >
          <div className="form-content">
            <div className="box-img">
              <InputImg />
            </div>
            <div className="box-form">
              <div
                style={{
                  width: '100%',
                }}
              >
                <InputBlock>
                  <strong>NOME</strong>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="none"
                  />
                </InputBlock>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridColumnGap: '20px',
                  }}
                >
                  <InputBlock>
                    {error === 1 ? (
                      <strong style={{ color: '#FF1E40' }}>* EMAIL</strong>
                    ) : (
                      <strong>EMAIL</strong>
                    )}
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="none"
                    />
                  </InputBlock>

                  <InputBlock>
                    {error === 2 ? (
                      <strong style={{ color: '#FF1E40' }}>
                        * NÍVEL DE ACESSO
                      </strong>
                    ) : (
                      <strong>NÍVEL DE ACESSO</strong>
                    )}

                    <Select
                      id="level"
                      name="lavel"
                      value={selecteLevel}
                      options={level}
                      getOptionValue={(op) => op.id}
                      getOptionLabel={(op) => op.label}
                      onChange={(value) => {
                        setSelecteLevel({
                          id: value.id,
                          label: value.label,
                        });
                      }}
                    />
                  </InputBlock>
                </div>
              </div>

              <div
                style={{
                  width: '100%',
                  marginTop: 36,
                }}
              >
                <InputBlock>
                  {error === 3 ? (
                    <strong style={{ color: '#FF1E40' }}>* SENHA</strong>
                  ) : (
                    <strong>SENHA</strong>
                  )}
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    autoCapitalize="off"
                    autoComplete="off"
                  />
                </InputBlock>

                <InputBlock>
                  {error === 3 ? (
                    <strong style={{ color: '#FF1E40' }}>
                      * CONFIRMAÇÃO DE SENHA
                    </strong>
                  ) : (
                    <strong>CONFIRMAÇÃO DE SENHA</strong>
                  )}
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    autoCapitalize="off"
                    autoComplete="off"
                  />
                </InputBlock>
              </div>
            </div>
          </div>

          <div className="box-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>

            <button type="submit" className="submit-button">
              {loading ? (
                <Loading>
                  <FaSpinner color="#fff" size={18} />
                </Loading>
              ) : (
                <strong>SALVAR</strong>
              )}
            </button>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

export default EmployeeForm;

EmployeeForm.propTypes = {
  location: PropTypes.shape(),
};

EmployeeForm.defaultProps = {
  location: null,
};
