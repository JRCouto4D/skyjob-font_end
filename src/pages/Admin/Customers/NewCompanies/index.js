import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdPrint } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import InputImg from './ImageInput';

import api from '../../../../services/api';
import history from '../../../../services/history';

import { Container, Content, Header, InputBlock, Loading } from './styles';

const schema = Yup.object().shape({
  description: Yup.string().required('* O nome do cliente é obrigatório.'),
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
  description: Yup.string().required('* O nome do cliente é obrigatório.'),
  email: Yup.string()
    .email('* Preencha o campo com um email válido.')
    .required('* O email é obrigatorio.'),
  password: Yup.string(),
  confirmPassword: Yup.string(),
  avatar_id: Yup.number(),
});

function NewCompanies({ location }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCancelContract, setLoadingCancelContract] = useState(false);

  function handleCancel() {
    const input = document.getElementById('description');
    input.value = '';
    input.focus();

    const input2 = document.getElementById('email');
    input2.value = '';

    const input3 = document.getElementById('password');
    input3.value = '';

    const input4 = document.getElementById('confirmPassword');
    input4.value = '';
  }

  async function handleSubmit(data) {
    setError(false);
    if (!location.state && data.password !== data.confirmPassword) {
      setError(true);
      const input = document.getElementById('password');
      input.focus();

      toast.error('As senhas não correspondem.');
      return;
    }

    const previewData = location.state
      ? {
          description: data.description,
          email: data.email,
          avatar_id: data.avatar_id,
        }
      : {
          description: data.description,
          email: data.email,
          password: data.password,
          avatar_id: data.avatar_id,
        };

    if (location.state) {
      const { customer } = location.state;

      try {
        setLoading(true);

        await api.put(`/skyjob/companies/${customer.id}`, previewData);
        handleCancel();
        toast.success('Cliente Editado com sucesso!');
        history.push('/admin/customers');
      } catch (err) {
        toast.error(
          'Algo deu errado e o cliente não foi editado. Tente mais tarde.'
        );
        handleCancel();
      }
    } else {
      try {
        setLoading(true);

        await api.post(`/skyjob/companies`, previewData);
        handleCancel();
        toast.success('Cliente cadastrado com sucesso!');
        history.push('/admin/customers');
      } catch (err) {
        toast.error(
          'Algo deu errado e o cliente não foi cadastrado. Tente mais tarde.'
        );
        handleCancel();
      }
    }
  }

  async function cancelToContract() {
    confirmAlert({
      title: 'CANCELAR CONTRATO',
      message: 'Deseja realmente cancelar este contrato?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            try {
              if (location.state) {
                const { contract } = location.state.customer;
                setLoadingCancelContract(true);

                if (contract.status) {
                  await api.put(`/skyjob/contracts/${contract.id}/cancel`);

                  toast.success('O contrato foi cancelado com sucesso.');
                }

                setLoadingCancelContract(false);
                history.goBack();
              }
            } catch (err) {
              toast.error(
                'Algo deu errado e não foi possível cancelar o contrato'
              );
              setLoadingCancelContract(false);
            }
          },
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <Header>
          <div className="header-box-left">
            <h1>CADASTRO DE CLIENTES</h1>
            <div className="header-navigation">
              <Link to="/admin/customers">clientes</Link>
              <strong>/ cadastro</strong>
            </div>
          </div>

          <button type="button" onClick={() => {}}>
            <MdPrint color="#999" size={20} />
            <strong>IMPRIMIR</strong>
          </button>
        </Header>

        <Form
          initialData={location.state && location.state.customer}
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
                    id="description"
                    name="description"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="none"
                  />
                </InputBlock>

                <InputBlock>
                  <strong>EMAIL</strong>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="none"
                  />
                </InputBlock>
              </div>

              <div
                style={{
                  width: '100%',
                  marginTop: 36,
                }}
              >
                <InputBlock>
                  {error ? (
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
                  {error ? (
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
            <div className="box-buttons-left">
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

            {location.state &&
            location.state.customer.contract &&
            location.state.customer.contract.status ? (
              <button
                type="button"
                className="cancel-contract-button"
                onClick={cancelToContract}
              >
                {loadingCancelContract ? (
                  <Loading>
                    <FaSpinner color="#fff" size={18} />
                  </Loading>
                ) : (
                  <strong>CANCELAR CONTRATO</strong>
                )}
              </button>
            ) : (
              location.state && (
                <button
                  type="button"
                  className="new-contract-button"
                  onClick={() =>
                    history.push('/contracts', {
                      customer: location.state.customer,
                    })
                  }
                >
                  {loadingCancelContract ? (
                    <Loading>
                      <FaSpinner color="#fff" size={18} />
                    </Loading>
                  ) : (
                    <strong>NOVO CONTRATO</strong>
                  )}
                </button>
              )
            )}
          </div>
        </Form>
      </Content>
    </Container>
  );
}

export default NewCompanies;

NewCompanies.propTypes = {
  location: PropTypes.shape(),
};

NewCompanies.defaultProps = {
  location: null,
};

/**
 *
 */
