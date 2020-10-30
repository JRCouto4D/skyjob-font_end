import producer from 'immer';

const INITIAL_STATE = {
  dataSale: null,
  loading: false,
  itens: {
    dataItem: [],
    loading: false,
    subtotal: 0,
  },
  installments: null,
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
        draft.itens.subtotal =
          state.itens.subtotal + action.payload.data.dataItem.subtotal;
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
          draft.itens.subtotal =
            state.itens.subtotal -
            state.itens.dataItem[itemIndex].product.retail_price *
              state.itens.dataItem[itemIndex].amount;
          draft.dataSale.total =
            state.dataSale.total - state.itens.dataItem[itemIndex].total;
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
          subtotal: 0,
        };
        draft.loading = false;
        draft.installments = null;
        break;
      }

      case '@sale/REMOVE_TO_ITEM_FAILURE': {
        draft.itens.loading = false;
        break;
      }

      case '@sale/EDIT_TO_ITEM_REQUEST': {
        draft.itens.loading = true;
        break;
      }

      case '@sale/EDIT_TO_ITEM_SUCCESS': {
        const { item, sale: dataSale } = action.payload.data;

        const itemIndex = state.itens.dataItem.findIndex(
          (itm) => itm.id === item.id
        );

        if (itemIndex >= 0) {
          const { dataItem } = draft.itens;
          dataItem[itemIndex].amount = item.amount;
          dataItem[itemIndex].discount = item.discount;
          dataItem[itemIndex].total = item.total;
          draft.dataSale.total = dataSale.total;
          dataItem[itemIndex].subtotal =
            state.itens.dataItem[itemIndex].product.retail_price * item.amount;
          draft.itens.subtotal =
            state.itens.subtotal -
            state.itens.dataItem[itemIndex].product.retail_price *
              state.itens.dataItem[itemIndex].amount +
            state.itens.dataItem[itemIndex].product.retail_price * item.amount;
          draft.itens.loading = false;
        }
        break;
      }

      case '@sale/EDIT_TO_ITEM_FAILURE': {
        draft.itens.loading = false;
        break;
      }

      case '@sale/COMPLETE_TO_SALE_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@sale/COMPLETE_TO_SALE_SUCCESS': {
        draft.dataSale = null;
        draft.itens = {
          dataItem: [],
          loading: false,
          subtotal: 0,
        };
        draft.installments = null;
        draft.loading = false;
        break;
      }
      case '@sale/COMPLETE_TO_SALE_FAILURE': {
        draft.loading = false;
        break;
      }

      case '@sale/SET_INSTALLMENTS': {
        draft.installments = action.payload.data;
        break;
      }
      default:
    }
  });
}
