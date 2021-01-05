/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '@rocketseat/unform';
import {
  MdPrint,
  MdAdd,
  MdSearch,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
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
  TableEmployees,
  Loading,
  Pagination,
} from './styles';

function Employees() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [prePage, setPrePage] = useState(0);
  const [total, setTotal] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const { company } = useSelector((state) => state.user.profile);

  const loadEmployees = useCallback(() => {
    async function loadData() {
      try {
        if (company) {
          setLoading(true);

          const response = await api.get(`/users/company/${company.id}/list`, {
            params: {
              page,
              name: search,
            },
          });

          const { users, total: ttal } = response.data;

          setEmployees(users);
          setTotal(ttal);
          setPrePage(Math.ceil(ttal / 5));
          setLoading(false);
        }
      } catch (err) {
        toast.error(
          'Algo deu errado e não foi possivel carregar a lista de funcionários.'
        );
        setLoading(false);
      }
    }
    loadData();
  }, [page, search, company]);

  const deleteEmployee = useCallback(
    (employee_id) => {
      async function deleted(id) {
        confirmAlert({
          title: 'REMOVER FUNCIONÁRIO',
          message: 'Deseja realmente remover este funcionário?',
          buttons: [
            {
              label: 'Sim',
              onClick: async () => {
                try {
                  await api.delete(`/users/${id}/delete`);
                  toast.success('O funcionário foi deletado com sucesso!');
                  loadEmployees();
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
      deleted(employee_id);
    },
    [loadEmployees]
  );

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const memoList = useMemo(
    () =>
      employees.map((employee) => (
        <li key={employee.id}>
          <span>{`#${employee.id}`}</span>
          <div className="box-description">
            <img
              alt={employee.name}
              src={
                employee.avatar
                  ? employee.avatar.url
                  : `https://ui-avatars.com/api/?color=40e0d0&background=ddd&bold=true&format=svg&size=34&rounded=true&name=${employee.name}`
              }
              style={{ width: 34, height: 34, borderRadius: 17 }}
            />
            <strong>
              {employee.name
                ? employee.name.length > 35
                  ? `${employee.name.substr(0, 35)}...`
                  : employee.name
                : ''}
            </strong>
          </div>
          <span>
            {employee.email
              ? employee.email.length > 25
                ? `${employee.email.substr(0, 25)}...`
                : employee.email
              : ''}
          </span>
          <span>{`NIVEL ${employee.access_level}`}</span>

          <ActionsPopUp>
            <div>
              <button
                type="button"
                onClick={() => history.push('/employees/form', { employee })}
              >
                <MdEdit color="#4D85EE" size={16} />
                <span>Editar</span>
              </button>
            </div>
            <div>
              <button type="button" onClick={() => deleteEmployee(employee.id)}>
                <MdDeleteForever color="#DE3B3B" size={16} />
                <span>Excluir</span>
              </button>
            </div>
          </ActionsPopUp>
        </li>
      )),
    [employees, deleteEmployee]
  );

  function nextPage() {
    setPrePage(Math.ceil(total / 5));
    setPage(page < prePage ? page + 1 : page);

    loadEmployees();
  }

  function prevPage() {
    setPage(page >= 2 ? page - 1 : page);

    loadEmployees();
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

        <TableEmployees>
          <li className="table-header">
            <strong>#ID</strong>
            <strong>NOME</strong>
            <strong>EMAIL</strong>
            <strong>NÍVEL DE ACESSO</strong>
            <strong>AÇÕES</strong>
          </li>

          {loading ? (
            <Loading>
              <FaSpinner color="#444" size={14} />
            </Loading>
          ) : employees.length === 0 ? (
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
        </TableEmployees>

        <Pagination>
          <span>{`Mostando ${employees.length} ${
            employees.length > 1 ? 'registros' : 'registro'
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

export default Employees;
