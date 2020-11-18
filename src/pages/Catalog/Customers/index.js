/* eslint-disable no-nested-ternary */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  MdSearch,
  MdCreate,
  MdDeleteForever,
  MdFastRewind,
  MdFastForward,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { Input } from '@rocketseat/unform';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import {
  Container,
  Content,
  Header,
  TableCustomer,
  LineTableCustomers,
  BoxNavigation,
  Loading,
} from './styles';

function Customers() {
  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(1);
  const [prePage, setPrePage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const { company } = useSelector((state) => state.user.profile);

  const loadCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`company/${company.id}/customers/list`, {
        params: {
          page,
          name: search,
        },
      });

      setCustomers(response.data.customers);
      setTotal(response.data.total);
      setPrePage(Math.ceil(response.data.total / 5));
      setLoading(false);
    } catch (err) {
      toast.error(`ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE. ERRO: ${err}`);
      history.push('/main');
    }
  }, [page, search, company]);

  useEffect(() => {
    loadCustomers();
  }, [search, loadCustomers]);

  function nextPage() {
    setPrePage(Math.ceil(total / 5));
    setPage(page < prePage ? page + 1 : page);

    loadCustomers();
  }

  function prevPage() {
    setPage(page >= 2 ? page - 1 : page);

    loadCustomers();
  }

  const handleDeleteCustomer = useCallback(
    async (id) => {
      confirmAlert({
        title: 'Confirmar remoção',
        message: 'Deseja remover este cliente?',
        buttons: [
          {
            label: 'SIM',
            onClick: async () => {
              try {
                await api.delete(`company/${company.id}/customers/${id}`);
                toast.success('O cliente foi removido com sucesso!');
                loadCustomers();
              } catch (err) {
                toast.error('Algo deu errado, por favor tente mais tarde');
              }
            },
          },
          {
            label: 'NÃO',
            onClick: () => {},
          },
        ],
      });
    },
    [company, loadCustomers]
  );

  const tableCustomers = useMemo(
    () => (
      <TableCustomer>
        <li className="header">
          <strong>NOME</strong>
          <strong>CPF/CNPJ</strong>
          <strong>TELEFONE</strong>
          <strong>EMAIL</strong>
          <strong>AÇÕES</strong>
        </li>
        {customers.map((customer) => (
          <LineTableCustomers>
            <strong>{customer.name}</strong>
            <strong>{customer.cpf || customer.cnpj}</strong>
            <strong>{customer.telephone}</strong>
            <strong>{customer.email}</strong>
            <div className="box-actions">
              <button
                type="button"
                onClick={() =>
                  history.push('/customers/newCustomer', { customer })
                }
              >
                <MdCreate size={20} color="#333" />
              </button>

              <button
                type="button"
                onClick={() => handleDeleteCustomer(customer.id)}
              >
                <MdDeleteForever size={20} color="#ab0000" />
              </button>
            </div>
          </LineTableCustomers>
        ))}
      </TableCustomer>
    ),
    [customers, handleDeleteCustomer]
  );

  return (
    <Container>
      <Content>
        <div>
          <Header>
            <div className="header-box-left">
              <strong>CATÁLOGO</strong>
              <h1>CLIENTES</h1>
            </div>

            <div className="box-search">
              <MdSearch size={20} color="#ccc" />

              <Input
                id="search"
                name="search"
                placeholder="O que voce está procurando"
                autoCapitalize="none"
                autoComplete="none"
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => history.push('/customers/newCustomer')}
            >
              <span>ADICIONAR</span>
              <strong>NOVO</strong>
            </button>
          </Header>

          <div className="box-table-customers">
            {loading ? (
              <Loading>
                <FaSpinner color="#ab0000" size={30} />
              </Loading>
            ) : customers.length >= 1 ? (
              tableCustomers
            ) : (
              <div
                style={{
                  marginTop: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <h1
                  style={{
                    color: '#666',
                  }}
                >
                  NENHUM RESULTADO ENCONTRADO
                </h1>
              </div>
            )}
            <BoxNavigation>
              <div>
                <button onClick={prevPage} type="button" disabled={page === 1}>
                  <MdFastRewind size={20} color="#fff" />
                </button>

                <span>{`${page} de ${prePage}`}</span>

                <button
                  onClick={nextPage}
                  type="button"
                  disabled={page >= prePage}
                >
                  <MdFastForward size={20} color="#fff" />
                </button>
              </div>
            </BoxNavigation>
          </div>
        </div>
      </Content>
    </Container>
  );
}

export default Customers;
