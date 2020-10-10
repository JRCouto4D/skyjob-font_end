import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdClear, MdAdd } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

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
} from './styles';

function NewProduct({ location }) {
  const [active, setActive] = useState(true);
  const { company } = useSelector((state) => state.user.profile);

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
  }

  function calcRetail() {
    percentageRetail(cust_price, formated_retail);
    setFormated_retail(formatPrice(formated_retail));
  }

  async function handleSubmit(data) {
    console.tron.log(data);
    if (data.description === '') {
      toast.error('A descrição do produto é obrigatorio');
      return;
    }

    if (selectedCategory === 0) {
      toast.error('A categoria do produto é obrigatoria');
      return;
    }

    if (selectedProvider === 0) {
      toast.error('O fornecedor do produto é obrigatorio');
      return;
    }

    if (selectedUnit === 0) {
      toast.error('A unidade do produto é obrigatoria');
      return;
    }

    if (retail_price === 0 || retail_price === null || retail_price === '') {
      toast.error('O preço de varejo é obrigatorio');
      return;
    }

    if (
      (active && wholesale_price === 0) ||
      wholesale_price === null ||
      wholesale_price === ''
    ) {
      toast.error(
        'A venda em atacado está ativada, o preço para vendas em atavado é obrigatorio'
      );
      return;
    }

    if (
      data.minimum_stock <= 0 ||
      data.minimum_stock === null ||
      data.minimum_stock === ''
    ) {
      toast.error('A quantidade minima em stock é obrigatoria');
      return;
    }

    if (
      (active && data.minimum_wholesale === '') ||
      data.minimum_wholesale === null ||
      data.minimum_wholesale === 0
    ) {
      toast.error(
        'A venda em atacado está ativada, neste caso o quantidade minimum para venda em atacado é necessaria'
      );
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

  async function handleInclude(data) {
    switch (includeType) {
      case 0: {
        close();
        break;
      }

      case 1: {
        try {
          await api.post(`/company/${company.id}/categories`, data);
          loadCategories();
          toast.success('Categoria incluida com sucesso!');
          close();
        } catch (err) {
          toast.error('Algo deu errado, por favor tente mais tarde');
          close();
        }
        break;
      }

      case 2: {
        try {
          await api.post(`/company/${company.id}/providers`, data);
          loadProviders();
          toast.success('Fornecedor incluido com sucesso!');
          close();
        } catch (err) {
          toast.error('Algo deu errado, por favor tente mais tarde');
          close();
        }
        break;
      }

      case 3: {
        try {
          await api.post(`/company/${company.id}/units`, data);
          loadUnits();
          toast.success('Unidade incluida com sucesso!');
          close();
        } catch (err) {
          toast.error('Algo deu errado, por favor tente mais tarde');
          close();
        }
        break;
      }
      default:
    }
  }

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
                    <strong>DESCRIÇÃO</strong>
                    <Input
                      type="text"
                      id="description"
                      name="description"
                      placeholder="Ex: Tênis Nike Air Max"
                      autoCapitalize="off"
                      autoComplete="off"
                    />
                  </InputBlock>

                  <BlockSelect>
                    <InputBlock>
                      <strong>CATEGORIA</strong>
                      <Box>
                        <Select
                          value={selectedCategory}
                          options={categories}
                          getOptionValue={(op) => op.id}
                          getOptionLabel={(op) => op.name}
                          onChange={(value) => {
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
                      <strong>FORNECEDORES</strong>
                      <Box>
                        <Select
                          value={selectedProvider}
                          options={providers}
                          getOptionValue={(op) => op.id}
                          getOptionLabel={(op) => op.name}
                          onChange={(value) => {
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
                      <strong>UNIDADE</strong>
                      <Box>
                        <Select
                          value={selectedUnit}
                          options={units}
                          getOptionValue={(op) => op.id}
                          getOptionLabel={(op) => op.name}
                          onChange={(value) => {
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
                          <strong>VENDA VAREJO</strong>
                          <Input
                            type="text"
                            id="retail_price"
                            name="retail_price"
                            placeholder="Ex: 49.99"
                            value={formated_retail}
                            onFocus={() => setFormated_retail('')}
                            onChange={(e) => {
                              setFormated_retail(e.target.value);
                              setRetail_price(e.target.value);
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
                          <strong>VENDA ATACADO</strong>
                          <Input
                            type="text"
                            id="wholesale_price"
                            name="wholesale_price"
                            placeholder="Ex: 49.99"
                            value={formated_wholesale}
                            onFocus={() => setFormated_wholesale('')}
                            onChange={(e) => {
                              setFormated_wholesale(e.target.value);
                              setWholesale_price(e.target.value);
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
                      <strong>MÍNIMO EM ESTOQUE</strong>
                      <Input
                        type="text"
                        id="minimum_stock"
                        name="minimum_stock"
                        placeholder="Ex: 10"
                        autoCapitalize="off"
                        autoComplete="off"
                      />
                    </InputBlockAmount>

                    <InputBlockAmount active={!active}>
                      <strong>QTDE MÍNIMA P/ ATACADO</strong>
                      <Input
                        type="text"
                        id="minimum_wholesale"
                        name="minimum_wholesale"
                        placeholder="Ex: 6"
                        disabled={!active}
                        autoCapitalize="off"
                        autoComplete="off"
                      />
                    </InputBlockAmount>
                  </BlockAmount>
                </div>
              </BoxPrice>

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
                <strong>NOME</strong>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ex: ALIMENTOS"
                  autoCapitalize="off"
                  autoComplete="off"
                  onFocus
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
