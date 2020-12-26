import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdClear, MdForward } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import {
  openPdvRequest,
  openPdvSuccess,
} from '../../store/module/statusPDV/actions';

import history from '../../services/history';
import api from '../../services/api';

import { Container, Modal, Content, Select, Loading } from './styles';

function OpenPointSale() {
  const { company } = useSelector((state) => state.user.profile);
  const { loading } = useSelector((state) => state.statusPDV);
  const dispatch = useDispatch();

  const [cashs, setCashs] = useState([]);
  const [selectedCach, setSelectedCach] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    async function loadPdv() {
      setLocalLoading(true);

      const response = await api.get(`/company/${company.id}/pdv/list`);
      console.tron.log(response.data);

      if (response.data.length >= 1) {
        dispatch(openPdvSuccess(response.data[0]));

        history.push('/pdv');
      }

      setLocalLoading(false);
    }

    loadPdv();
  }, [company, dispatch]);

  const loadCashs = useCallback(async () => {
    const response = await api.get(`/company/${company.id}/cash_registers`);

    setCashs(response.data.cash_registers);
  }, [company]);

  const loadUsers = useCallback(async () => {
    const response = await api.get(`users/company/${company.id}/`);

    setUsers(response.data.users);
  }, [company]);

  useEffect(() => {
    loadCashs();
    loadUsers();
  }, [loadCashs, loadUsers]);

  async function handleSubmit(data) {
    if (selectedCach === 0) {
      toast.error('Selecione o caixa registrador');
      return;
    }

    if (selectedUser === 0) {
      toast.error('Selecione o vendedor');
      return;
    }

    if (data.initial_value === '') {
      toast.error('O valor em caixa é obrigatprio');
      return;
    }

    const dataValue = {
      user_id: selectedUser.id,
      cash_register_id: selectedCach.id,
      initial_value: data.initial_value,
      company_id: company.id,
    };

    dispatch(openPdvRequest(dataValue));
  }

  return (
    <Container>
      <Modal>
        <button type="button" onClick={() => history.push('/')}>
          <MdClear size={25} color="#fff" />
        </button>

        {localLoading ? (
          <Loading>
            <FaSpinner color="#ddd" size={25} />
          </Loading>
        ) : (
          <Content>
            <header>
              <h1>PONTO DE VENDAS</h1>
            </header>

            <main>
              <Form onSubmit={handleSubmit}>
                <div className="content">
                  <div className="select-block">
                    <strong>ABERTURA DO CAIXA</strong>
                    <Select
                      value={selectedCach}
                      options={cashs}
                      getOptionValue={(op) => op.id}
                      getOptionLabel={(op) => op.description}
                      onChange={(value) => {
                        setSelectedCach({
                          id: value.id,
                          description: value.description,
                        });
                      }}
                    />
                  </div>

                  <div className="select-block">
                    <strong>VENDEDOR</strong>
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
                      }}
                    />
                  </div>

                  <div className="input-block">
                    <Input
                      type="text"
                      id="initial_value"
                      name="initial_value"
                      autoComplete="off"
                      autoCapitalize="off"
                      placeholder="0,00"
                    />
                    <strong>R$ DISPONÍVEL EM CAIXA</strong>
                  </div>
                </div>

                <button type="submit">
                  {loading ? (
                    <Loading>
                      <FaSpinner color="#ab0000" size={30} />
                    </Loading>
                  ) : (
                    <>
                      <MdForward color="#fff" size={45} />
                      <strong>CONFIRMAR ABERTURA</strong>
                    </>
                  )}
                </button>
              </Form>
            </main>
          </Content>
        )}
      </Modal>
    </Container>
  );
}

export default OpenPointSale;
