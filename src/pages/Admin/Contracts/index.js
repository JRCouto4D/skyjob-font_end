import React from 'react';
import {
  MdCreditCard,
  MdViewQuilt,
  MdGroup,
  MdInsertChart,
  MdStars,
} from 'react-icons/md';

import history from '../../../services/history';

import { Container, Content, Header, Catalog, ContractButton } from './styles';

function Contracts() {
  return (
    <Container>
      <Content>
        <Header>
          <div className="header-box-left">
            <h1>CONTRATOS</h1>
            <strong>contratos</strong>
          </div>
        </Header>

        <Catalog>
          <ContractButton
            type="button"
            onClick={() =>
              history.push('/contracts/form', { contract: { type: 1 } })
            }
            className="box-contract"
            poupColor="#40e0d0"
          >
            <div className="box-top">
              <h2 style={{ color: '#40e0d0' }}>GRATUITO</h2>
              <strong>TESTE GRATUITO DE 30 DIAS</strong>
              <p>
                Ideal para quem deseja testar uma plataforma que vai economizar
                o tempo da contação de produtos e economizará dinheiro no
                fechamento das compras
              </p>

              <div className="box-description">
                <div className="box-label">
                  <div className="label-header">
                    <MdCreditCard size={18} color="#40e0d0" />
                    <strong style={{ color: '#40e0d0' }}>Financeiro</strong>
                  </div>
                  <p>{'>> Fluxo de caixa'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdViewQuilt size={18} color="#40e0d0" />
                    <strong style={{ color: '#40e0d0' }}>Estoque</strong>
                  </div>
                  <p>{'>> Cadastro de produtos'}</p>
                  <p>{'>> Movimentação de estoque'}</p>
                  <p>{'>> Integração com o Financeiro'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdGroup size={18} color="#40e0d0" />
                    <strong style={{ color: '#40e0d0' }}>Contatos</strong>
                  </div>

                  <p>{'>> Cadastro de Clientes'}</p>
                  <p>{'>> Cadastro de Fornecedores'}</p>
                  <p>{'>> Cadastro de Funcionários'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdStars size={18} color="#40e0d0" />
                    <strong style={{ color: '#40e0d0' }}>Diferenciais</strong>
                  </div>

                  <p>{'>> Sistema 100% online'}</p>
                  <p>{'>> Múltiplos usuários'}</p>
                  <p>{'>> Não requer treinamento'}</p>
                  <p>{'>> Sem taxa inicial'}</p>
                  <p>{'>> Sem multas de cancelamento'}</p>
                </div>
              </div>
            </div>
            <div className="box-price" style={{ background: '#40e0d0' }}>
              <strong>FREE</strong>
            </div>
          </ContractButton>

          <ContractButton
            type="button"
            onClick={() =>
              history.push('/contracts/form', { contract: { type: 2 } })
            }
            className="box-contract"
            poupColor="#7159c1"
          >
            <div className="box-top">
              <h2 style={{ color: '#7159c1' }}>STANDARD</h2>
              <strong>PEQUENOS NEGÓCIOS</strong>
              <p>
                Ideal para quem execulta poucas contações mensais mas também
                deseja aumentar a lucratividade do negócio
              </p>

              <div className="box-description">
                <div className="box-label">
                  <div className="label-header">
                    <MdCreditCard size={18} color="#7159c1" />
                    <strong style={{ color: '#7159c1' }}>Financeiro</strong>
                  </div>
                  <p>{'>> Fluxo de caixa'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdViewQuilt size={18} color="#7159c1" />
                    <strong style={{ color: '#7159c1' }}>Estoque</strong>
                  </div>
                  <p>{'>> Cadastro de produtos'}</p>
                  <p>{'>> Movimentação de estoque'}</p>
                  <p>{'>> Alerta de estoque baixo'}</p>
                  <p>{'>> Integração com o Financeiro'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdGroup size={18} color="#7159c1" />
                    <strong style={{ color: '#7159c1' }}>Contatos</strong>
                  </div>
                  <p>{'>> Cadastro de Clientes'}</p>
                  <p>{'>> Cadastro de Fornecedores'}</p>
                  <p>{'>> Cadastro de Funcionários'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdInsertChart size={18} color="#7159c1" />
                    <strong style={{ color: '#7159c1' }}>Relatórios</strong>
                  </div>

                  <p>{'>> Do Estoque'}</p>
                  <p>{'>> Dos Orçamentos'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdStars size={18} color="#7159c1" />
                    <strong style={{ color: '#7159c1' }}>Diferenciais</strong>
                  </div>
                  <p>{'>> Sistema 100% online'}</p>
                  <p>{'>> Múltiplos usuários'}</p>
                  <p>{'>> Não requer treinamento'}</p>
                  <p>{'>> Sem taxa inicial'}</p>
                  <p>{'>> Sem multas de cancelamento'}</p>
                </div>
              </div>
            </div>
            <div className="box-price" style={{ background: '#7159c1' }}>
              <strong>R$ 100,00</strong>
            </div>
          </ContractButton>

          <ContractButton
            type="button"
            onClick={() =>
              history.push('/contracts/form', { contract: { type: 3 } })
            }
            className="box-contract"
            poupColor="#e6c619"
          >
            <div className="box-top">
              <h2 style={{ color: '#e6c619' }}>PREMIUM</h2>
              <strong>PEQUENOS E MÉDIOS NEGÓCIOS</strong>
              <p>
                Ideal para quem deseja ter uma gestão completa do processo de
                compras com máximo de economia
              </p>

              <div className="box-description">
                <div className="box-label">
                  <div className="label-header">
                    <MdCreditCard size={18} color="#e6c619" />
                    <strong style={{ color: '#e6c619' }}>Financeiro</strong>
                  </div>
                  <p>{'>> Fluxo de caixa'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdViewQuilt size={18} color="#e6c619" />
                    <strong style={{ color: '#e6c619' }}>Estoque</strong>
                  </div>
                  <p>{'>> Cadastro de produtos'}</p>
                  <p>{'>> Movimentação de estoque'}</p>
                  <p>{'>> Alerta de estoque baixo'}</p>
                  <p>{'>> Integração com o Financeiro'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdGroup size={18} color="#e6c619" />
                    <strong style={{ color: '#e6c619' }}>Contatos</strong>
                  </div>
                  <p>{'>> Cadastro de Clientes'}</p>
                  <p>{'>> Cadastro de Fornecedores'}</p>
                  <p>{'>> Cadastro de Funcionários'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdInsertChart size={18} color="#e6c619" />
                    <strong style={{ color: '#e6c619' }}>Relatórios</strong>
                  </div>

                  <p>{'>> Do Financeiro'}</p>
                  <p>{'>> Do Estoque'}</p>
                  <p>{'>> Dos Orçamentos'}</p>
                </div>

                <div className="box-label">
                  <div className="label-header">
                    <MdStars size={18} color="#e6c619" />
                    <strong style={{ color: '#e6c619' }}>Diferenciais</strong>
                  </div>
                  <p>{'>> Sistema 100% online'}</p>
                  <p>{'>> Múltiplos usuários'}</p>
                  <p>{'>> Não requer treinamento'}</p>
                  <p>{'>> Sem taxa inicial'}</p>
                  <p>{'>> Sem multas de cancelamento'}</p>
                </div>
              </div>
            </div>
            <div className="box-price" style={{ background: '#e6c619' }}>
              <strong>R$ 150,00</strong>
            </div>
          </ContractButton>
        </Catalog>
      </Content>
    </Container>
  );
}

export default Contracts;
