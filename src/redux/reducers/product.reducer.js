const initialState = {
  productList: {
    data: [],
    page: 1,
    load: false,
    error: '',
  },
  productDetail: {
    data: {
      category: {},
      productOptions: [],
    },
    load: false,
    error: '',
  },
  categoryList: {
    data: [],
    load: false,
    error: '',
  },
  searchValue: {
    data: []
  }
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRODUCT_LIST_REQUEST': {
      return {
        ...state,
        productList: {
          ...state.productList,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_LIST_SUCCESS': {
      const { data, page, more } = action.payload;
      if (more) {
        return {
          ...state,
          productList: {
            ...state.productList,
            data: [
              ...state.productList.data,
              ...data,
            ],
            page: page,
            load: false,
          },
        }
      } else {
        return {
          ...state,
          productList: {
            ...state.productList,
            data: data,
            page: page,
            load: false,
          },
        }
      }
    }
    case 'GET_PRODUCT_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productList: {
          ...state.productList,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_PRODUCT_DETAIL_REQUEST': {
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: true,
        },
      }
    }
    case 'GET_PRODUCT_DETAIL_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_PRODUCT_DETAIL_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        productDetail: {
          ...state.productDetail,
          load: false,
          error: error,
        },
      }
    }

    case 'GET_CATEGORY_LIST_REQUEST': {
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: true,
        },
      }
    }
    case 'GET_CATEGORY_LIST_SUCCESS': {
      const { data } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          data: data,
          load: false,
        },
      }
    }
    case 'GET_CATEGORY_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: false,
          error: error,
        },
      }
    }
    //
    case 'ADD_CATEGORY_LIST_REQUEST': {
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: true
        },
      };
    }
    case 'ADD_CATEGORY_LIST_SUCCESS': {
      const { data } = action.payload;
      const newCategory = state.categoryList.data;
      newCategory.splice(0, 0, data);
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          data: newCategory,
          load: false
        },
      };
    }

    case 'ADD_CATEGORY_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          error: error,
          load: false
        },
      };
    }
    case 'EDIT_CATEGORY_LIST_REQUEST': {
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: true
        },
      };
    }
    case 'EDIT_CATEGORY_LIST_SUCCESS': {
      const { id, data } = action.payload;
      const newCategory = state.categoryList.data;
      const indexOf = newCategory.findIndex((item) => {
        return item.id == id;
      })

      newCategory.splice(indexOf, 1, data);
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          data: newCategory,
          load: false
        },
      };
    }

    case 'EDIT_CATEGORY_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          error: error,
          load: false
        },
      };
    }

    case 'DELETE_CATEGORY_LIST_REQUEST': {
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          load: true
        },
      };
    }
    case 'DELETE_CATEGORY_LIST_SUCCESS': {
      const { id } = action.payload;
      const newCategory = state.categoryList.data;
      const indexOf = newCategory.findIndex((item) => {
        return item.id == id;
      })

      newCategory.splice(indexOf, 1);
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          data: newCategory,
          load: false
        },
      };
    }
    case 'DELETE_CATEGORY_LIST_FAIL': {
      const { error } = action.payload;
      return {
        ...state,
        categoryList: {
          ...state.categoryList,
          error: error,
          load: false
        },
      };
    }
    case 'ADD_SEARCH_PRODUCT': {
      return {
        ...state,
        searchValue: [
          action.payload,
        ],
      };
    }

    default: {
      return state;
    }
  }
}
