import produce from 'immer';

const INITIAL_STATE = {
  pdv: null,
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
        draft.pdv = action.payload.data;
        draft.open = true;
        draft.loading = false;
        break;
      }

      case '@statusPDV/OPEN_PDV_FAILURE': {
        draft.pdv = null;
        draft.open = false;
        draft.loading = false;
        break;
      }

      case '@statusPDV/PDV_CLOSURE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@statusPDV/PDV_CLOSURE_SUCCSS': {
        draft.pdv = null;
        draft.open = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
