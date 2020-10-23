/* eslint-disable no-nested-ternary */
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { MdSearch, MdAddShoppingCart } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { Form, Input } from '@rocketseat/unform';

import BoxPDV from '../../../../components/Box_point-sale';
import BoxItensSale from '../../../../components/Box_itens-sales';

import api from '../../../../services/api';

import { addToItemRequest } from '../../../../store/module/sale/actions';

import { formatPrice } from '../../../../util/format';

import noImage from '../../../../assets/notImage.png';
import {
  Container,
  BoxLeft,
  ButtonOption,
  ProductTable,
  LineTableProducts,
  BoxFooter,
  BoxRight,
  Loading,
} from './styles';

function Selling() {
  const [search1, setSearch1] = useState(true);
  const [search2, setSearch2] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { company } = useSelector((state) => state.user.profile);
  const { dataSale } = useSelector((state) => state.saleData);
  const dispatch = useDispatch();

  function handleOptionSearch1() {
    setSearch1(true);
    setSearch2(false);
  }

  function handleOptionSearch2() {
    setSearch2(true);
    setSearch1(false);
  }

  const loadProducts = useCallback(async () => {
    setLoading(true);

    const response = await api.get(`/company/${company.id}/products/list`, {
      params: {
        page,
        search,
        op: 1,
      },
    });
    setProducts(response.data.products);
    setLoading(false);
  }, [company, page, search]);

  useEffect(() => {
    if (search !== '') {
      loadProducts();
    }
  }, [loadProducts]);

  const tableMemoProducts = useMemo(() => {
    return (
      <ProductTable>
        <li className="header">
          <strong>DESCRIÇÃO</strong>
          <strong>R$ VAREJO</strong>
          <strong>CATEGORIA</strong>
          <strong>FORNECEDOR</strong>
          <strong>UNIDADE</strong>
          <strong>ESTOQUE</strong>
        </li>

        {products.map((item) => {
          return (
            <LineTableProducts
              onClick={() => {
                setSelectedProduct(item);
              }}
              style={{
                backgroundColor: `${
                  selectedProduct && item.id === selectedProduct.id
                    ? '#00bfdd'
                    : '#fff'
                }`,
              }}
            >
              <button type="button">
                <div>
                  <strong
                    style={{
                      color: `${
                        selectedProduct && item.id === selectedProduct.id
                          ? '#fff'
                          : '#333'
                      }`,
                    }}
                  >
                    {item.description.length > 38
                      ? `${item.description.substr(0, 38)}...`
                      : item.description}
                  </strong>
                  <strong
                    style={{
                      color: `${
                        selectedProduct && item.id === selectedProduct.id
                          ? '#fff'
                          : '#333'
                      }`,
                    }}
                  >
                    {item.retail_price ? formatPrice(item.retail_price) : ''}
                  </strong>
                  <strong
                    style={{
                      color: `${
                        selectedProduct && item.id === selectedProduct.id
                          ? '#fff'
                          : '#333'
                      }`,
                    }}
                  >
                    {item.category ? item.category.name.toUpperCase() : ''}
                  </strong>
                  <strong
                    style={{
                      color: `${
                        selectedProduct && item.id === selectedProduct.id
                          ? '#fff'
                          : '#333'
                      }`,
                    }}
                  >
                    {item.provider ? item.provider.name.toUpperCase() : ''}
                  </strong>
                  <strong
                    style={{
                      color: `${
                        selectedProduct && item.id === selectedProduct.id
                          ? '#fff'
                          : '#333'
                      }`,
                    }}
                  >
                    {item.unit ? item.unit.name.toUpperCase() : ''}
                  </strong>
                  <strong
                    style={{
                      color: `${
                        selectedProduct && item.id === selectedProduct.id
                          ? '#fff'
                          : '#333'
                      }`,
                    }}
                  >
                    {item.amount_stock}
                  </strong>
                </div>
              </button>
            </LineTableProducts>
          );
        })}
      </ProductTable>
    );
  }, [products, selectedProduct]);

  function addToItem(data) {
    if (selectedProduct === null) {
      toast.error('Selecione o produto antes de incluir o item');
      return;
    }

    if (data.amount === '') {
      toast.error('A quantidade do item é obrigatoria');
      return;
    }

    if (
      selectedProduct.amount_stock <= 0 ||
      data.amount > selectedProduct.amount_stock
    ) {
      toast.error('Produto em baixa no estoque');
      return;
    }

    const dataItem = {
      sale_id: dataSale.id,
      product_id: selectedProduct.id,
      amount: data.amount,
      discount: data.discount === '' ? 0 : data.discount,
    };

    dispatch(addToItemRequest(dataItem));
    setSelectedProduct(null);
    setProducts([]);
    setSearch('');
  }

  return (
    <BoxPDV poup>
      <Container>
        <BoxLeft>
          <div>
            <header>
              <div className="box-options">
                <ButtonOption
                  type="button"
                  active={search1}
                  onClick={() => handleOptionSearch1()}
                >
                  <div className="box-1">
                    <div className="box-2" />
                  </div>
                  <strong>NOME</strong>
                </ButtonOption>

                <ButtonOption
                  type="button"
                  active={search2}
                  onClick={() => handleOptionSearch2()}
                >
                  <div className="box-1">
                    <div className="box-2" />
                  </div>

                  <strong>CÓDIGO DE BARRAS</strong>
                </ButtonOption>
              </div>

              <div className="box-input-search">
                <div className="box-search-left">
                  <MdSearch color="#ddd" size={25} />
                </div>
                <Input
                  type="text"
                  autoCapitalize="off"
                  autoComplete="off"
                  id="search"
                  name="search"
                  value={search}
                  onChange={(e) => {
                    setSelectedProduct(null);
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </header>

            {loading ? (
              <Loading>
                <FaSpinner color="#ab0000" size={30} />
              </Loading>
            ) : products.length >= 1 && search !== '' ? (
              tableMemoProducts
            ) : (
              <h1
                style={{
                  fontSize: 35,
                  marginTop: 20,
                  color: '#f0f0f0',
                }}
              >
                BUSCAR PRODUTO
              </h1>
            )}
          </div>

          {selectedProduct && (
            <BoxFooter>
              <div className="footer-box-left">
                <img
                  src={
                    selectedProduct
                      ? selectedProduct.image
                        ? selectedProduct.image.url
                        : noImage
                      : noImage
                  }
                  alt="noImage"
                />
              </div>

              <div className="footer-box-right">
                <Form onSubmit={addToItem}>
                  <div className="form-box-top">
                    <div className="input-block">
                      <strong>ITEM</strong>
                      <Input
                        type="text"
                        id="description"
                        name="description"
                        value={
                          selectedProduct ? selectedProduct.description : ''
                        }
                        disabled
                      />
                    </div>

                    <div className="input-block">
                      <strong>QUANTIDADE</strong>
                      <Input type="number" id="amount" name="amount" />
                    </div>

                    <div className="input-block">
                      <strong>DESCONTO %</strong>
                      <Input type="number" id="discount" name="discount" />
                    </div>
                  </div>

                  <button type="submit">
                    <strong>INCLUIR ITEM</strong>
                    <MdAddShoppingCart color="#fff" size={25} />
                  </button>
                </Form>
              </div>
            </BoxFooter>
          )}
        </BoxLeft>

        <BoxRight>
          <BoxItensSale button={0} />
        </BoxRight>
      </Container>
    </BoxPDV>
  );
}

export default Selling;
