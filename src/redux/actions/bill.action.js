export const addBillTaskAction= (params) => {
    console.log("🚀 ~ file: bill.action.js ~ line 2 ~ addBillTaskAction ~ params", params)
        return {
            type: 'ADD_BILL_TASK_REQUEST',
            payload: params
        }
      }