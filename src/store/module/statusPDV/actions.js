export function openPdvRequest(data) {
  return {
    type: '@statusPDV/OPEN_PDV_REQUEST',
    payload: { data },
  };
}

export function openPdvSuccess(data) {
  return {
    type: '@statusPDV/OPEN_PDV_SUCCESS',
    payload: { data },
  };
}

export function openPdvFailure() {
  return {
    type: '@statusPDV/OPEN_PDV_FAILURE',
  };
}

export function pdvClosureRequest(data) {
  return {
    type: '@statusPDV/PDV_CLOSURE_REQUEST',
    payload: { data },
  };
}

export function pdvClosureSuccess() {
  return {
    type: '@statusPDV/PDV_CLOSURE_SUCCSS',
  };
}
