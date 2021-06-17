const initialState = {
  orderList: {
    data: [],
    load: false,
    error: '',
  },
  orderItem: {
    data: [],
    load: false,
    error: '',
  },
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_ORDER_REQUEST': {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true
        },
      };
    }
    case 'ADD_TO_ORDER_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: data,
          load: false
        },
      };
    }
    case 'ADD_TO_ORDER_FAIL': {
      return {
        ...state,
        orderList: {
          ...state.orderList.data,
          load: false
        },
      };
    }
    case 'GET_ORDER_LIST_REQUEST': {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true,
        },
      }
    }
    case 'GET_ORDER_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_ORDER_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: false,
          error: error,
        },
      }
    }
    case 'REVIEW_ORDER_LIST_REQUEST': {
      return {
        ...state,
        orderList: {
          ...state.orderList,
          load: true
        },
      };
    }
    case 'REVIEW_ORDER_LIST_SUCCESS': {
      const {id, data } = action.payload;      
      const newOrder = state.orderList.data;
      const indexOf = newOrder.findIndex((item)=>{
        return item.id == id;
      })
      
      newOrder.splice(indexOf,1,data);
      return {
        ...state,
        orderList: {
          ...state.orderList,
          data: newOrder,
          load: false
        },
      };
    }

    case 'REVIEW_ORDER_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        orderList: {
          ...state.orderList,
          error: error,
          load: false
        },
      };
    }
    case 'GET_ORDER_ITEM_REQUEST': {
      return {
        ...state,
        orderItem: {
          ...state.orderItem,
          load: true,
        },
      }
    }
    case 'GET_ORDER_ITEM_SUCCESS': {
      const { data } = action.payload;
      console.log("🚀 ~ file: order.reducer.js ~ line 126 ~ orderReducer ~ data", data)
      return {
        ...state,
        orderItem: {
          ...state.orderItem,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_ORDER_ITEM_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        orderItem: {
          ...state.orderItem,
          load: false,
          error: error,
        },
      }
    }
    default: {
      return state;
    }
  }
}