export function startSaleRequest(data) {
  return {
    type: '@sale/START_SALE_REQUEST',
    payload: { data },
  };
}

export function startSaleSuccess(data) {
  return {
    type: '@sale/START_SALE_SUCCESS',
    payload: { data },
  };
}

export function startSaleFailure() {
  return {
    type: '@sale/START_SALE_FAILURE',
  };
}

export function completeToSaleRequest(data) {
  return {
    type: '@sale/COMPLETE_TO_SALE_REQUEST',
    payload: { data },
  };
}

export function completeToSaleSuccess() {
  return {
    type: '@sale/COMPLETE_TO_SALE_SUCCESS',
  };
}

export function completeToSaleFailure() {
  return {
    type: '@sale/COMPLETE_TO_SALE_FAILURE',
  };
}

export function resetDataSale() {
  return {
    type: '@sale/RESET_DATA_SALE',
  };
}

export function addToItemRequest(data) {
  return {
    type: '@sale/ADD_TO_ITEM_REQUEST',
    payload: { data },
  };
}

export function addToItemSuccess(data) {
  return {
    type: '@sale/ADD_TO_ITEM_SUCCESS',
    payload: { data },
  };
}

export function removeToItemRequest(item_id) {
  return {
    type: '@sale/REMOVE_TO_ITEM_REQUEST',
    payload: { item_id },
  };
}

export function removeToItemSuccess(item_id) {
  return {
    type: '@sale/REMOVE_TO_ITEM_SUCCESS',
    payload: { item_id },
  };
}

export function editToItemRequest(data) {
  return {
    type: '@sale/EDIT_TO_ITEM_REQUEST',
    payload: { data },
  };
}

export function editToItemSuccess(data) {
  return {
    type: '@sale/EDIT_TO_ITEM_SUCCESS',
    payload: { data },
  };
}

export function editToItemFailure() {
  return {
    type: '@sale/EDIT_TO_ITEM_FAILURE',
  };
}

export function addToItemFailure() {
  return {
    type: '@sale/ADD_TO_ITEM_FAILURE',
  };
}

export function removeToItemFailure() {
  return {
    type: '@sale/REMOVE_TO_ITEM_FAILURE',
  };
}

export function setInstallments(data) {
  return {
    type: '@sale/SET_INSTALLMENTS',
    payload: { data },
  };
}
