export function addToCartAction(params) {
  return {
    type: 'ADD_TO_CART_REQUEST',
    payload: params,
  }
}

export function deleteItemCartAction(params) {
  return {
    type: 'DELETE_ITEM_CART_REQUEST',
    payload: params,
  }
}
