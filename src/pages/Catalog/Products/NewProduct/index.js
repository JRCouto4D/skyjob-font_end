import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { MdClear, MdAdd } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { lighten } from 'polished';

import { formatPrice } from '../../../../util/format';
import { percentage } from '../../../../util/calcPercentage';

import api from '../../../../services/api';
import history from '../../../../services/history';

import ImageInput from './ImageInput';

import {
  Container,
  Modal,
  Content,
  ButtonActive,
  BoxDescription,
  InputBlock,
  BlockSelect,
  Box,
  Select,
  ModalInclude,
  BoxPrice,
  BlockPrice,
  CustPrice,
  OthersPrices,
  InputBlockPrice,
  Profit,
  TextProfit,
  InputBlockAmount,
  BlockAmount,
  StockMoviment,
} from './styles';

function NewProduct({ location }) {
  const [active, setActive] = useState(false);
  const [activeMoviment, setActiveMoviment] = useState(true);
  const { company } = useSelector((state) => state.user.profile);

  const [name, setName] = useState('');
  const [erro, setErro] = useState(false);
  const [dataError, setDataError] = useState(0);

  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [providers, setProviders] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [units, setUnits] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [popup, setPopup] = useState(false);

  const [cust_price, setCust_price] = useState(0);
  const [retail_price, setRetail_price] = useState(0);
  const [wholesale_price, setWholesale_price] = useState(0);
  const [formated_wholesale, setFormated_wholesale] = useState('');
  const [formated_retail, setFormated_retail] = useState('');

  const [percentRetail, setPercentRetail] = useState('N/D');
  const [percentWholesale, setPercentWholesale] = useState('N/D');

  const [selectedMoviment, setSelectedMoviment] = useState(0);

  const moviment = [
    {
      id: 1,
      label: 'ENTRADA',
    },
    {
      id: 2,
      label: 'SAÍDA',
    },
  ];

  const [includeType, setIncludeType] = useState(null);

  function percentageRetail(a, b) {
    setPercentRetail(percentage(a, b));
  }

  function percentageWholesale(a, b) {
    setPercentWholesale(percentage(a, b));
  }

  function calcWholesale() {
    percentageWholesale(cust_price, formated_wholesale);
    setFormated_wholesale(formatPrice(formated_wholesale));

    const input = document.getElementById('minimum_wholesale');
    input.focus();
  }

  function calcRetail() {
    percentageRetail(cust_price, formated_retail);
    setFormated_retail(formatPrice(formated_retail));
  }

  async function handleSubmit(data) {
    if (data.description === '') {
      setDataError(1);
      const input = document.getElementById('description');
      input.focus();
      input.style.borderColor = '#FF1E40';
      input.style.background = lighten(0.4, '#FF1E40');

      toast.error('A descrição do produto é obrigatório');
      return;
    }

    if (selectedCategory === 0) {
      setDataError(2);
      toast.error('A categoria do produto é obrigatória');
      return;
    }

    if (selectedProvider === 0) {
      setDataError(3);
      toast.error('O fornecedor do produto é obrigatório');
      return;
    }

    if (selectedUnit === 0) {
      setDataError(4);
      toast.error('A unidade do produto é obrigatória');
      return;
    }

    if (retail_price === 0 || retail_price === null || retail_price === '') {
      setDataError(5);
      const input = document.getElementById('retail_price');
      input.focus();
      input.style.borderColor = '#FF1E40';
      input.style.background = lighten(0.4, '#FF1E40');

      toast.error('O preço de varejo é obrigatório');
      return;
    }

    if (
      (active && wholesale_price === 0) ||
      wholesale_price === null ||
      wholesale_price === ''
    ) {
      setDataError(6);

      const input = document.getElementById('wholesale_price');
      input.focus();
      input.style.borderColor = '#FF1E40';
      input.style.background = lighten(0.4, '#FF1E40');
      toast.error('Informe o preço para vendas em atavado.');
      return;
    }

    if (
      data.minimum_stock <= 0 ||
      data.minimum_stock === null ||
      data.minimum_stock === ''
    ) {
      setDataError(7);
      const input = document.getElementById('minimum_stock');
      input.focus();
      input.style.borderColor = '#FF1E40';
      input.style.background = lighten(0.4, '#FF1E40');
      toast.error('A quantidade minima em estoque é obrigatória');
      return;
    }

    if (
      (active && data.minimum_wholesale === '') ||
      data.minimum_wholesale === null ||
      data.minimum_wholesale === 0
    ) {
      setDataError(8);

      const input = document.getElementById('minimum_wholesale');
      input.focus();
      input.style.borderColor = '#FF1E40';
      input.style.background = lighten(0.4, '#FF1E40');
      toast.error('Informe a quantidade minimum para venda em atacado.');
      return;
    }

    const dataCompleted = active
      ? {
          category_id: selectedCategory.id,
          provider_id: selectedProvider.id,
          unit_id: selectedUnit.id,
          wholesale: active,
          cust_price,
          description: data.description,
          retail_price,
          wholesale_price,
          minimum_stock: data.minimum_stock,
          minimum_wholesale: data.minimum_wholesale,
          image_id: data.image_id,
        }
      : {
          category_id: selectedCategory.id,
          provider_id: selectedProvider.id,
          unit_id: selectedUnit.id,
          wholesale: active,
          cust_price,
          description: data.description,
          retail_price,
          minimum_stock: data.minimum_stock,
          image_id: data.image_id,
        };

    if (location.state) {
      try {
        await api.put(
          `company/${company.id}/products/${location.state.item.id}/update`,
          dataCompleted
        );
        toast.success('Produto alterado como sucesso!');
        history.push('/products');
      } catch (err) {
        toast.error('Algo deu errado, por favor tente mais tarde');
        history.push('/products');
      }
    } else {
      try {
        await api.post(`company/${company.id}/products`, dataCompleted);
        toast.success('Produto cadastrado como sucesso!');
        history.push('/products');
      } catch (err) {
        toast.error('Algo deu errado, por favor tente mais tarde');
        history.push('/products');
      }
    }
  }

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

  const loadCategories = useCallback(async () => {
    const response = await api.get(`/company/${company.id}/categories`);
    setCategories(response.data.categories);
  }, [company]);

  const loadProviders = useCallback(async () => {
    const response = await api.get(`/company/${company.id}/providers`);

    setProviders(response.data.providers);
  }, [company]);

  const loadUnits = useCallback(async () => {
    const response = await api.get(`/company/${company.id}/units`);

    setUnits(response.data.units);
  }, [company]);

  useEffect(() => {
    loadCategories();
    loadProviders();
    loadUnits();
    if (location.state) {
      const { item } = location.state;
      console.tron.log(item);
      setSelectedProvider(item.provider);
      setSelectedCategory(item.category);
      setSelectedUnit(item.unit);
      setCust_price(Number(item.cust_price));
      setActive(item.wholesale);
      setRetail_price(Number(item.retail_price));
      setWholesale_price(Number(item.wholesale_price));

      if (Number(item.cust_price) !== 0) {
        percentageRetail(Number(item.cust_price), Number(item.retail_price));
        setFormated_retail(formatPrice(Number(item.retail_price)));
        percentageWholesale(
          Number(item.cust_price),
          Number(item.wholesale_price)
        );
        setFormated_wholesale(formatPrice(item.wholesale_price));
      } else {
        setFormated_retail(formatPrice(Number(item.retail_price)));
        setFormated_wholesale(formatPrice(Number(item.wholesale_price)));
      }
    }
  }, [loadCategories, loadProviders, loadUnits, location]);

  async function handleInclude() {
    switch (includeType) {
      case 0: {
        close();
        break;
      }

      case 1: {
        try {
          if (name === '') {
            toast.error('O nome da categoria é obrigatório.');
            setErro(true);

            const inputName = document.getElementById('name');

            inputName.focus();
            inputName.style.borderColor = '#FF1E40';
            inputName.style.background = lighten(0.4, '#FF1E40');
            return;
          }

          await api.post(`/company/${company.id}/categories`, { name });
          loadCategories();
          toast.success('Categoria incluida com sucesso!');
          setName('');
          close();
        } catch (err) {
          toast.error('Algo deu errado, por favor tente mais tarde');
          setName('');
          close();
        }
        break;
      }

      case 2: {
        try {
          if (name === '') {
            toast.error('O nome do fornecedor é obrigatório.');
            setErro(true);

            const inputName = document.getElementById('name');

            inputName.focus();
            inputName.style.borderColor = '#FF1E40';
            inputName.style.background = lighten(0.4, '#FF1E40');
            return;
          }
          await api.post(`/company/${company.id}/providers`, { name });
          loadProviders();
          toast.success('Fornecedor incluido com sucesso!');
          setName('');
          close();
        } catch (err) {
          toast.error('Algo deu errado, por favor tente mais tarde');
          close();
          setName('');
        }
        break;
      }

      case 3: {
        try {
          if (name === '') {
            toast.error('O nome da unidade é obrigatório.');
            setErro(true);

            const inputName = document.getElementById('name');

            inputName.focus();
            inputName.style.borderColor = '#FF1E40';
            inputName.style.background = lighten(0.4, '#FF1E40');
            return;
          }
          await api.post(`/company/${company.id}/units`, { name });
          loadUnits();
          toast.success('Unidade incluida com sucesso!');
          setName('');
          close();
        } catch (err) {
          toast.error('Algo deu errado, por favor tente mais tarde');
          setName('');
          close();
        }
        break;
      }
      default:
    }
  }

  useEffect(() => {
    if (includeType !== null) {
      const inputName = document.getElementById('name');
      inputName.focus();
    }
  }, [includeType]);

  return (
    <Container>
      <Modal>
        <button
          type="button"
          className="button-close"
          onClick={() => history.goBack()}
        >
          <MdClear color="#fff" size={25} />
        </button>

        <Content>
          <header>
            <h1>NOVO ITEM</h1>
            <div>
              <strong>VENDAS EM ATACADO</strong>
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
            <Form
              onSubmit={handleSubmit}
              initialData={location.state && location.state.item}
            >
              <div className="box-top">
                <div className="image-input">
                  <ImageInput />
                </div>

                <BoxDescription>
                  <InputBlock>
                    {dataError === 1 ? (
                      <strong style={{ color: '#FF1E40' }}>* DESCRIÇÃO</strong>
                    ) : (
                      <strong>DESCRIÇÃO</strong>
                    )}
                    <Input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Ex: Tênis Nike Air Max"
                      autoCapitalize="off"
                      autoComplete="off"
                      onChange={() => {
                        const input = document.getElementById('description');
                        setDataError(0);
                        input.style.borderColor = '#ddd';
                        input.style.background = 'none';
                      }}
                    />
                  </InputBlock>

                  <BlockSelect>
                    <InputBlock>
                      {dataError === 2 ? (
                        <strong style={{ color: '#FF1E40' }}>
                          * CATEGORIA
                        </strong>
                      ) : (
                        <strong>CATEGORIA</strong>
                      )}
                      <Box>
                        <Select
                          value={selectedCategory}
                          options={categories}
                          getOptionValue={(op) => op.id}
                          getOptionLabel={(op) => op.name}
                          onChange={(value) => {
                            setDataError(0);
                            setSelectedCategory({
                              id: value.id,
                              name: value.name,
                            });
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            setIncludeType(1);
                            togglePopUp(e);
                          }}
                        >
                          <MdAdd color="#fff" size={20} />
                        </button>
                      </Box>
                    </InputBlock>

                    <InputBlock>
                      {dataError === 3 ? (
                        <strong style={{ color: '#FF1E40' }}>
                          * FORNECEDOR
                        </strong>
                      ) : (
                        <strong>FORNECEDOR</strong>
                      )}
                      <Box>
                        <Select
                          value={selectedProvider}
                          options={providers}
                          getOptionValue={(op) => op.id}
                          getOptionLabel={(op) => op.name}
                          onChange={(value) => {
                            setDataError(0);
                            setSelectedProvider({
                              id: value.id,
                              name: value.name,
                            });
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            setIncludeType(2);
                            togglePopUp(e);
                          }}
                        >
                          <MdAdd color="#fff" size={20} />
                        </button>
                      </Box>
                    </InputBlock>

                    <InputBlock>
                      {dataError === 4 ? (
                        <strong style={{ color: '#FF1E40' }}>* UNIDADE</strong>
                      ) : (
                        <strong>UNIDADE</strong>
                      )}
                      <Box>
                        <Select
                          value={selectedUnit}
                          options={units}
                          getOptionValue={(op) => op.id}
                          getOptionLabel={(op) => op.name}
                          onChange={(value) => {
                            setDataError(0);
                            setSelectedUnit({
                              id: value.id,
                              name: value.name,
                            });
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            setIncludeType(3);
                            togglePopUp(e);
                          }}
                        >
                          <MdAdd color="#fff" size={20} />
                        </button>
                      </Box>
                    </InputBlock>
                  </BlockSelect>
                </BoxDescription>
              </div>

              <BoxPrice>
                <h1>PREÇOS</h1>
                <div>
                  <BlockPrice>
                    <CustPrice>
                      <div>
                        <strong>R$ CUSTO</strong>
                        <span>(Última compra)</span>
                      </div>
                      <h1>{formatPrice(cust_price)}</h1>
                    </CustPrice>

                    <OthersPrices>
                      <div>
                        <InputBlockPrice>
                          {dataError === 5 ? (
                            <strong style={{ color: '#FF1E40' }}>
                              * VENDA VAREJO
                            </strong>
                          ) : (
                            <strong>VENDA VAREJO</strong>
                          )}
                          <Input
                            type="text"
                            id="retail_price"
                            name="retail_price"
                            placeholder="Ex: 49.99"
                            value={formated_retail}
                            onFocus={() => setFormated_retail('')}
                            onChange={(e) => {
                              setFormated_retail(
                                e.target.value.toString().replace(',', '.')
                              );
                              setRetail_price(
                                e.target.value.toString().replace(',', '.')
                              );
                              setDataError(0);
                              const input = document.getElementById(
                                'retail_price'
                              );
                              input.style.borderColor = '#ddd';
                              input.style.background = 'none';
                            }}
                            onBlur={calcRetail}
                            autoCapitalize="off"
                            autoComplete="off"
                          />
                        </InputBlockPrice>

                        <Profit>
                          {location.state &&
                          Number(location.state.item.cust_price) !== 0 ? (
                            <>
                              <strong>{Number(percentRetail)}</strong>
                              <span>%</span>
                            </>
                          ) : (
                            <strong>N/D</strong>
                          )}
                        </Profit>
                        <TextProfit>
                          <strong>MARGEM DE LUCRO</strong>
                          <span>(APROXIMADA NO VAREJO)</span>
                        </TextProfit>
                      </div>

                      <div>
                        <InputBlockPrice active={!active}>
                          {dataError === 6 ? (
                            <strong style={{ color: '#FF1E40' }}>
                              * VENDA ATACADO
                            </strong>
                          ) : (
                            <strong>VENDA ATACADO</strong>
                          )}
                          <Input
                            type="text"
                            id="wholesale_price"
                            name="wholesale_price"
                            placeholder="Ex: 49.99"
                            value={formated_wholesale}
                            onFocus={() => setFormated_wholesale('')}
                            onChange={(e) => {
                              setFormated_wholesale(
                                e.target.value.toString().replace(',', '.')
                              );
                              setWholesale_price(
                                e.target.value.toString().replace(',', '.')
                              );
                            }}
                            onBlur={calcWholesale}
                            disabled={!active}
                            autoCapitalize="off"
                            autoComplete="off"
                          />
                        </InputBlockPrice>

                        <Profit>
                          {location.state &&
                          active &&
                          Number(location.state.item.cust_price) !== 0 ? (
                            <>
                              <strong>{Number(percentWholesale)}</strong>
                              <span>%</span>
                            </>
                          ) : (
                            <strong>N/D</strong>
                          )}
                        </Profit>
                        <TextProfit active={!active}>
                          <strong>MARGEM DE LUCRO</strong>
                          <span>(APROXIMADA NO ATACADO)</span>
                        </TextProfit>
                      </div>
                    </OthersPrices>
                  </BlockPrice>

                  <BlockAmount>
                    <InputBlockAmount>
                      {dataError === 7 ? (
                        <strong style={{ color: '#FF1E40' }}>
                          * MÍNIMO EM ESTOQUE
                        </strong>
                      ) : (
                        <strong>MÍNIMO EM ESTOQUE</strong>
                      )}
                      <Input
                        type="text"
                        id="minimum_stock"
                        name="minimum_stock"
                        placeholder="Ex: 10"
                        autoCapitalize="off"
                        autoComplete="off"
                        onChange={() => {
                          setDataError(0);
                          const input = document.getElementById(
                            'minimum_stock'
                          );
                          input.style.borderColor = '#ddd';
                          input.style.background = 'none';
                        }}
                      />
                    </InputBlockAmount>

                    <InputBlockAmount active={!active}>
                      {dataError === 8 ? (
                        <strong style={{ color: '#FF1E40' }}>
                          * QTDE MÍNIMA P/ ATACADO
                        </strong>
                      ) : (
                        <strong>QTDE MÍNIMA P/ ATACADO</strong>
                      )}

                      <Input
                        type="text"
                        id="minimum_wholesale"
                        name="minimum_wholesale"
                        placeholder="Ex: 6"
                        disabled={!active}
                        autoCapitalize="off"
                        autoComplete="off"
                        onChange={() => {
                          setDataError(0);
                          const input = document.getElementById(
                            'minimum_wholesale'
                          );
                          input.style.borderColor = '#ddd';
                          input.style.background = 'none';
                        }}
                      />
                    </InputBlockAmount>
                  </BlockAmount>
                </div>
              </BoxPrice>

              <StockMoviment>
                <div className="stock-moviment-header">
                  <div className="active-moviment">
                    <h1>MOVIMENTAR ESTOQUE</h1>
                    <ButtonActive
                      active={activeMoviment}
                      type="button"
                      onClick={() => setActiveMoviment(!activeMoviment)}
                    >
                      <div>
                        <div>
                          <div />
                        </div>
                      </div>
                    </ButtonActive>
                  </div>
                  <span>
                    Ao ativar este recurso o sistema movimentará o estoque deste
                    produto, automaticamente, sempre que uma compra ou venda for
                    realizada
                  </span>
                </div>

                <div className="stock-moviment-content">
                  <div className="input-block-center">
                    <strong>ATUAL</strong>
                    <Input
                      type="number"
                      className="current-amount"
                      id="current-amount"
                      name="current-amount"
                      autoCapitalize="off"
                      autoComplete="off"
                      placeholder="100"
                      disabled
                    />
                  </div>

                  <InputBlock>
                    {dataError === 4 ? (
                      <strong style={{ color: '#FF1E40' }}>* UNIDADE</strong>
                    ) : (
                      <strong style={{ color: '#666', fontSize: 16 }}>
                        MOVIMENTO DE:
                      </strong>
                    )}
                    <Box>
                      <Select
                        value={selectedMoviment}
                        options={moviment}
                        getOptionValue={(op) => op.id}
                        getOptionLabel={(op) => op.label}
                        onChange={(value) => {
                          setSelectedMoviment({
                            id: value.id,
                            label: value.label,
                          });

                          const input = document.getElementById('set-amount');
                          input.focus();
                        }}
                      />
                    </Box>
                  </InputBlock>

                  <div className="input-block">
                    <strong>QUANTIDADE</strong>
                    <Input
                      type="number"
                      id="set-amount"
                      name="set-amount"
                      autoCapitalize="off"
                      autoComplete="off"
                      placeholder="01"
                    />
                  </div>
                </div>
              </StockMoviment>

              <button className="button-submit" type="submit">
                SALVAR
              </button>
            </Form>
          </main>
        </Content>
        <ModalInclude visible={popup} coords={coords}>
          <Form onSubmit={handleInclude}>
            <button type="button" onClick={close}>
              <MdClear size={18} color="#464646" />
            </button>
            <div>
              <InputBlock>
                {erro ? (
                  <strong style={{ color: '#FF1E40' }}>* NOME</strong>
                ) : (
                  <strong>NOME</strong>
                )}
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ex: ALIMENTOS"
                  autoCapitalize="off"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => {
                    setErro(false);

                    const inputName = document.getElementById('name');
                    inputName.style.border = '#ddd';
                    inputName.style.background = '#ddd';

                    setName(e.target.value);
                  }}
                />
              </InputBlock>
            </div>

            <div>
              <button style={{ background: '#8bc53d' }} type="submit">
                ADICIONAR
              </button>

              <button
                style={{ background: '#464646' }}
                type="button"
                onClick={close}
              >
                CANCELAR
              </button>
            </div>
          </Form>
        </ModalInclude>
      </Modal>
    </Container>
  );
}

export default NewProduct;

NewProduct.propTypes = {
  location: PropTypes.shape(),
};

NewProduct.defaultProps = {
  location: null,
};
