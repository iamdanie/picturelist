import {
  SET_LOADING,
  RESET_LOADING,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  LOG_OUT_SUCCESS,
  GET_PICTURES_SUCCESS,
} from './actionTypes';
import fetchApi from '../api';

const setLoader = () => ({
  type: SET_LOADING,
});

const resetLoader = () => ({
  type: RESET_LOADING,
});

const logInSuccess = (data, username) => ({
  type: LOG_IN_SUCCESS,
  payload: {token: data.token, username},
});

const logInError = (error) => ({
  type: LOG_IN_ERROR,
  payload: {error},
});

const logOutUser = () => ({
  type: LOG_OUT_SUCCESS,
});

const getPicturesSuccess = (data) => ({
  type: GET_PICTURES_SUCCESS,
  payload: {pictures: data},
});

export const authenticateUser = (payload) => async (dispatch) => {
  dispatch(setLoader());
  try {
    const response = await fetchApi('POST', '/login', payload);
    dispatch(logInSuccess(response.data, payload.username));
  } catch (error) {
    dispatch(logInError(error));
    throw error;
  } finally {
    dispatch(resetLoader());
  }
};

export const logoutCurrentUser = () => async (dispatch) => {
  dispatch(logOutUser());
};

export const getPictures = () => async (dispatch) => {
  dispatch(setLoader());
  try {
    const response = await fetchApi('GET', '/images');

    dispatch(getPicturesSuccess(response.data));
  } catch (error) {
    throw error;
  } finally {
    dispatch(resetLoader());
  }
};
