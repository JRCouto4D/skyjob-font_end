import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdClear } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import history from '../../../../services/history';
import ImageInput from './ImageInput';

import {
  Container,
  Modal,
  Content,
  ButtonActive,
  Main,
  InputBlock,
} from './styles';

function NewCustomer({ location }) {
  if (location.state) console.tron.log(location.state.customer);

  const [active, setActive] = useState(true);

  return (
    <Container>
      <Modal>
        <button type="button" onClick={() => history.goBack()}>
          <MdClear size={25} color="#fff" />
        </button>

        <Content>
          <header>
            <h1>NOVO CLIENTE</h1>

            <div className="box-right">
              <strong>ATIVO</strong>
              <ButtonActive
                type="button"
                onClick={() => setActive(!active)}
                active={active}
              >
                <div>
                  <div>
                    <div />
                  </div>
                </div>
              </ButtonActive>
            </div>
          </header>

          <Main>
            <Form>
              <div className="box-data-customer">
                <div className="image-input">
                  <ImageInput />
                </div>

                <div className="box-description-customer">
                  <div className="box-description-top">
                    <InputBlock>
                      <strong>NOME</strong>
                      <Input
                        type="text"
                        autoCapitalize="none"
                        autoComplete="none"
                        id="name"
                        name="name"
                        placeholder="Digite o nome do cliente"
                      />
                    </InputBlock>

                    <InputBlock>
                      <strong>CPF</strong>
                      <Input
                        autoCapitalize="none"
                        autoComplete="none"
                        type="text"
                        id="cpf"
                        name="cpf"
                        placeholder="Digite apenas os numeros do CPF"
                      />
                    </InputBlock>
                  </div>

                  <div className="box-description-bottom">
                    <InputBlock>
                      <strong>Email</strong>
                      <Input
                        autoCapitalize="none"
                        autoComplete="none"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ex.: cliente@email.com"
                      />
                    </InputBlock>

                    <InputBlock>
                      <strong>TELEFONE 1</strong>
                      <Input
                        autoCapitalize="none"
                        autoComplete="none"
                        type="text"
                        id="telephone1"
                        name="telephone1"
                        placeholder="Ex.: (XX) 00000-0000"
                      />
                    </InputBlock>

                    <InputBlock>
                      <strong>TELEFONE 2</strong>
                      <Input
                        type="text"
                        autoCapitalize="off"
                        autoComplete="off"
                        id="telephone2"
                        name="telephone2"
                        placeholder="Ex.: (XX) 00000-0000"
                      />
                    </InputBlock>
                  </div>
                </div>
              </div>

              <div className="box-customer-address">
                <div className="data-address">
                  <strong>ENDEREÇO</strong>
                </div>

                <div className="box-address-top">
                  <InputBlock>
                    <strong>RUA</strong>
                    <Input
                      type="text"
                      autoCapitalize="off"
                      autoComplete="off"
                      id="street"
                      name="street"
                      placeholder="Ex.: São Mateus"
                    />
                  </InputBlock>

                  <InputBlock>
                    <strong>NUMERO</strong>
                    <Input
                      type="text"
                      autoCapitalize="off"
                      autoComplete="off"
                      id="number"
                      name="number"
                      placeholder="Ex.: 77"
                    />
                  </InputBlock>

                  <InputBlock>
                    <strong>BAIRRO</strong>
                    <Input
                      type="text"
                      autoCapitalize="off"
                      autoComplete="off"
                      id="neighborhood"
                      name="neighborhood"
                      placeholder="Ex.: Primavera"
                    />
                  </InputBlock>
                </div>

                <div className="box-address-bottom">
                  <InputBlock>
                    <strong>COMPLEMENTO</strong>
                    <Input
                      type="text"
                      autoCapitalize="off"
                      autoComplete="off"
                      id="complement"
                      name="complement"
                      placeholder="Ex.: Terrio"
                    />
                  </InputBlock>

                  <InputBlock>
                    <strong>CEP</strong>
                    <Input
                      type="text"
                      autoCapitalize="off"
                      autoComplete="off"
                      id="zip_code"
                      name="zip_code"
                      placeholder="Ex.: 45700000"
                    />
                  </InputBlock>

                  <InputBlock>
                    <strong>CIDADE</strong>
                    <Input
                      type="text"
                      autoCapitalize="off"
                      autoComplete="off"
                      id="city"
                      name="city"
                      placeholder="Ex.: São Paulo"
                    />
                  </InputBlock>

                  <InputBlock>
                    <strong>ESTADO</strong>
                    <Input
                      type="text"
                      autoCapitalize="off"
                      autoComplete="off"
                      id="state"
                      name="state"
                      placeholder="Ex.: São Paulo"
                    />
                  </InputBlock>
                </div>
              </div>

              <button type="submit">SALVAR</button>
            </Form>
          </Main>
        </Content>
      </Modal>
    </Container>
  );
}

export default NewCustomer;

NewCustomer.propTypes = {
  location: PropTypes.shape(),
};

NewCustomer.defaultProps = {
  location: null,
};
