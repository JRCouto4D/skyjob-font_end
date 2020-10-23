import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import statusPDV from './statusPDV/reducer';
import saleData from './sale/reducer';

export default combineReducers({ auth, user, statusPDV, saleData });
