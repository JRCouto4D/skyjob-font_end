/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useState, useMemo } from 'react';
import {
  MdPrint,
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { Input } from '@rocketseat/unform';

import ActionsPopUp from '../../../components/ActionsPopUp';

import history from '../../../services/history';

import {
  Container,
  Content,
  Header,
  NewSearch,
  TableCustomer,
  Loading,
} from './styles';

function Customers() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const memoList = useMemo(
    () =>
      customers.map((customer) => (
        <li key={customer.id}>
          <span>{`#${customer.id}`}</span>
          <div className="box-description">
            <img
              alt={customer.name}
              src={
                customer.avatar
                  ? customer.avatar.url
                  : `https://ui-avatars.com/api/?color=40e0d0&background=ddd&bold=true&format=svg&size=34&rounded=true&name=${customer.name}`
              }
              style={{ width: 34, height: 34, borderRadius: 17 }}
            />
            <strong>{customer.name}</strong>
          </div>
          <span>{customer.email}</span>
          <span>{customer.access ? 'OK' : 'RESTRITO'}</span>
          <span>{customer.start_date}</span>
          <span>{customer.end_date}</span>

          <ActionsPopUp>
            <div>
              <button
                type="button"
                onClick={() =>
                  history.push('/deliveryman/form', { deliverymen })
                }
              >
                <MdEdit color="#4D85EE" size={16} />
                <span>Editar</span>
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => deleteDeliveryman(deliverymen.id)}
              >
                <MdDeleteForever color="#DE3B3B" size={16} />
                <span>Excluir</span>
              </button>
            </div>
          </ActionsPopUp>
        </li>
      )),
    [customers]
  );

  return (
    <Container>
      <Content>
        <Header>
          <div className="header-box-left">
            <h1>CATALOGO DE CLIENTES</h1>
            <strong>Clientes</strong>
          </div>

          <button type="button" onClick={() => {}}>
            <MdPrint color="#999" size={20} />
            <strong>IMPRIMIR</strong>
          </button>
        </Header>

        <NewSearch>
          <button type="button" onClick={() => {}}>
            <MdAdd color="#fff" size={20} />
            <strong>NOVO REGISTRO</strong>
          </button>

          <div className="box-search">
            <MdSearch size={20} color="#ccc" />

            <Input
              id="search"
              name="search"
              placeholder="O que voce está procurando"
              autoCapitalize="off"
              autoComplete="off"
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>
        </NewSearch>

        <TableCustomer>
          <li className="table-header">
            <strong>#ID</strong>
            <strong>NOME</strong>
            <strong>EMAIL</strong>
            <strong>ACESSO</strong>
            <strong>INÍCIO DO CONTRATO</strong>
            <strong>FIM DO CONTRATO</strong>
            <strong>AÇÕES</strong>
          </li>

          {loading ? (
            <Loading>
              <FaSpinner color="#444" size={14} />
            </Loading>
          ) : customers.length === 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '300px',
              }}
            >
              <h1
                style={{
                  color: '#ddd',
                }}
              >
                Nenhum cliente encontrado
              </h1>
            </div>
          ) : (
            memoList
          )}
        </TableCustomer>
      </Content>
    </Container>
  );
}

export default Customers;
