const initialState = {
    bill: {
        data: [],
        load: false,
        error: '',
    },
};

export default function billReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_BILL_TASK_REQUEST': {
            return {
                ...state,
                bill: {
                    ...state.bill,
                    load: true,
                },
            }
        }
        case 'ADD_CART_TASK_SUCCESS': {
            const { data } = action.payload;
            return {
              ...state,
              bill: {
                ...state.bill,
                data: [
                  ...state.bill.data,
                  data
                ],
                load: false
              },
            };
          }

        case 'ADD_BILL_TASK_FAIL': {
            return {
                ...state,
                bill: {
                    ...state.bill,
                    load: false,
                },
            }
        }

        default:{
            return state;
        }
    }
}