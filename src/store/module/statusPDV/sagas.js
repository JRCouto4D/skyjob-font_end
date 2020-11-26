import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { openPdvSuccess, openPdvFailure, pdvClosureSuccess } from './actions';
import { resetDataSale } from '../sale/actions';

export function* openPDV({ payload }) {
  try {
    const { user_id, cash_register_id, initial_value } = payload.data;

    const response = yield call(api.post, '/point_sales/start', {
      user_id,
      cash_register_id,
      initial_value,
    });

    yield put(openPdvSuccess(response.data));
  } catch (err) {
    toast.error(`Algo deu errado: ${err}`);
    yield put(openPdvFailure());
    history.push('/main');
  }
}

export function* closurePDV({ payload }) {
  try {
    const { pdv_id, company_id } = payload.data;

    yield call(api.delete, `/company/${company_id}/point_sales/${pdv_id}`);

    yield call(api.put, `point_sales/${pdv_id}/close`);

    yield put(resetDataSale());

    yield put(pdvClosureSuccess());

    toast.success('O PONTO DE VENDA FOI FECHADO COM SUCESSO!');
    history.push('/pdv');
  } catch (err) {
    toast.error(`ALGO DEU ERRADO, POR FAVOR TENTE MAIS TARDE. ERRO: ${err}`);
    history.push('/pdv');
  }
}

export default all([
  takeLatest('@statusPDV/OPEN_PDV_REQUEST', openPDV),
  takeLatest('@statusPDV/PDV_CLOSURE_REQUEST', closurePDV),
]);
