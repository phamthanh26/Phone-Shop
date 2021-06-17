const initialState = {
    city: {
      data: [],
      load: false,
      error: '',
    },
    wards: {
      data: [],
      load: false,
      error: '',
    },
    district: {
      data: [],
      load: false,
      error: '',
    },
  };

  
export default function checkoutReducer(state = initialState, action) {
    switch (action.type) {
  
      // CITY
      case 'GET_CITY_REQUEST': {
        return {
          ...state,
          city: {
            ...state.city,
            load: true,
          },
        }
      }
      case 'GET_CITY_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          city: {
            ...state.city,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_CITY_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          city: {
            ...state.city,
            load: false,
            error: error,
          },
        }
      }
  
      // WARD
      case 'GET_WARD_REQUEST': {
        return {
          ...state,
          subCategories: {
            ...state.subCategories,
            load: true,
          },
        }
      }
      case 'GET_WARD_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          wards: {
            ...state.wards,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_WARD_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          wards: {
            ...state.wards,
            load: false,
            error: error,
          },
        }
      }
  
      // DISTRICT
      case 'GET_DISTRICT_REQUEST': {
        return {
          ...state,
          district: {
            ...state.district,
            load: true,
          },
        }
      }
      case 'GET_DISTRICT_SUCCESS': {
        const { data } = action.payload;
        return {
          ...state,
          district: {
            ...state.district,
            data: data,
            load: false,
          },
        }
      }
      case 'GET_DISTRICT_FAIL': {
        const { error } = action.payload;
        return {
          ...state,
          district: {
            ...state.district,
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
  