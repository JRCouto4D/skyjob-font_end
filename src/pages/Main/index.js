import React from 'react';

import low from '../../assets/low.png';
import up from '../../assets/up.png';

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
} from './styles';

function Main() {
  return (
    <Container>
      <Content>
        <BlockJob>
          <BoxJob setColor="#9cb5c8" popup={1}>
            <header>
              <h1>ESTOQUE</h1>
            </header>

            <body>
              <div>
                <strong>ITENS COM ESTOQUE BAIXO</strong>
                <h2>18</h2>
              </div>

              <div>
                <strong>PRODUTOS CADASTRADOS</strong>
                <h2>77</h2>
              </div>

              <div>
                <strong>PRODUTOS ATIVOS</strong>
                <h2>32</h2>
              </div>
            </body>
          </BoxJob>
          <BoxButton setColor="#9cb5c8">
            <button type="button">
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
            <button type="button">
              <span>ABRIR</span>
              <strong>PDV</strong>
            </button>
            <div />
            <button type="button">
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
                <h2>35%</h2>
              </div>

              <div>
                <strong>CARTÃO DE CRÉDITO</strong>
                <h2>48%</h2>
              </div>

              <div>
                <strong>CARTÃO DÉBITO</strong>
                <h2>17%</h2>
              </div>
            </body>
          </BoxJob>
        </BlockJob>
      </Content>
    </Container>
  );
}

export default Main;
