import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { parseISO, isPast, addDays } from 'date-fns';
import api from '../../../services/api';

import { signFailure, signInSuccess, signInCompanySuccess } from './actions';

import history from '../../../services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session/companies', {
      email,
      password,
    });

    const { user, token } = response.data;

    if (user.company) {
      const { contract } = user.company;

      const checkEndContract = isPast(addDays(parseISO(contract.end_date), 1));
      console.tron.log(checkEndContract);

      if (checkEndContract) {
        toast.error(
          'Entre em contato com a equipe SkyJob: skyjob@email.com ou (77) 98120-0675.'
        );
        yield put(signFailure());
        return;
      }
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(user, token));

    history.push('/main');
  } catch (err) {
    toast.error(
      'Erro ao tentar acessar o sistema. Por favor verifique seus dados.'
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

export function* signInCompany({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/session/admin', {
      email,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInCompanySuccess(user, token));

    history.push('/main');
  } catch (err) {
    toast.error(
      'Erro ao tentar acessar o sistema. Por favor verifique seus dados.'
    );
    yield put(signFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/SIGN_IN_COMPANY_REQUEST', signInCompany),
]);
