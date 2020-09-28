import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { signFailure, signInSuccess } from './actions';

import history from '../../../services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session/companies', {
      email,
      password,
    });

    const { user, token } = response.data;

    if (!user.company.access) {
      toast.error('Acesso restrito. Entra em contato com a equipe SkuJob.');
      yield put(signFailure());
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(user, token));

    history.push('/main');
  } catch (err) {
    toast.error(
      'Erro ao tentar acessar o sistema. Por favor verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
