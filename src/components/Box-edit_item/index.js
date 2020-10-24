import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdClear } from 'react-icons/md';
import { toast } from 'react-toastify';

import { editToItemRequest } from '../../store/module/sale/actions';

import { Modal, Container, Content } from './styles';

function BoxEditItem({ poupItem, handleViewModal }) {
  const dispatch = useDispatch();

  if (poupItem) console.tron.log(poupItem);

  function handleSubmit(data) {
    if (data.amount === '') {
      toast.error('A quantidade do item é obrigatória');
      return;
    }

    const dataItem = {
      item_id: poupItem.id,
      amount: data.amount,
      discount: data.discount === '' ? 0 : data.discount,
    };

    dispatch(editToItemRequest(dataItem));
    handleViewModal();
  }

  return (
    <Modal>
      <Container>
        <button type="button" onClick={handleViewModal}>
          <MdClear color="#999" size={20} />
        </button>
        <Content>
          <Form initialData={poupItem || null} onSubmit={handleSubmit}>
            <span>{`#${poupItem ? poupItem.product.id : ''}`}</span>
            <strong>
              {poupItem ? poupItem.product.description.toUpperCase() : ''}
            </strong>
            <div className="block">
              <div className="input-block">
                <strong>QUANTIDADE</strong>
                <Input type="number" id="amount" name="amount" />
              </div>
              <div className="input-block">
                <strong>DESC %</strong>
                <Input type="number" id="discount" name="discount" />
              </div>
            </div>

            <button type="submit" className="submit-button">
              SALVAR
            </button>
          </Form>
        </Content>
      </Container>
    </Modal>
  );
}

export default BoxEditItem;

BoxEditItem.propTypes = {
  poupItem: PropTypes.shape(),
  handleViewModal: PropTypes.func,
};

BoxEditItem.defaultProps = {
  poupItem: null,
  handleViewModal: () => {},
};
