import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import statusPDV from './statusPDV/sagas';

export default function* rootSaga() {
  return yield all([auth, user, statusPDV]);
}
