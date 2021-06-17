
export function getCityAction(params) {
  return {
    type: 'GET_CITY_REQUEST',
    payload: params,
  }
}

export function getDistrictAction(params) {
  return {
    type: 'GET_DISTRICT_REQUEST',
    payload: params,
  }
}

export function getWardAction(params) {
  return {
    type: 'GET_WARD_REQUEST',
    payload: params,
  }
}

export function getAddressAction(params) {
  return {
    type: 'GET_ADDRESS_REQUEST',
    payload: params,
  }
}

export const addAddressAction = (params) => {
  return {
    type: 'ADD_ADDRESS_REQUEST',
    payload: params,
  }
}

export const editAddressAction = (params) => {
  return {
    type: 'EDIT_ADDRESS_REQUEST',
    payload: params,
  }
}

export const deleteAddressAction = (params) => {
  return {
    type: 'DELETE_ADDRESS_REQUEST',
    payload: params,
  }
}
