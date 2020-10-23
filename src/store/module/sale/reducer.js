import producer from 'immer';

const INITIAL_STATE = {
  dataSale: null,
  loading: false,
  itens: {
    dataItem: [],
    loading: false,
    subtotal: null,
  },
};

export default function sale(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@sale/START_SALE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@sale/START_SALE_SUCCESS': {
        draft.dataSale = action.payload.data;
        draft.loading = false;
        break;
      }

      case '@sale/START_SALE_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@sale/ADD_TO_ITEM_REQUEST': {
        draft.itens.loading = true;
        break;
      }

      case '@sale/ADD_TO_ITEM_SUCCESS': {
        draft.dataSale.total = action.payload.data.saleTotal;
        draft.itens.dataItem.push(action.payload.data.dataItem);
        const subtotal = state.itens.dataItem.map((item) => item.total);
        draft.itens.subtotal = subtotal.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        draft.itens.loading = false;
        break;
      }

      case '@sale/REMOVE_TO_ITEM_REQUEST': {
        draft.itens.loading = true;
        break;
      }

      case '@sale/REMOVE_TO_ITEM_SUCCESS': {
        const { item_id } = action.payload;
        const itemIndex = state.itens.dataItem.findIndex(
          (item) => item.id === item_id
        );

        if (itemIndex >= 0) {
          draft.itens.dataItem.splice(itemIndex, 1);
        }

        draft.itens.loading = false;
        break;
      }

      case '@sale/RESET_DATA_SALE': {
        draft.dataSale = null;
        draft.itens = {
          dataItem: [],
          loading: false,
          subtotal: null,
        };
        draft.loading = false;
        break;
      }

      case '@sale/REMOVE_TO_ITEM_FAILURE': {
        draft.itens.loading = false;
        break;
      }
      default:
    }
  });
}
