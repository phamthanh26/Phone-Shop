const initialState = {
  userInfo: {
    data: {},
    load: false,
    error: '',
  },
  userList: {
    data: [],
    load: false,
    error: '',
    
  },
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }
    case 'LOGIN_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      }
    }
    case 'LOGIN_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_USER_INFO_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      }
    }
    case 'GET_USER_INFO_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_USER_INFO_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        },
      }
    }

    case 'REGISTER_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        }
      }
    }

    case 'REGISTER_SUCCESS': {
      const { data } = action.payload;
      const newUserList = state.userList.data;
      newUserList.splice(newUserList.length,0,data);
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          data: newUserList,
        }
      }
    }

    case 'REGISTER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: false,
          error: error,
        }
      }
    }
    case 'GET_USER_LIST_REQUEST': {
      return {
        ...state,
        userList: {
          ...state.userList,
          load: true,
        },
      }
    }
    case 'GET_USER_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_USER_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          load: false,
          error: error,
        },
      }
    }

    case 'DELETE_USER_REQUEST': {
      return {
        ...state,
        userList: {
          ...state.userList,
          load: true
        },
      };
    }
    case 'DELETE_USER_SUCCESS': {
      const {id, data } = action.payload;      
      const newUser = state.userList.data;
      const indexOf = newUser.findIndex((item)=>{
        return item.id == id;
      })
      
      newUser.splice(indexOf,1,data);
      return {
        ...state,
        userList: {
          ...state.userList,
          data: newUser,
          load: false
        },
      };
    }

    case 'DELETE_USER_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userList: {
          ...state.userList,
          error: error,
          load: false
        },
      };
    }
    
    case 'UPDATE_PROFILE_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true
        },
      };
    }
    case 'UPDATE_PROFILE_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data,
          load: false
        },
      };
    }

    case 'UPDATE_PROFILE_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          error: error,
          load: false
        },
      };
    }
    case 'UPDATE_PASSWORD_REQUEST': {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true
        },
      };
    }
    case 'UPDATE_PASSWORD_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          data,
          load: false
        },
      };
    }

    case 'UPDATE_PASSWORD_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          error: error,
          load: false
        },
      };
    }

    default: {
      return state;
    }
  }
}
