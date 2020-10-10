/* eslint-disable no-nested-ternary */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  MdSearch,
  MdFilterList,
  MdDeleteForever,
  MdCreate,
  MdFastRewind,
  MdFastForward,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { Input } from '@rocketseat/unform';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { formatPrice } from '../../../util/format';
import api from '../../../services/api';
import history from '../../../services/history';

import {
  Container,
  Content,
  BoxLeft,
  BoxSearch,
  BoxRight,
  Block,
  TableProducts,
  LineTable,
  Loading,
  BoxNavigation,
} from './styles';

function Products() {
  const { company } = useSelector((state) => state.user.profile);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [prePage, setPrePage] = useState(0);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`company/${company.id}/products/list`, {
        params: {
          page,
          search,
          op: 1,
        },
      });

      setProducts(response.data.products);
      setTotal(response.data.total);
      setPrePage(Math.ceil(response.data.total / 5));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(
        'Algo deu errado ao carregar lista de produtos, tente mais tarde'
      );
      history.push('/main');
    }
  }, [page, search, company]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function nextPage() {
    setPrePage(Math.ceil(total / 5));
    setPage(page < prePage ? page + 1 : page);

    loadProducts();
  }

  function prevPage() {
    setPage(page >= 2 ? page - 1 : page);

    loadProducts();
  }

  const deleteProduct = useCallback(
    async (id) => {
      confirmAlert({
        title: 'Confirmar remoção',
        message: 'Deseja remover este produto?',
        buttons: [
          {
            label: 'Sim',
            onClick: async () => {
              try {
                await api.delete(`company/${company.id}/products/${id}/delete`);
                toast.success('O produto foi deletado com sucesso!');
                loadProducts();
              } catch (err) {
                toast.error('Algo deu errado, por favor tente mais tarde');
                history.push('/products');
              }
            },
          },
          {
            label: 'Não',
            onClick: () => history.push('/products'),
          },
        ],
      });
    },
    [company, loadProducts]
  );

  function handleFilter() {}

  const memoList = useMemo(
    () => (
      <TableProducts>
        <li className="header">
          <strong>DESCRIÇÃO</strong>
          <strong>R$ VENDA</strong>
          <strong>CATEGORIA</strong>
          <strong>FORNECEDOR</strong>
          <strong>UNIDADE</strong>
          <strong>ATACADO</strong>
          <strong>ATIVO</strong>
          <strong>AÇÕES</strong>
        </li>

        {products.map((product) => {
          return (
            <LineTable>
              <strong>
                {product.description.length > 38
                  ? `${product.description.substr(0, 38)}...`
                  : product.description}
              </strong>

              <strong>{formatPrice(product.retail_price)}</strong>

              <strong>
                {product.category.name
                  ? product.category.name.length > 16
                    ? `${product.category.name.substr(0, 16)}...`
                    : product.category.name
                  : ''}
              </strong>

              <strong>
                {product.provider.name
                  ? product.provider.name.length > 16
                    ? `${product.provider.name.substr(0, 16)}...`
                    : product.provider.name
                  : ''}
              </strong>

              <strong>{product.unit.name}</strong>

              <strong>{product.wholesale ? 'SIM' : 'NÃO'}</strong>

              <strong>{product.active ? 'SIM' : 'NÃO'}</strong>

              <div className="boxActions">
                <button
                  type="button"
                  onClick={() => {
                    history.push('/products/newItem', {
                      item: product,
                    });
                  }}
                >
                  <MdCreate color="#333" size={20} />
                </button>

                <button type="button" onClick={() => deleteProduct(product.id)}>
                  <MdDeleteForever color="#ab0000" size={20} />
                </button>
              </div>
            </LineTable>
          );
        })}
      </TableProducts>
    ),
    [products, deleteProduct]
  );

  return (
    <Container>
      <Content>
        <div>
          <header>
            <BoxLeft>
              <div>
                <strong>CATÁLOGO</strong>
                <h1>PRODUTOS</h1>
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
                autoCapitalize="none"
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
              <Link to="/products/newItem">
                <span>ADICIONAR</span>
                <strong>NOVO</strong>
              </Link>
            </BoxRight>
          </header>

          {loading ? (
            <Loading>
              <FaSpinner color="#ab0000" size={30} />
            </Loading>
          ) : products.length <= 0 ? (
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

export default Products;
