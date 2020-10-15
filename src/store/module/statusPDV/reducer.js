import produce from 'immer';

const INITIAL_STATE = {
  cash_id: null,
  open: false,
  loading: false,
};

export default function statusPDV(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@statusPDV/OPEN_PDV_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@statusPDV/OPEN_PDV_SUCCESS': {
        draft.cash_id = action.payload.data.id;
        draft.open = true;
        draft.loading = false;
        break;
      }

      case '@statusPDV/OPEN_PDV_FAILURE': {
        draft.cash_id = null;
        draft.open = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
