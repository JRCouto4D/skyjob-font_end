/* eslint-disable no-nested-ternary */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  MdSearch,
  MdFilterList,
  MdCreate,
  MdDeleteForever,
  MdFastRewind,
  MdFastForward,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import api from '../../../services/api';
import history from '../../../services/history';

import {
  Container,
  Content,
  BoxLeft,
  BoxSearch,
  Block,
  BoxRight,
  TableProviders,
  LineTable,
  Loading,
  BoxNavigation,
} from './styles';

function Providers() {
  const { company } = useSelector((state) => state.user.profile);

  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [prePage, setPrePage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState([]);

  const handleFilter = useCallback(async () => {}, []);

  const loadProviders = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`/company/${company.id}/providers/list`, {
        params: {
          page,
          name: search,
        },
      });

      setProviders(response.data.providers);
      setTotal(response.data.total);
      setPrePage(Math.ceil(response.data.total / 5));
      setLoading(false);
    } catch (err) {
      toast.error('Algo deu errado, por favor tente mais tarde');
      history.push('/main');
    }
  }, [page, search, company]);

  const deleteProvider = useCallback(
    async (id) => {
      confirmAlert({
        title: 'Confirmar remoção',
        message: 'Deseja remover este fornecedor?',
        buttons: [
          {
            label: 'Sim',
            onClick: async () => {
              try {
                await api.delete(
                  `company/${company.id}/providers/${id}/delete`
                );
                toast.success('O Fornecedor foi deletado com sucesso!');
                loadProviders();
              } catch (err) {
                toast.error('Algo deu errado, por favor tente mais tarde');
                history.push('/providers');
              }
            },
          },
          {
            label: 'Não',
            onClick: () => history.push('/providers'),
          },
        ],
      });
    },
    [loadProviders, company]
  );

  useEffect(() => {
    loadProviders();
  }, [loadProviders]);

  function nextPage() {
    setPrePage(Math.ceil(total / 5));
    setPage(page < prePage ? page + 1 : page);

    loadProviders();
  }

  function prevPage() {
    setPage(page >= 2 ? page - 1 : page);

    loadProviders();
  }

  const memoList = useMemo(() => {
    return (
      <TableProviders>
        <li className="header">
          <strong>DESCRIÇÃO</strong>
          <strong>REPRESENTANTE</strong>
          <strong>Email</strong>
          <strong>TELEFONE</strong>
          <strong>CELULAR</strong>
          <strong>ATIVO</strong>
          <strong>AÇÕES</strong>
        </li>

        {providers.map((item) => {
          return (
            <LineTable>
              <strong>
                {item.name.length > 38
                  ? `${item.name.substr(0, 38)}...`
                  : item.name}
              </strong>

              <strong>
                {item.representative
                  ? item.representative.length > 38
                    ? `${item.representative.substr(0, 38)}...`
                    : item.representative
                  : ''}
              </strong>

              <strong>
                {item.email
                  ? item.email.length > 38
                    ? `${item.email.substr(0, 38)}...`
                    : item.email
                  : ''}
              </strong>

              <strong>{item.telephone}</strong>

              <strong>{item.cell_phone}</strong>

              <strong>{item.active ? 'SIM' : 'NÃO'}</strong>

              <div className="boxActions">
                <button
                  type="button"
                  onClick={() => {
                    history.push('/providers/newProvider', {
                      item,
                    });
                  }}
                >
                  <MdCreate color="#333" size={20} />
                </button>

                <button type="button" onClick={() => deleteProvider(item.id)}>
                  <MdDeleteForever color="#ab0000" size={20} />
                </button>
              </div>
            </LineTable>
          );
        })}
      </TableProviders>
    );
  }, [providers, deleteProvider]);

  return (
    <Container>
      <Content>
        <div>
          <header>
            <BoxLeft>
              <div>
                <strong>CATÁLOGO</strong>
                <h1>FORNECEDORES</h1>
              </div>
            </BoxLeft>
            <BoxSearch>
              <MdSearch size={20} color="#ccc" />
              <Block />
              <Input
                type="text"
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
            </BoxSearch>
            <BoxRight>
              <button onClick={handleFilter} type="button">
                <MdFilterList color="#ab0000" size={50} />
              </button>
              <Link to="/providers/newProvider">
                <span>ADICIONAR</span>
                <strong>NOVO</strong>
              </Link>
            </BoxRight>
          </header>

          {loading ? (
            <Loading>
              <FaSpinner color="#ab0000" size={30} />
            </Loading>
          ) : providers.length <= 0 ? (
            <h1
              style={{ marginTop: 10 }}
            >{`Nenhum resultado para "${search}".`}</h1>
          ) : (
            memoList
          )}
        </div>

        <BoxNavigation>
          <div>
            <button onClick={prevPage} type="button" disabled={page === 1}>
              <MdFastRewind size={20} color="#fff" />
            </button>

            <span>{`${page} de ${prePage}`}</span>

            <button onClick={nextPage} type="button" disabled={page >= prePage}>
              <MdFastForward size={20} color="#fff" />
            </button>
          </div>
        </BoxNavigation>
      </Content>
    </Container>
  );
}

export default Providers;
