
export function getCityAction(params) {
    return {
      type: 'GET_CITY_REQUEST',
      payload: params,
    }
  }
  
  export function getWardAction(params) {
    return {
      type: 'GET_WARD_REQUEST',
      payload: params,
    }
  }
  
  export function getDistrictAction(params) {
    return {
      type: 'GET_DISTRICT_REQUEST',
      payload: params,
    }
  }
  