import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  startSaleSuccess,
  startSaleFailure,
  addToItemSuccess,
  addToItemFailure,
  removeToItemSuccess,
  removeToItemFailure,
} from './actions';

import api from '../../../services/api';
// import history from '../../../services/history';

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
    const { sale_id, product_id, amount, discount } = payload.data;

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
      dataItem: { ...item, product },
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

export default all([
  takeLatest('@sale/START_SALE_REQUEST', startSale),
  takeLatest('@sale/ADD_TO_ITEM_REQUEST', addToItem),
  takeLatest('@sale/REMOVE_TO_ITEM_REQUEST', removeToItem),
]);
