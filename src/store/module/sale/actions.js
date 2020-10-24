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

export function resetDataSale() {
  return {
    type: '@sale/RESET_DATA_SALE',
  };
}

export function startSaleFailure() {
  return {
    type: '@sale/START_SALE_FAILURE',
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