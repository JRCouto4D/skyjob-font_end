/* eslint-disable no-nested-ternary */
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdDone } from 'react-icons/md';

import BoxPDV from '../../../../components/Box_point-sale';
import BoxItens from '../../../../components/Box_itens-sales2';
import BoxSetCustomer from '../../../../components/Box-set_customer';
import Payment1 from '../../../../components/Payment1';
import Payment2 from '../../../../components/Payment2';

import { formatPrice } from '../../../../util/format';

import {
  completeToSaleRequest,
  resetCustomer,
} from '../../../../store/module/sale/actions';

import {
  Container,
  BoxLeft,
  Content,
  OptionButton,
  PaymentSelect,
  Footer,
  BoxRight,
} from './styles';

function Payment() {
  const { dataSale, installments, customer } = useSelector(
    (state) => state.saleData
  );
  const dispatch = useDispatch();

  const [viewCustomer, setViewCustomer] = useState(false);
  const [viewPayment2, setViewPayment2] = useState(false);
  const [infoTrue, setInfoTrue] = useState(!!customer);
  const [infoFalse, setInfoFalse] = useState(!customer);
  const [animation, setAnimation] = useState(0);
  const [animation2, setAnimation2] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState({
    id: 1,
    label: 'AVISTA',
  });

  const payment = [
    {
      id: 1,
      label: 'AVISTA',
    },
    {
      id: 2,
      label: 'CARTÃO CRÉDITO',
    },
    {
      id: 3,
      label: 'CARTÃO DÉBITO',
    },
  ];

  function handleInfoTrue() {
    setInfoTrue(true);
    setInfoFalse(false);
    setAnimation(0);
    setViewCustomer(false);
  }

  function handleInfoFalse() {
    setInfoFalse(true);
    setInfoTrue(false);
    setAnimation(0);
    setViewCustomer(false);
  }

  const renderSetCustomer = useMemo(
    () => (
      <BoxSetCustomer
        handleInfoFalse={() => handleInfoFalse()}
        handleInfoTrue={() => handleInfoTrue()}
        animation={animation}
        setAnimation={() => {
          setAnimation(1);
        }}
        handleSelectedCustomer={() => {
          setAnimation(2);
        }}
      />
    ),
    [animation]
  );

  function handleview() {
    setSelectedPayment({
      id: 1,
      label: 'AVISTA',
    });
    setViewPayment2(false);
    setAnimation2(1);
  }

  function handleview2() {
    setViewPayment2(false);
    setAnimation2(1);
  }

  const renderPayment2 = useMemo(() => {
    if (selectedPayment.id === 2) {
      return (
        <Payment2
          handleview={() => handleview()}
          handleview2={() => handleview2()}
          animation={animation2}
          funcCancel={() => {
            setAnimation2(3);
          }}
          funcOk={() => {
            setAnimation2(2);
          }}
        />
      );
    }
    return this;
  }, [animation2, selectedPayment]);

  const renderPayment = useMemo(() => {
    if (selectedPayment.id === 1) {
      return <Payment1 />;
    }

    if (selectedPayment.id === 2) {
      return (
        <div
          style={{
            textAlign: 'center',
            marginTop: 50,
          }}
        >
          <strong
            style={{
              fontSize: 20,
              color: '#666',
              display: 'block',
            }}
          >
            {installments
              ? `PAGAMENTO EM ${installments.label} NO CARTÃO DE CRÉDITO`
              : ''}
          </strong>
          <span
            style={{
              color: '#999',
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: '3px',
              display: 'block',
            }}
          >
            {dataSale && installments
              ? installments.installments === 1
                ? `${installments.installments} PARCELA DE ${formatPrice(
                    dataSale.total / installments.installments
                  )}`
                : `${installments.installments} PARCELAS DE ${formatPrice(
                    dataSale.total / installments.installments
                  )}`
              : ''}
          </span>
        </div>
      );
    }

    if (selectedPayment.id === 3) {
      return (
        <div
          style={{
            textAlign: 'center',
            marginTop: 50,
          }}
        >
          <strong
            style={{
              fontSize: 20,
              color: '#666',
              display: 'block',
            }}
          >
            PAGAMENTO COM CARTÃO DE DÉBITO
          </strong>
        </div>
      );
    }
    return this;
  }, [selectedPayment, installments, dataSale]);

  function completeToSale() {
    const data = {
      payment: selectedPayment.id,
      sale_id: dataSale.id,
      installments: installments ? installments.installments : 0,
      customer_id: customer ? customer.id : null,
    };

    confirmAlert({
      title: 'COMPLETAR A VENDA',
      message: 'DESEJA REALMENTE COMPLETAR A VENDA?',
      buttons: [
        {
          label: 'SIM',
          onClick: async () => {
            dispatch(completeToSaleRequest(data));
          },
        },
        {
          label: 'NÃO',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <BoxPDV poup>
      <Container>
        <BoxLeft>
          <Content>
            <div className="box-info-customers">
              <h2>INFORMAR CLIENTE ?</h2>
              <div className="box-options">
                <OptionButton
                  type="button"
                  className="option-block"
                  poup={infoTrue}
                  disabled={infoTrue}
                  onClick={() => {
                    handleInfoTrue();
                    setViewCustomer(true);
                  }}
                >
                  <div className="option-container">
                    <div className="option-content" />
                  </div>
                  <strong>SIM</strong>
                </OptionButton>

                <OptionButton
                  type="button"
                  className="option-block"
                  poup={infoFalse}
                  onClick={() => {
                    handleInfoFalse();
                    dispatch(resetCustomer());
                  }}
                >
                  <div className="option-container">
                    <div className="option-content" />
                  </div>
                  <strong>NÃO</strong>
                </OptionButton>
              </div>
              {customer && (
                <div className="box-data-customer">
                  <div className="label-block">
                    <strong>NOME:</strong>
                    <span>
                      {customer || customer.name ? customer.name : ''}
                    </span>
                  </div>

                  <div className="label-block">
                    <strong>CPF:</strong>
                    <span>{customer || customer.cpf ? customer.cpf : ''}</span>
                  </div>

                  <div className="label-block">
                    <strong>EMAIL:</strong>
                    <span>
                      {customer || customer.email ? customer.email : ''}
                    </span>
                  </div>

                  <div className="label-block">
                    <strong>TELEFONE:</strong>
                    <span>
                      {customer || customer.telephone ? customer.telephone : ''}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="box-payment">
              <strong>FORMA DE PAGAMENTO:</strong>
              <PaymentSelect
                value={selectedPayment}
                options={payment}
                getOptionValue={(op) => op.id}
                getOptionLabel={(op) => op.label}
                onChange={(value) => {
                  setSelectedPayment({
                    id: value.id,
                    label: value.label,
                  });
                  setAnimation(1);
                  setViewPayment2(true);
                }}
              />
            </div>

            {renderPayment}
          </Content>

          <Footer>
            <button type="button" onClick={completeToSale}>
              <strong>CONFIRMAR PAGAMENTO</strong>
              <MdDone color="#fff" size={25} />
            </button>
          </Footer>

          {viewCustomer && renderSetCustomer}

          {selectedPayment.id === 2 && viewPayment2 && renderPayment2}
        </BoxLeft>
        <BoxRight>
          <BoxItens />
        </BoxRight>
      </Container>
    </BoxPDV>
  );
}

export default Payment;
