import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { MdClear, MdForward } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import history from '../../services/history';
import api from '../../services/api';

import { Container, Modal, Content, Select } from './styles';

function OpenPointSale() {
  const { company } = useSelector((state) => state.user.profile);

  const [cashs, setCashs] = useState([]);
  const [selectedCach, setSelectedCach] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(0);

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
    console.tron.log(data, selectedCach.id, selectedUser.id);
  }

  return (
    <Container>
      <Modal>
        <button type="button" onClick={() => history.goBack()}>
          <MdClear size={25} color="#fff" />
        </button>

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
                <MdForward color="#fff" size={45} />
                <strong>CONFIRMAR ABERTURA</strong>
              </button>
            </Form>
          </main>
        </Content>
      </Modal>
    </Container>
  );
}

export default OpenPointSale;
