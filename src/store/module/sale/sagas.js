import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  startSaleSuccess,
  startSaleFailure,
  addToItemSuccess,
  addToItemFailure,
  removeToItemSuccess,
  removeToItemFailure,
  editToItemSuccess,
  editToItemFailure,
  completeToSaleSuccess,
  completeToSaleFailure,
} from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* startSale({ payload }) {
  try {
    const { pdv_id, type_sale } = payload.data;

    const response = yield call(api.post, `/point_sales/${pdv_id}/sale/start`, {
      type_sale,
    });

    yield put(startSaleSuccess(response.data));
  } catch (err) {
    yield put(startSaleFailure());
    toast.error(`##2 Algo deu errado, por favor tente mais tarde. ${err}`);
  }
}

export function* addToItem({ payload }) {
  try {
    const { sale_id, product_id, amount, discount, subtotal } = payload.data;

    const response = yield call(
      api.post,
      `/addItem/sale/${sale_id}/product/${product_id}`,
      {
        amount,
        discount,
      }
    );

    const { item, sale, product } = response.data;

    const data = {
      dataItem: { ...item, product, subtotal },
      saleTotal: sale.total,
    };

    yield put(addToItemSuccess(data));
  } catch (err) {
    toast.error(`ALGO DEU ERRADO E O ITEM NÃO FOI ADICIONADO.\nERRO: ${err}`);
    yield put(addToItemFailure());
  }
}

export function* removeToItem({ payload }) {
  try {
    const { item_id } = payload;

    yield call(api.delete, `/removeItem/${item_id}`);

    yield put(removeToItemSuccess(item_id));
  } catch (err) {
    toast.error(`ALGO DEU ERRADO E O ITEM NÃO FOI REMOVIDO. ${err}`);
    yield put(removeToItemFailure());
  }
}

export function* editToItem({ payload }) {
  try {
    const { item_id, amount, discount } = payload.data;

    const response = yield call(api.put, `/updateItem/${item_id}`, {
      amount,
      discount,
    });

    yield put(editToItemSuccess(response.data));
  } catch (err) {
    toast.error(`ALGO DEU ERRADO E O ITEM NÃO FOI EDITADO.\n ##${err}`);
    yield put(editToItemFailure());
  }
}

export function* completeToSale({ payload }) {
  try {
    const { payment, sale_id, installments, customer_id } = payload.data;

    if (payment === 2) {
      if (customer_id === null) {
        yield call(api.put, `/sale/${sale_id}/complete`, {
          payment,
          installments,
        });
      } else {
        yield call(api.put, `/sale/${sale_id}/complete`, {
          payment,
          installments,
          customer_id,
        });
      }
    } else if (customer_id === null) {
      yield call(api.put, `/sale/${sale_id}/complete`, { payment });
    } else {
      yield call(api.put, `/sale/${sale_id}/complete`, {
        payment,
        customer_id,
      });
    }

    yield put(completeToSaleSuccess());
    history.push('/pdv');
    toast.success('A VENDA FOI COMPLETA COM SUCESSO!');
  } catch (erro) {
    toast.error('ALGO DEU ERRADO E NÃO FOI POSSÍVEL COMPLETAR A VENDA');
    yield put(completeToSaleFailure());
  }
}

export default all([
  takeLatest('@sale/START_SALE_REQUEST', startSale),
  takeLatest('@sale/ADD_TO_ITEM_REQUEST', addToItem),
  takeLatest('@sale/REMOVE_TO_ITEM_REQUEST', removeToItem),
  takeLatest('@sale/EDIT_TO_ITEM_REQUEST', editToItem),
  takeLatest('@sale/COMPLETE_TO_SALE_REQUEST', completeToSale),
]);
