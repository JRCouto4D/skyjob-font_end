import { takeLatest, call, put, all } from 'redux-saga/effects';

import history from '../../../services/history';

export function* signIn({ payload }) {}

export function setToken({ payload }) {}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
