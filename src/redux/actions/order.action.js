
export function addToOrderAction(params){
  return {
    type: 'ADD_TO_ORDER_REQUEST',
    payload: params,
  }
}

export function getOrderListAction(params) {
 
  return {
    type: 'GET_ORDER_LIST_REQUEST',
    payload: params,
  }
}

export function reviewOrderListAction(params) {
  return {
    type: 'REVIEW_ORDER_LIST_REQUEST',
    payload: params,
  }
}

export function getOrderItemAction(params) {
  console.log("🚀 ~ file: order.action.js ~ line 24 ~ getOrderItemAction ~ params", params)
  return {
    type: 'GET_ORDER_ITEM_REQUEST',
    payload: params,
  }
}