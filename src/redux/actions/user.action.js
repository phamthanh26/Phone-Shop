export function loginAction(params) {
  return {
    type: 'LOGIN_REQUEST',
    payload: params,
  }
}

export function getUserInfoAction(params) {
  return {
    type: 'GET_USER_INFO_REQUEST',
    payload: params,
  }
}
export function logoutAction(params) {
  return {
    type: 'LOGOUT_REQUEST',
    payload: params,
  }
}
//register
export function registerAction(params) {
  return {
    type: 'REGISTER_REQUEST',
    payload: params,
  }
}
//admin
export function deleteUserAction(params) {
  return {
    type: 'DELETE_USER_REQUEST',
    payload: params,
  }
}
export function getUserListAction(params) {
  return {
    type: 'GET_USER_LIST_REQUEST',
    payload: params,
  }
}
//
export function updateProfileAction(params) {
  return {
    type: 'UPDATE_PROFILE_REQUEST',
    payload: params,
  }
}

export function updatePasswordAction(params) {
  return {
    type: 'UPDATE_PASSWORD_REQUEST',
    payload: params,
  }
}
