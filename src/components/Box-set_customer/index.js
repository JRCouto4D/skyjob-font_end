/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  MdSearch,
  MdFilterList,
  MdFastRewind,
  MdFastForward,
} from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { setCustomer } from '../../store/module/sale/actions';

import api from '../../services/api';

import {
  Container,
  Modal,
  Block,
  TableCustomers,
  LineTableCustomer,
  Pagination,
  BoxCustomer,
  BoxButtons,
  Loading,
} from './styles';

function BoxSetCustomer({
  handleInfoFalse,
  handleInfoTrue,
  animation,
  setAnimation,
  handleSelectedCustomer,
}) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [prePage, setPrePage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const { company } = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setSelectedCustomer(null);

    const response = await api.get(`company/${company.id}/customers/list`, {
      params: {
        page,
        name: search,
      },
    });

    setCustomers(response.data.customers);
    setTotal(response.data.total);
    setPrePage(Math.ceil(response.data.total / 5));
    setLoading(false);
  }, [page, search, company]);

  useEffect(() => {
    loadCustomers();
  }, [search, loadCustomers]);

  function nextPage() {
    setPrePage(Math.ceil(total / 5));
    setPage(page < prePage ? page + 1 : page);

    loadCustomers();
  }

  function prevPage() {
    setPage(page >= 2 ? page - 1 : page);

    loadCustomers();
  }

  const renderTableCustomers = useMemo(() => {
    return (
      <TableCustomers>
        <li className="table-header">
          <strong>NOME</strong>
          <strong>CPF</strong>
          <strong>CNPJ</strong>
          <strong>EMAIL</strong>
          <strong>TELEFONE</strong>
          <strong>ATACADO</strong>
        </li>
        {customers.length >= 1 ? (
          customers.map((item) => (
            <LineTableCustomer
              style={{
                background:
                  selectedCustomer && selectedCustomer.id === item.id
                    ? '#00bfdd'
                    : '#f0f0f0',
              }}
            >
              <button type="button" onClick={() => setSelectedCustomer(item)}>
                <strong
                  style={{
                    color:
                      selectedCustomer && selectedCustomer.id === item.id
                        ? '#fff'
                        : '#333',
                  }}
                >
                  {item ? item.name : ''}
                </strong>
                <strong
                  style={{
                    color:
                      selectedCustomer && selectedCustomer.id === item.id
                        ? '#fff'
                        : '#333',
                  }}
                >
                  {item ? (item.cpf ? item.cpf : '') : ''}
                </strong>
                <strong
                  style={{
                    color:
                      selectedCustomer && selectedCustomer.id === item.id
                        ? '#fff'
                        : '#333',
                  }}
                >
                  {item ? (item.cnpj ? item.cnpj : '') : ''}
                </strong>
                <strong
                  style={{
                    color:
                      selectedCustomer && selectedCustomer.id === item.id
                        ? '#fff'
                        : '#333',
                  }}
                >
                  {item ? (item.email ? item.email : '') : ''}
                </strong>
                <strong
                  style={{
                    color:
                      selectedCustomer && selectedCustomer.id === item.id
                        ? '#fff'
                        : '#333',
                  }}
                >
                  {item ? (item.telephone ? item.telephone : '') : ''}
                </strong>
                <strong
                  style={{
                    color:
                      selectedCustomer && selectedCustomer.id === item.id
                        ? '#fff'
                        : '#333',
                  }}
                >
                  {item ? (item.wholesale ? 'SIM' : 'NÃO') : 'NÃO'}
                </strong>
              </button>
            </LineTableCustomer>
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <h2 style={{ color: '#333' }}>NENHUM RESULTADO ENCONTRADO</h2>
          </div>
        )}
      </TableCustomers>
    );
  }, [customers, selectedCustomer]);

  function infoCustomer() {
    if (selectedCustomer === null) {
      toast.error('O CLIENTE AINDA NÃO FOI SELECIONADO');
      return;
    }

    dispatch(setCustomer(selectedCustomer));
    handleSelectedCustomer();
    setTimeout(() => {
      handleInfoTrue();
    }, 201);
  }

  return (
    <Modal>
      <Container poup={animation}>
        <header>
          <div className="header-box-left">
            <div>
              <strong>CATÁLOGO</strong>
              <h1>CLIENTES</h1>
            </div>
          </div>
          <div className="box-search">
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
          </div>
          <div className="header-box-right">
            <button onClick={() => {}} type="button">
              <MdFilterList color="#ab0000" size={50} />
            </button>
            <Link to="/products/newItem">
              <span>INCLUIR NOVO</span>
              <strong>CLIENTE</strong>
            </Link>
          </div>
        </header>
        {loading ? (
          <Loading>
            <FaSpinner color="#ab0000" size={30} />
          </Loading>
        ) : (
          renderTableCustomers
        )}

        <div className="box-pagination">
          <Pagination>
            <button type="button" onClick={prevPage} disabled={page === 1}>
              <MdFastRewind size={20} color="#fff" />
            </button>
            <span>{`${page} de ${prePage}`}</span>
            <button type="button" onClick={nextPage} disabled={page >= prePage}>
              <MdFastForward size={20} color="#fff" />
            </button>
          </Pagination>
        </div>

        <div className="box-customer">
          <h2>CLIENTE:</h2>

          <BoxCustomer>
            <div className="label-block">
              <strong>Name</strong>
              <span>{selectedCustomer ? selectedCustomer.name : ''}</span>
            </div>

            <div className="label-block">
              <strong>CPF</strong>
              <span>
                {selectedCustomer && selectedCustomer.cpf
                  ? selectedCustomer.cpf
                  : ''}
              </span>
            </div>

            <div className="label-block">
              <strong>EMAIL</strong>
              <span>
                {selectedCustomer && selectedCustomer.email
                  ? selectedCustomer.email
                  : ''}
              </span>
            </div>

            <div className="label-block">
              <strong>TELEFONE</strong>
              <span>
                {selectedCustomer && selectedCustomer.telephone
                  ? selectedCustomer.telephone
                  : ''}
              </span>
            </div>
          </BoxCustomer>
        </div>

        <BoxButtons>
          <button
            type="button"
            className="button-cancel"
            onClick={() => {
              setAnimation();
              setTimeout(() => {
                handleInfoFalse();
              }, 201);
            }}
          >
            CANCELAR
          </button>
          <button
            type="button"
            className="button-define"
            onClick={() => {
              infoCustomer();
            }}
          >
            DEFINIR CLIENTE
          </button>
        </BoxButtons>
      </Container>
    </Modal>
  );
}

export default BoxSetCustomer;

BoxSetCustomer.propTypes = {
  handleInfoFalse: PropTypes.func,
  animation: PropTypes.number,
  setAnimation: PropTypes.func,
  handleSelectedCustomer: PropTypes.func,
  handleInfoTrue: PropTypes.func,
};

BoxSetCustomer.defaultProps = {
  handleInfoFalse: () => {},
  animation: 0,
  setAnimation: () => {},
  handleSelectedCustomer: () => {},
  handleInfoTrue: () => {},
};
