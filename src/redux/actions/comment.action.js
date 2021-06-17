export function addToCommentAction(params){
  return {
    type: 'ADD_TO_COMMENT_REQUEST',
    payload: params,
  }
}

export function getCommentListAction(params) {
  return {
    type: 'GET_COMMENT_LIST_REQUEST',
    payload: params,
  }
}
export function getCommentAction(params) {
  return {
    type: 'GET_ALL_COMMENT_REQUEST',
    payload: params,
  }
}