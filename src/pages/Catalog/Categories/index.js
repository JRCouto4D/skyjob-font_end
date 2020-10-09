/* eslint-disable no-nested-ternary */
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
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
  TableCategories,
  LineTable,
  Loading,
  BoxNavigation,
} from './styles';

function Categories() {
  const { company } = useSelector((state) => state.user.profile);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [prePage, setPrePage] = useState(0);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([]);

  function handleFilter() {}

  async function loadCategories() {
    try {
      setLoading(true);

      const response = await api.get(`company/${company.id}/categories/list`, {
        params: {
          page,
          name: search,
        },
      });
      setCategories(response.data.categories);
      setTotal(response.data.total);
      setPrePage(Math.ceil(response.data.total / 5));
      setLoading(false);
    } catch (err) {
      toast.error('Algo deu errado, por favor tentar mais tarde.');
      history.push('/main');
    }
  }

  function nextPage() {
    setPrePage(Math.ceil(total / 5));
    setPage(page < prePage ? page + 1 : page);
  }

  function prevPage() {
    setPage(page >= 2 ? page - 1 : page);
  }

  async function deleteCategory(id) {
    confirmAlert({
      title: 'Confirmar remoção',
      message: 'Deseja remover esta categoria?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            try {
              await api.delete(`company/${company.id}/categories/${id}/delete`);
              toast.success('A categoria foi deletada com sucesso!');
              loadCategories();
            } catch (err) {
              toast.error('Algo deu errado, por favor tente mais tarde');
              history.push('/categories');
            }
          },
        },
        {
          label: 'Não',
          onClick: () => history.push('/categories'),
        },
      ],
    });
  }

  useEffect(() => {
    loadCategories();
  }, [page, search]);

  const memoList = useMemo(
    () => (
      <TableCategories>
        <li className="header">
          <strong>DESCRIÇÃO</strong>
          <strong>ATIVO</strong>
          <strong>AÇÕES</strong>
        </li>

        {categories.map((item) => (
          <LineTable>
            <strong>{item.name}</strong>
            <strong>{item.active ? 'SIM' : 'NÃO'}</strong>
            <div className="box-actions">
              <button
                type="button"
                onClick={() =>
                  history.push('/categories/newCategory', { item })
                }
              >
                <MdCreate color="#333" size={20} />
              </button>

              <button type="button" onClick={() => deleteCategory(item.id)}>
                <MdDeleteForever color="#ab0000" size={20} />
              </button>
            </div>
          </LineTable>
        ))}
      </TableCategories>
    ),
    [categories]
  );

  return (
    <Container>
      <Content>
        <div>
          <header>
            <BoxLeft>
              <div>
                <strong>CATÁLOGO</strong>
                <h1>CATEGORIAS</h1>
              </div>
            </BoxLeft>
            <BoxSearch>
              <MdSearch size={20} color="#ccc" />
              <Block />
              <Input
                type="text"
                id="search"
                name="search"
                placeholder="O que voce está procurando?"
                autoCapitaliza="none"
                onChange={(e) => setSearch(e.target.value)}
              />
            </BoxSearch>

            <BoxRight>
              <button onClick={handleFilter} type="button">
                <MdFilterList color="#ab0000" size={50} />
              </button>
              <Link to="/categories/newCategory">
                <span>ADICIONAR</span>
                <strong>NOVO</strong>
              </Link>
            </BoxRight>
          </header>

          {loading ? (
            <Loading>
              <FaSpinner color="#ab0000" size={30} />
            </Loading>
          ) : categories.length <= 0 ? (
            <h1>Nenhum produto encontrado.</h1>
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

export default Categories;
