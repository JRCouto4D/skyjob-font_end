import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import statusPDV from './statusPDV/reducer';

export default combineReducers({ auth, user, statusPDV });
