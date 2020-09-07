import {
  SET_LOADING,
  RESET_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT_SUCCESS,
  GET_PICTURES_SUCCESS,
} from './actionTypes';

export const initialState = {
  user: null,
  userToken: null,
  pictures: [],
  totalPictures: 0,
  loading: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.username,
        userToken: action.payload.token,
      };
    case LOG_OUT_SUCCESS:
    case LOG_IN_ERROR:
      return {...state, user: null, userToken: null};
    case GET_PICTURES_SUCCESS:
      return {
        ...state,
        pictures: action.payload.pictures,
        totalPictures: action.payload.pictures.length,
      };
    case SET_LOADING:
      return {...state, loading: true};
    case RESET_LOADING:
      return {...state, loading: false};
    default:
      return state;
  }
};
