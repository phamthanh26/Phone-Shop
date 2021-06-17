export function getProductListAction(params) {
  return {
    type: 'GET_PRODUCT_LIST_REQUEST',
    payload: params,
  }
}

export function getProductDetailAction(params) {
  return {
    type: 'GET_PRODUCT_DETAIL_REQUEST',
    payload: params,
  }
}

export function getCategoryListAction(params) {
  return {
    type: 'GET_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}
//admin


export const addCategoryListAction = (params) => {
  return {
    type: 'ADD_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}
export const deleteCategoryListAction = (params) => {
  return {
    type: 'DELETE_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}
export function editCategoryListAction(params) {
  return {
    type: 'EDIT_CATEGORY_LIST_REQUEST',
    payload: params,
  }
}
//search
export const addSearchProductAction = (params) => {
  return {
    type: 'ADD_SEARCH_PRODUCT',
    payload: params,
  }
}