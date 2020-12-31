export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(user, token) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { user, token },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function signInCompanyRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_COMPANY_REQUEST',
    payload: { email, password },
  };
}

export function signInCompanySuccess(user, token) {
  return {
    type: '@auth/SIGN_IN_COMPANY_SUCCESS',
    payload: { user, token },
  };
}
