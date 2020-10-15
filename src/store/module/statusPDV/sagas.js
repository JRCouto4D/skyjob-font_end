import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';
import api from '../../../services/api';

import { openPdvSuccess, openPdvFailure } from './actions';

export function* openPDV({ payload }) {
  try {
    const { user_id, cash_register_id, initial_value } = payload.data;

    const response = yield call(api.post, '/point_sales/start', {
      user_id,
      cash_register_id,
      initial_value,
    });

    const data = {
      id: response.data.id,
    };

    yield put(openPdvSuccess(data));
  } catch (err) {
    toast.error(`Algo deu errado: ${err}`);
    yield put(openPdvFailure());
    history.push('/main');
  }
}

export default all([takeLatest('@statusPDV/OPEN_PDV_REQUEST', openPDV)]);
