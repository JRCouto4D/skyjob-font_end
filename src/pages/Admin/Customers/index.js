/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  MdPrint,
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { parseISO, format, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ActionsPopUp from '../../../components/ActionsPopUp';

import history from '../../../services/history';
import api from '../../../services/api';

import {
  Container,
  Content,
  Header,
  NewSearch,
  TableCustomer,
  Loading,
  Pagination,
} from './styles';

function Customers() {
  const [page, setPage] = useState(1);
  const [prePage, setPrePage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);

  const loadCustomers = useCallback(() => {
    async function loadData() {
      try {
        setLoading(true);

        const response = await api.get('skyjob/companies/list', {
          params: {
            page,
            search,
          },
        });

        const { companies, total: ttal } = response.data;

        setCustomers(companies);
        setTotal(ttal);
        setPrePage(Math.ceil(ttal / 12));
        setLoading(false);
      } catch (err) {
        toast.error(
          'Algo deu errado e não foi possivel carregar a lista de clientes.'
        );
        setLoading(false);
      }
    }
    loadData();
  }, [page, search]);

  const deleteCompanies = useCallback(
    (company_id) => {
      async function deleted(id) {
        confirmAlert({
          title: 'REMOVER CLIENTE',
          message: 'Deseja realmente remover este cliente?',
          buttons: [
            {
              label: 'Sim',
              onClick: async () => {
                try {
                  await api.delete(`/skyjob/companies/${id}`);
                  toast.success('O cliente foi deletado com sucesso!');
                  loadCustomers();
                } catch (err) {
                  toast.error('Algo deu errado, por favor tente mais tarde');
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
      deleted(company_id);
    },
    [loadCustomers]
  );

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const memoList = useMemo(
    () =>
      customers.map((customer) => (
        <li key={customer.id}>
          <span>{`#${customer.id}`}</span>
          <div className="box-description">
            <img
              alt={customer.description}
              src={
                customer.avatar
                  ? customer.avatar.url
                  : `https://ui-avatars.com/api/?color=40e0d0&background=ddd&bold=true&format=svg&size=34&rounded=true&name=${customer.description}`
              }
              style={{ width: 34, height: 34, borderRadius: 17 }}
            />
            <strong>
              {customer.description
                ? customer.description.length > 35
                  ? `${customer.description.substr(0, 35)}...`
                  : customer.description
                : ''}
            </strong>
          </div>
          <span>
            {customer.email
              ? customer.email.length > 25
                ? `${customer.email.substr(0, 25)}...`
                : customer.email
              : ''}
          </span>
          <span>{customer.access ? 'OK' : 'RESTRITO'}</span>
          <span>
            {customer.contract
              ? format(
                  parseISO(customer.contract.start_date),
                  "dd/MM/yy 'às' HH:mm 'h'"
                )
              : ''}
          </span>
          <span>
            {customer.contract
              ? formatDistanceStrict(
                  parseISO(customer.contract.end_date),
                  new Date(),
                  {
                    addSuffix: true,
                    locale: pt,
                  }
                )
              : ''}
          </span>

          <ActionsPopUp>
            <div>
              <button
                type="button"
                onClick={() =>
                  history.push('/admin/customers/form', { customer })
                }
              >
                <MdEdit color="#4D85EE" size={16} />
                <span>Editar</span>
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => deleteCompanies(customer.id)}
              >
                <MdDeleteForever color="#DE3B3B" size={16} />
                <span>Excluir</span>
              </button>
            </div>
          </ActionsPopUp>
        </li>
      )),
    [customers, deleteCompanies]
  );

  function nextPage() {
    setPrePage(Math.ceil(total / 12));
    setPage(page < prePage ? page + 1 : page);

    loadCustomers();
  }

  function prevPage() {
    setPage(page >= 2 ? page - 1 : page);

    loadCustomers();
  }

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
          <button
            type="button"
            onClick={() => history.push('/admin/customers/form')}
          >
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

        <Pagination>
          <span>{`Mostando ${customers.length} ${
            customers.length > 1 ? 'registros' : 'registro'
          } de um total de ${total}`}</span>

          <div className="box-pagination">
            <button type="button" onClick={prevPage} disabled={page === 1}>
              Anterior
            </button>
            <span>{`página ${page} de ${prePage}`}</span>
            <button type="button" onClick={nextPage} disabled={page >= prePage}>
              Próximo
            </button>
          </div>
        </Pagination>
      </Content>
    </Container>
  );
}

export default Customers;
