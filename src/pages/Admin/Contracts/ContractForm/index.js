import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isValid, isEqual, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdEvent } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

import 'react-datepicker/dist/react-datepicker.css';

import api from '../../../../services/api';

import {
  Container,
  Content,
  Header,
  Body,
  InputBlock,
  Select,
  DatePicker,
  Loading,
} from './styles';

function ContractForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endContract, setEndContract] = useState(new Date());

  const [companiesValue, setCompaniesValue] = useState(null);
  const [selecteCompany, setSelecteCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typeError, setTypeError] = useState(0);

  async function loadCompanies(label) {
    const response = await api.get('/skyjob/companies', {
      params: {
        search: label,
      },
    });

    return response.data;
  }

  function handleCancel() {
    setCompaniesValue(null);
    setStartDate(new Date());
    setEndContract(new Date());
  }

  async function handleSubmit() {
    if (companiesValue === null) {
      setTypeError(1);
      toast.error('Selecione o cliente.');
      return;
    }

    if (!isValid(startDate)) {
      setTypeError(2);
      toast.error('Esta não é uma data válida.');
      return;
    }

    if (!isValid(endContract)) {
      setTypeError(3);
      toast.error('Esta não é uma data válida.');
      return;
    }

    if (isEqual(startDate, endContract)) {
      setTypeError(4);
      toast.error('As datas de iníco e fim do contrado são iguais.');
      return;
    }

    if (isBefore(endContract, startDate)) {
      setTypeError(5);
      toast.error('O tempo de duração para o contrato não é válido.');
      return;
    }

    try {
      setLoading(true);

      await api.post('/skyjob/contracts/start', {
        company_id: companiesValue.id,
        start_date: startDate,
        end_date: endContract,
      });

      handleCancel();
      setLoading(false);
      toast.success('O contrato foi registrado com sucesso.');
    } catch (err) {
      handleCancel();
      setLoading(false);
      toast.error(
        'Algo deu errado e o contrato não foi registrado. Tente mais tarde.'
      );
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <div className="header-box-left">
            <h1>REGISTRAR CONTRATOS</h1>
            <div className="header-navigation">
              <Link to="/contracts">CONTRATOS</Link>
              <strong>/ registrar cadastro</strong>
            </div>
          </div>
        </Header>

        <Body>
          <div className="box-company">
            {companiesValue ? (
              <img
                src={
                  selecteCompany.avatar
                    ? selecteCompany.avatar.url
                    : `https://ui-avatars.com/api/?color=40e0d0&background=ddd&bold=true&format=svg&size=34&rounded=true&name=${selecteCompany.description}`
                }
                alt={selecteCompany.description}
              />
            ) : (
              <strong>COMPANY</strong>
            )}
          </div>
          <div className="box-form">
            <InputBlock>
              {typeError === 1 ? (
                <strong style={{ color: '#FF1E40', fontWeight: 'bold' }}>
                  * Cliente é obrigatório
                </strong>
              ) : (
                <strong>Cliente</strong>
              )}

              <Select
                defaultOptions
                loadOptions={loadCompanies}
                value={companiesValue}
                getOptionValue={(op) => op.id}
                getOptionLabel={(op) => op.description}
                onChange={(value) => {
                  setTypeError(0);
                  setSelecteCompany(value);
                  setCompaniesValue({
                    description: value.description,
                    id: value.id,
                  });
                }}
              />
            </InputBlock>

            <div className="box-date">
              <InputBlock>
                {typeError === 2 || typeError === 4 ? (
                  <strong style={{ color: '#FF1E40', fontWeight: 'bold' }}>
                    * Início do contrato
                  </strong>
                ) : (
                  <strong>Início do contrato</strong>
                )}

                <div className="box-date-picker">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setTypeError(0);
                    }}
                    dateFormat="dd 'de' MMMM 'de' yyyy"
                    locale={pt}
                    minDate={new Date()}
                  />
                  <MdEvent size={20} color="#ccc" />
                </div>
              </InputBlock>

              <InputBlock>
                {typeError === 3 || typeError === 4 || typeError === 5 ? (
                  <strong style={{ color: '#FF1E40', fontWeight: 'bold' }}>
                    * Fim do contrato
                  </strong>
                ) : (
                  <strong>Fim do contrato</strong>
                )}

                <div className="box-date-picker">
                  <DatePicker
                    selected={endContract}
                    onChange={(date) => setEndContract(date)}
                    dateFormat="dd 'de' MMMM 'de' yyyy"
                    locale={pt}
                    minDate={new Date()}
                  />
                  <MdEvent size={20} color="#ccc" />
                </div>
              </InputBlock>
            </div>

            <div className="box-buttons">
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
                    <FaSpinner color="#fff" size={18} />
                  </Loading>
                ) : (
                  <strong>SALVAR</strong>
                )}
              </button>
            </div>
          </div>
        </Body>
      </Content>
    </Container>
  );
}

export default ContractForm;
