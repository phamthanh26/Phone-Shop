const initialState = {
  commentList: {
    data: [],
    load: false,
    error: '',
  },
  allCommentList:{
    data:[],
    load: false,
    error:''
  }
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_COMMENT_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true
        },
      };
    }
    case 'ADD_TO_COMMENT_SUCCESS': {
      const { data } = action.payload;
      const newComment = state.commentList.data;
      newComment.splice(0, 0, data);
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: newComment,
          load: false
        },
      };
    }
    case 'ADD_TO_COMMENT_FAIL': {
      return {
        ...state,
        commentList: {
          ...state.commentList.data,
          load: false
        },
      };
    }
    case 'GET_COMMENT_LIST_REQUEST': {
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: true,
        },
      }
    }
    case 'GET_COMMENT_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_COMMENT_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        commentList: {
          ...state.commentList,
          load: false,
          error: error,
        },
      }
    }
    case 'GET_ALL_COMMENT_REQUEST': {
      return {
        ...state,
        allCommentList: {
          ...state.allCommentList,
          load: true,
        },
      }
    }
    case 'GET_ALL_COMMENT_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        allCommentList: {
          ...state.allCommentList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_ALL_COMMENT_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        allCommentList: {
          ...state.allCommentList,
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