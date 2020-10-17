import React, { useState } from 'react';
import { MdSearch, MdAddShoppingCart } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import BoxPDV from '../../../../components/Box_point-sale';
import BoxItensSale from '../../../../components/Box_itens-sales';

import noImage from '../../../../assets/notImage.png';
import {
  Container,
  BoxLeft,
  ButtonOption,
  ProductTable,
  LineTableProducts,
  BoxFooter,
  BoxRight,
} from './styles';

function Selling() {
  const [search1, setSearch1] = useState(true);
  const [search2, setSearch2] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  function handleOptionSearch1() {
    setSearch1(true);
    setSearch2(false);
  }

  function handleOptionSearch2() {
    setSearch2(true);
    setSearch1(false);
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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </header>

            {products.length >= 1 ? (
              <ProductTable>
                <li className="header">
                  <strong>DESCRIÇÃO</strong>
                  <strong>R$ VAREJO</strong>
                  <strong>CATEGORIA</strong>
                  <strong>FORNECEDOR</strong>
                  <strong>UNIDADE</strong>
                </li>

                {products.map((item) => {
                  return (
                    <LineTableProducts
                      onClick={() => setSelectedProduct(item)}
                      style={{
                        backgroundColor: `${
                          selectedProduct && item.id === selectedProduct.id
                            ? '#00bfdd'
                            : '#fff'
                        }`,
                      }}
                      onBlur={() => setSelectedProduct(null)}
                    >
                      <button type="button">
                        <div>
                          <strong
                            style={{
                              color: `${
                                selectedProduct &&
                                item.id === selectedProduct.id
                                  ? '#fff'
                                  : '#333'
                              }`,
                            }}
                          >
                            MASS TITANIUM 17500 3KG - CHOCOLATE
                          </strong>
                          <strong
                            style={{
                              color: `${
                                selectedProduct &&
                                item.id === selectedProduct.id
                                  ? '#fff'
                                  : '#333'
                              }`,
                            }}
                          >
                            R$70,00
                          </strong>
                          <strong
                            style={{
                              color: `${
                                selectedProduct &&
                                item.id === selectedProduct.id
                                  ? '#fff'
                                  : '#333'
                              }`,
                            }}
                          >
                            SUPLEMENTOS
                          </strong>
                          <strong
                            style={{
                              color: `${
                                selectedProduct &&
                                item.id === selectedProduct.id
                                  ? '#fff'
                                  : '#333'
                              }`,
                            }}
                          >
                            MAX TITANIUM
                          </strong>
                          <strong
                            style={{
                              color: `${
                                selectedProduct &&
                                item.id === selectedProduct.id
                                  ? '#fff'
                                  : '#333'
                              }`,
                            }}
                          >
                            UNIDADE
                          </strong>
                        </div>
                      </button>
                    </LineTableProducts>
                  );
                })}
              </ProductTable>
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

          <BoxFooter>
            <div className="footer-box-left">
              <img src={noImage} alt="noImage" />
            </div>

            <div className="footer-box-right">
              <Form>
                <div className="form-box-top">
                  <div className="input-block">
                    <strong>ITEM</strong>
                    <Input type="text" id="item" name="item" disabled />
                  </div>

                  <div className="input-block">
                    <strong>QUANTIDADE</strong>
                    <Input type="text" id="item" name="item" />
                  </div>

                  <div className="input-block">
                    <strong>DESCONTO %</strong>
                    <Input type="text" id="item" name="item" />
                  </div>
                </div>

                <button type="submit">
                  <strong>INCLUIR ITEM</strong>
                  <MdAddShoppingCart color="#fff" size={25} />
                </button>
              </Form>
            </div>
          </BoxFooter>
        </BoxLeft>

        <BoxRight>
          <BoxItensSale button={0} />
        </BoxRight>
      </Container>
    </BoxPDV>
  );
}

export default Selling;
