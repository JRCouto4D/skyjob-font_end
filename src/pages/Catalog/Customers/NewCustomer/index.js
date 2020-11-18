import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import history from '../../../../services/history';
import api from '../../../../services/api';
import ImageInput from './ImageInput';

import {
  Container,
  Modal,
  Content,
  ButtonActive,
  Main,
  InputBlock,
} from './styles';

function NewCustomer({ location }) {
  if (location.state) console.tron.log(location.state.customer);
  const { company } = useSelector((state) => state.user.profile);

  const [active, setActive] = useState(
    location.state ? location.state.customer.type !== 1 : false
  );
  const [inputError, setInputError] = useState(0);

  async function handleSubmit(data) {
    if (data.name === '') {
      setInputError(1);
      toast.error('O NOME DO CLIENTE É OBRIGRATÓRIO');

      const inputName = document.getElementById('name');
      inputName.focus();
      inputName.style.borderColor = '#FF1E40';

      return;
    }

    if (active && data.cnpj === '') {
      setInputError(2);
      toast.error('O CNPJ DO CLIENTE É OBRIGRATÓRIO');

      const inputCNPJ = document.getElementById('cnpj');
      inputCNPJ.focus();
      inputCNPJ.style.borderColor = '#FF1E40';

      return;
    }
    if (data.cpf === '') {
      setInputError(2);
      toast.error('O CPF DO CLIENTE É OBRIGATÓRIO');

      const inputCPF = document.getElementById('cpf');
      inputCPF.focus();
      inputCPF.style.borderColor = '#FF1E40';
      return;
    }

    const response = await api.get(`/company/${company.id}/customers`);

    const { customers } = response.data;

    if (customers.length >= 1) {
      if (active) {
        const checkCustomer = customers.filter(
          (customer) => customer.cnpj === data.cnpj
        );

        if (checkCustomer.length >= 1) {
          const dataCompleted = { ...data, type: active === true ? 2 : 1 };
          if (location.state && location.state.customer.cnpj === data.cnpj) {
            try {
              const { customer } = location.state;

              await api.put(
                `company/${company.id}/customers/${customer.id}`,
                dataCompleted
              );

              toast.success('CLIENTE EDITADO COM SUCESSO!');
              history.push('/customers');
            } catch (err) {
              toast.error('ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE');
              history.push('/customers');
            }
            return;
          }

          setInputError(2);
          toast.error('ESSE CRIENTE JÁ ESTÁ REGISTRADO NA BASE DE DADOS');

          const inputCNPJ = document.getElementById('cnpj');
          inputCNPJ.focus();
          inputCNPJ.style.borderColor = '#FF1E40';
          return;
        }
      } else {
        const checkCustomer = customers.filter(
          (customer) => customer.cpf === data.cpf
        );

        if (checkCustomer.length >= 1) {
          const dataCompleted = { ...data, type: active === true ? 2 : 1 };
          if (location.state && location.state.customer.cpf === data.cpf) {
            try {
              const { customer } = location.state;

              await api.put(
                `company/${company.id}/customers/${customer.id}`,
                dataCompleted
              );

              toast.success('CLIENTE EDITADO COM SUCESSO!');
              history.push('/customers');
            } catch (err) {
              toast.error('ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE');
              history.push('/customers');
            }
            return;
          }

          setInputError(2);
          toast.error('ESSE CRIENTE JÁ ESTÁ REGISTRADO NA BASE DE DADOS');

          const inputCPF = document.getElementById('cpf');
          inputCPF.focus();
          inputCPF.style.borderColor = '#FF1E40';
          return;
        }
      }
    }

    const dataCompleted = { ...data, type: active === true ? 2 : 1 };

    try {
      await api.post(`company/${company.id}/customers`, dataCompleted);

      toast.success('CLIENTE CADASTRADO COM SUCESSO!');
      history.push('/customers');
    } catch (err) {
      toast.error('ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE');
      history.push('/customers');
    }
  }

  const memoForm = useMemo(
    () => (
      <Form
        initialData={location.state && location.state.customer}
        onSubmit={handleSubmit}
      >
        <div className="box-data-customer">
          <div className="image-input">
            <ImageInput />
          </div>

          <div className="box-description-customer">
            <div className="box-description-top">
              <InputBlock>
                {inputError === 1 ? (
                  <strong style={{ color: '#FF1E40' }}>NOME *</strong>
                ) : (
                  <strong>NOME</strong>
                )}

                <Input
                  type="text"
                  autoCapitalize="none"
                  autoComplete="none"
                  id="name"
                  name="name"
                  placeholder="Digite o nome do cliente"
                  onChange={() => {
                    setInputError(0);
                    const inputName = document.getElementById('name');
                    inputName.style.borderColor = '#ddd';
                  }}
                />
              </InputBlock>

              <InputBlock>
                {inputError === 2 ? (
                  <strong style={{ color: '#FF1E40' }}>CPF/CNPJ *</strong>
                ) : (
                  <strong>CPF/CNPJ</strong>
                )}
                <Input
                  autoCapitalize="none"
                  autoComplete="none"
                  type="text"
                  id={active ? 'cnpj' : 'cpf'}
                  name={active ? 'cnpj' : 'cpf'}
                  placeholder="Digite apenas numeros"
                  onChange={() => {
                    setInputError(0);
                    if (active) {
                      const inputCNPJ = document.getElementById('cnpj');
                      inputCNPJ.style.borderColor = '#ddd';
                    } else {
                      const inputCPF = document.getElementById('cpf');
                      inputCPF.style.borderColor = '#ddd';
                    }
                  }}
                />
              </InputBlock>
            </div>

            <div className="box-description-bottom">
              <InputBlock>
                <strong>Email</strong>
                <Input
                  autoCapitalize="none"
                  autoComplete="none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ex.: cliente@email.com"
                />
              </InputBlock>

              <InputBlock>
                <strong>TELEFONE 1</strong>
                <Input
                  autoCapitalize="none"
                  autoComplete="none"
                  type="text"
                  id="telephone"
                  name="telephone"
                  placeholder="Ex.: (XX) 00000-0000"
                />
              </InputBlock>

              <InputBlock>
                <strong>TELEFONE 2</strong>
                <Input
                  type="text"
                  autoCapitalize="off"
                  autoComplete="off"
                  id="cell_phone"
                  name="cell_phone"
                  placeholder="Ex.: (XX) 00000-0000"
                />
              </InputBlock>
            </div>
          </div>
        </div>

        <div className="box-customer-address">
          <div className="data-address">
            <strong>ENDEREÇO</strong>
          </div>

          <div className="box-address-top">
            <InputBlock>
              <strong>RUA</strong>
              <Input
                type="text"
                autoCapitalize="off"
                autoComplete="off"
                id="street"
                name="street"
                placeholder="Ex.: São Mateus"
              />
            </InputBlock>

            <InputBlock>
              <strong>NUMERO</strong>
              <Input
                type="text"
                autoCapitalize="off"
                autoComplete="off"
                id="number"
                name="number"
                placeholder="Ex.: 77"
              />
            </InputBlock>

            <InputBlock>
              <strong>BAIRRO</strong>
              <Input
                type="text"
                autoCapitalize="off"
                autoComplete="off"
                id="neighborhood"
                name="neighborhood"
                placeholder="Ex.: Primavera"
              />
            </InputBlock>
          </div>

          <div className="box-address-bottom">
            <InputBlock>
              <strong>COMPLEMENTO</strong>
              <Input
                type="text"
                autoCapitalize="off"
                autoComplete="off"
                id="complement"
                name="complement"
                placeholder="Ex.: Terrio"
              />
            </InputBlock>

            <InputBlock>
              <strong>CEP</strong>
              <Input
                type="text"
                autoCapitalize="off"
                autoComplete="off"
                id="zip_code"
                name="zip_code"
                placeholder="Ex.: 45700000"
              />
            </InputBlock>

            <InputBlock>
              <strong>CIDADE</strong>
              <Input
                type="text"
                autoCapitalize="off"
                autoComplete="off"
                id="city"
                name="city"
                placeholder="Ex.: São Paulo"
              />
            </InputBlock>

            <InputBlock>
              <strong>ESTADO</strong>
              <Input
                type="text"
                autoCapitalize="off"
                autoComplete="off"
                id="state"
                name="state"
                placeholder="Ex.: São Paulo"
              />
            </InputBlock>
          </div>
        </div>

        <button type="submit">SALVAR</button>
      </Form>
    ),
    [inputError, active]
  );

  return (
    <Container>
      <Modal>
        <button type="button" onClick={() => history.goBack()}>
          <MdClear size={25} color="#fff" />
        </button>

        <Content>
          <header>
            <h1>NOVO CLIENTE</h1>

            <div className="box-right">
              <strong>EMPRESA</strong>
              <ButtonActive
                type="button"
                onClick={() => setActive(!active)}
                active={active}
              >
                <div>
                  <div>
                    <div />
                  </div>
                </div>
              </ButtonActive>
            </div>
          </header>

          <Main>{memoForm}</Main>
        </Content>
      </Modal>
    </Container>
  );
}

export default NewCustomer;

NewCustomer.propTypes = {
  location: PropTypes.shape(),
};

NewCustomer.defaultProps = {
  location: null,
};
