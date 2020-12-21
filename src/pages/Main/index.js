import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import low from '../../assets/low.png';
import up from '../../assets/up.png';

import history from '../../services/history';
import api from '../../services/api';

import { percentage3 } from '../../util/calcPercentage';

import {
  Container,
  Content,
  BlockJob,
  BoxJob,
  BoxButton,
  BoxItem,
  BoxLeft,
  Block,
  BoxRight,
  Loading,
} from './styles';

function Main() {
  const { company } = useSelector((state) => state.user.profile);

  const [totalItens, setTotalItens] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [loading, setLoading] = useState(false);

  const [incash, setIncash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);

  useEffect(() => {
    async function loadItens() {
      setLoading(true);

      const response = await api.get(`company/${company.id}/products`);

      const { total, products } = response.data;
      setTotalItens(total);

      const lowstk = products.filter(
        (product) => product.amount_stock <= product.minimum_stock
      );
      setLowStock(lowstk.length);

      const activepdt = products.filter((product) => product.active);
      setActiveProduct(activepdt.length);

      setLoading(false);
    }

    async function loadDataSale() {
      setLoading(true);

      const response = await api.get(`company/${company.id}/sales/list`);

      const { sales, total } = response.data;

      const cash = sales.filter((sale) => sale.payment === 1);
      setIncash(percentage3(total, cash.length));

      const crdt = sales.filter((sale) => sale.payment === 2);
      setCredit(percentage3(total, crdt.length));

      const dbt = sales.filter((sale) => sale.payment === 3);
      setDebit(percentage3(total, dbt.length));

      setLoading(false);
    }

    loadItens();
    loadDataSale();
  }, [company]);

  return (
    <Container>
      {loading ? (
        <Loading>
          <FaSpinner color="#ccc" size={25} />
        </Loading>
      ) : (
        <Content>
          <BlockJob>
            <BoxJob setColor="#9cb5c8" popup={1}>
              <header>
                <h1>ESTOQUE</h1>
              </header>

              <body>
                <div>
                  <strong>PRODUTOS COM ESTOQUE BAIXO</strong>
                  <h2>{lowStock}</h2>
                </div>

                <div>
                  <strong>PRODUTOS CADASTRADOS</strong>
                  <h2>{totalItens}</h2>
                </div>

                <div>
                  <strong>PRODUTOS ATIVOS</strong>
                  <h2>{activeProduct}</h2>
                </div>
              </body>
            </BoxJob>
            <BoxButton setColor="#9cb5c8">
              <button
                type="button"
                onClick={() => history.push('/products/newItem')}
              >
                <strong>ADICIONAR ITEM</strong>
              </button>
            </BoxButton>
          </BlockJob>

          <BlockJob>
            <BoxJob setColor="#00bfdd" popup={2}>
              <header>
                <h1>VENDAS</h1>
              </header>

              <body>
                <BoxItem>
                  <BoxLeft>
                    <strong>HOJE</strong>
                    <Block setColor="#00bfdd">
                      <span>R$</span>
                      <h2>0,00</h2>
                    </Block>
                  </BoxLeft>
                  <BoxRight>
                    <span>-100%</span>
                    <img src={low} alt="" />
                  </BoxRight>
                </BoxItem>

                <BoxItem>
                  <BoxLeft>
                    <strong>SETEMBRO</strong>
                    <Block setColor="#00bfdd">
                      <span>R$</span>
                      <h2>1200,00</h2>
                    </Block>
                  </BoxLeft>
                  <BoxRight>
                    <span>35%</span>
                    <img src={up} alt="" />
                  </BoxRight>
                </BoxItem>

                <BoxItem>
                  <BoxLeft>
                    <strong>CLIENTES ATENDIDOS HOJE</strong>
                    <Block setColor="#00bfdd">
                      <h2>0</h2>
                    </Block>
                  </BoxLeft>
                  <BoxRight>
                    <span>-100%</span>
                    <img src={low} alt="" />
                  </BoxRight>
                </BoxItem>
              </body>
            </BoxJob>
            <BoxButton setColor="#00bfdd">
              <button type="button" onClick={() => history.push('/pdv')}>
                <span>ABRIR</span>
                <strong>PDV</strong>
              </button>
              <div />
              <button
                type="button"
                onClick={() => history.push('/customers/newCustomer')}
              >
                <span>NOVO</span>
                <strong>CLIENTE</strong>
              </button>
            </BoxButton>
          </BlockJob>

          <BlockJob>
            <BoxJob setColor="#44d4b5" popup={3}>
              <header>
                <h1>PAGAMENTOS</h1>
              </header>

              <body>
                <div>
                  <strong>A VISTA</strong>
                  <h2>{`${incash}%`}</h2>
                </div>

                <div>
                  <strong>CARTÃO DE CRÉDITO</strong>
                  <h2>{`${credit}%`}</h2>
                </div>

                <div>
                  <strong>CARTÃO DÉBITO</strong>
                  <h2>{`${debit}%`}</h2>
                </div>
              </body>
            </BoxJob>
          </BlockJob>
        </Content>
      )}
    </Container>
  );
}

export default Main;
