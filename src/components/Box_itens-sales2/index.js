/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDeleteForever, MdReply } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { formatPrice } from '../../util/format';
import { percentage2 } from '../../util/calcPercentage';

import { resetDataSale } from '../../store/module/sale/actions';

import api from '../../services/api';
import history from '../../services/history';

import { Container, ButttonGoPayment } from './styles';

function BoxItensSale() {
  const { dataSale, itens } = useSelector((state) => state.saleData);
  const { company } = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  async function deleteSale() {
    confirmAlert({
      title: 'Cancelar Venda',
      message: 'Deseja realmente cancelar esta venda?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            await api.delete(
              `company/${company.id}/point_sales/${dataSale.point_sale_id}`
            );

            dispatch(resetDataSale());
            history.push('/pdv');
          },
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <Container>
      <div className="box-top">
        <header>
          <div className="header-box-left">
            <strong>VENDA:</strong>
            <span>{dataSale ? `#${dataSale.id}` : ''}</span>
          </div>

          <button type="button" onClick={deleteSale}>
            <MdDeleteForever size={25} color="#f0f0f0" />
          </button>
        </header>

        <main>
          <ul>
            {itens.dataItem.length >= 1 &&
              itens.dataItem.map((item) => (
                <li>
                  <div className="box-item-description">
                    <span>
                      {item.amount && item.product
                        ? `${item.amount}X  #${item.product.id}`
                        : ''}
                    </span>

                    <div>
                      <strong>
                        {item.product
                          ? item.product.description.length > 22
                            ? `${item.product.description
                                .toUpperCase()
                                .substr(0, 22)}...`
                            : item.product.description.toUpperCase()
                          : ''}
                      </strong>

                      <span>
                        {item.discount && item.discount >= 0
                          ? `${item.discount}% DESC`
                          : ''}
                      </span>
                    </div>
                  </div>

                  <div className="box-item-price">
                    <span>
                      {item.product ? formatPrice(item.subtotal) : 'R$0,00'}
                    </span>

                    <strong>
                      {item.total ? formatPrice(item.total) : 'R$0,00'}
                    </strong>
                  </div>
                </li>
              ))}
          </ul>
        </main>
      </div>

      <footer>
        <div className="box-subtotal">
          <div className="subtotal-box-left">
            <div className="label-block">
              <strong>SUBTOTAL:</strong>
              <span>{formatPrice(itens.subtotal)}</span>
            </div>

            <div className="label-block">
              <strong>DESCONTO:</strong>
              <span>
                {dataSale
                  ? `${percentage2(itens.subtotal, dataSale.total)}%`
                  : '0.00%'}
              </span>
            </div>
          </div>

          <div className="subtotal-box-right">
            <strong>TOTAL A PAGAR</strong>
            <span>{dataSale ? formatPrice(dataSale.total) : ''}</span>
          </div>
        </div>

        <ButttonGoPayment
          type="button"
          color="#00bfdd"
          fontSize={18}
          onClick={() => history.goBack()}
        >
          <MdReply size={40} color="#fff" />
          <strong>CONTINUAR VENDENDO</strong>
        </ButttonGoPayment>
      </footer>
    </Container>
  );
}

export default BoxItensSale;
