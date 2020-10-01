import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdClear, MdAdd } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import api from '../../../../services/api';
import ImageInput from './ImageInput';
import {
  Container,
  Modal,
  Content,
  ButtonActive,
  BoxDescription,
  InputBlock,
  BlockSelect,
  Select,
  Box,
  BoxPrice,
  BlockPrice,
  CustPrice,
  OthersPrices,
  Profit,
  TextProfit,
  InputBlockPrice,
  BlockAmount,
  ModalInclude,
} from './styles';

function Products() {
  const [active, setActive] = useState(true);
  const { company } = useSelector((state) => state.user.profile);

  const [categories, setCategories] = useState(null);
  const [providers, setProviders] = useState(null);
  const [units, setUnits] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [popup, setPopup] = useState(false);

  function togglePopUp(e) {
    setCoords({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
    setPopup(!popup);
  }

  function close() {
    setPopup(false);
  }

  async function loadCategories() {
    const response = await api.get(`/company/${company.id}/categories`);

    return response.data.categories;
  }

  async function loadProviders() {
    const response = await api.get(`/company/${company.id}/providers`);

    return response.data.providers;
  }

  async function loadUnits() {
    const response = await api.get(`/company/${company.id}/units`);

    return response.data.units;
  }

  useEffect(() => {
    loadCategories();
    loadProviders();
  }, []);

  return (
    <Container>
      <Modal>
        <Link to="/products">
          <MdClear color="#fff" size={25} />
        </Link>
        <Content>
          <header>
            <h1>NOVO ITEM</h1>
            <div>
              <strong>ATIVO</strong>
              <ButtonActive
                active={active}
                type="button"
                onClick={() => setActive(!active)}
              >
                <div>
                  <div>
                    <div />
                  </div>
                </div>
              </ButtonActive>
            </div>
          </header>

          <main>
            <BoxDescription>
              <Form onSubmit={() => {}}>
                <ImageInput />
              </Form>

              <div>
                <InputBlock>
                  <strong>DESCRIÇÃO</strong>
                  <Input
                    type="text"
                    id="descricao"
                    name="descricao"
                    placeholder="Ex: Tênis Nike Air Max"
                  />
                </InputBlock>

                <BlockSelect>
                  <InputBlock>
                    <strong>CATEGORIA</strong>
                    <Box>
                      <Select
                        defaultOptions
                        onSelectResetsInput
                        onBlurResetsInput={false}
                        value={categories}
                        loadOptions={loadCategories}
                        getOptionValue={(op) => op.id}
                        getOptionLabel={(op) => op.name}
                        onChange={(value) => {
                          setCategories({
                            id: value.id,
                            name: value.name,
                          });
                        }}
                      />
                      <button type="button" onClick={(e) => togglePopUp(e)}>
                        <MdAdd color="#fff" size={20} />
                      </button>
                    </Box>
                  </InputBlock>

                  <InputBlock>
                    <strong>FORNECEDORES</strong>
                    <Box>
                      <Select
                        defaultOptions
                        onSelectResetsInput
                        onBlurResetsInput={false}
                        value={providers}
                        loadOptions={loadProviders}
                        getOptionValue={(op) => op.id}
                        getOptionLabel={(op) => op.name}
                        onChange={(value) => {
                          setProviders({
                            id: value.id,
                            name: value.name,
                          });
                        }}
                      />
                      <button type="button" onClick={(e) => togglePopUp(e)}>
                        <MdAdd color="#fff" size={20} />
                      </button>
                    </Box>
                  </InputBlock>

                  <InputBlock>
                    <strong>UNIDADE</strong>
                    <Box>
                      <Select
                        defaultOptions
                        onSelectResetsInput
                        onBlurResetsInput={false}
                        value={units}
                        loadOptions={loadUnits}
                        getOptionValue={(op) => op.id}
                        getOptionLabel={(op) => op.name}
                        onChange={(value) => {
                          setUnits({
                            id: value.id,
                            name: value.name,
                          });
                        }}
                      />
                      <button type="button" onClick={(e) => togglePopUp(e)}>
                        <MdAdd color="#fff" size={20} />
                      </button>
                    </Box>
                  </InputBlock>
                </BlockSelect>
              </div>
            </BoxDescription>

            <BoxPrice>
              <h1>PREÇOS</h1>

              <div>
                <BlockPrice>
                  <CustPrice>
                    <div>
                      <strong>R$ CUSTO</strong>
                      <span>(Última compra)</span>
                    </div>
                    <h1>R$00,00</h1>
                  </CustPrice>

                  <OthersPrices>
                    <div>
                      <InputBlockPrice>
                        <strong>VENDA VAREJO</strong>
                        <Input
                          type="text"
                          id="retail"
                          name="retail"
                          placeholder="Ex: 49.99"
                        />
                      </InputBlockPrice>

                      <Profit>
                        <strong>50.00</strong>
                        <span>%</span>
                      </Profit>
                      <TextProfit>
                        <strong>MARGEM DE LUCRO</strong>
                        <span>(APROXIMADA NO VAREJO)</span>
                      </TextProfit>
                    </div>

                    <div>
                      <InputBlockPrice>
                        <strong>VENDA ATACADO</strong>
                        <Input
                          type="text"
                          id="retail"
                          name="retail"
                          placeholder="Ex: 49.99"
                        />
                      </InputBlockPrice>

                      <Profit>
                        <strong>N/D</strong>
                      </Profit>
                      <TextProfit>
                        <strong>MARGEM DE LUCRO</strong>
                        <span>(APROXIMADA NO ATACADO)</span>
                      </TextProfit>
                    </div>
                  </OthersPrices>
                </BlockPrice>

                <BlockAmount>
                  <InputBlock>
                    <strong>QTDE MÍNIMA P/ ATACADO</strong>
                    <Input
                      type="text"
                      id="retail"
                      name="retail"
                      placeholder="Ex: 6"
                    />
                  </InputBlock>

                  <InputBlock>
                    <strong>MÍNIMO EM ESTOQUE</strong>
                    <Input
                      type="text"
                      id="retail"
                      name="retail"
                      placeholder="Ex: 10"
                    />
                  </InputBlock>
                </BlockAmount>
              </div>
            </BoxPrice>
          </main>

          <footer>
            <button type="submit">SALVAR</button>
          </footer>
        </Content>
        <ModalInclude visible={popup} coords={coords}>
          <button type="button" onClick={close}>
            <MdClear size={18} color="#464646" />
          </button>
          <div>
            <InputBlock>
              <strong>NOME</strong>
              <Input
                type="text"
                id="retail"
                name="retail"
                placeholder="Ex: ALIMENTOS"
              />
            </InputBlock>
          </div>

          <div>
            <button style={{ background: '#8bc53d' }} type="button">
              ADICIONAR
            </button>

            <button style={{ background: '#464646' }} type="button">
              CANCELAR
            </button>
          </div>
        </ModalInclude>
      </Modal>
    </Container>
  );
}

export default Products;
