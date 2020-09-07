import {store} from './store';
import {logoutCurrentUser} from './store/actions';

const API_URL = 'https://challenge.maniak.co/api';
const INVALID_TOKEN = 'Invalid token';
const STATUS_UNAUTHORIZED = 401;

const fetchApi = async (method, url, payload) => {
  const token = store.getState().userToken;

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (payload) {
    requestOptions['body'] = JSON.stringify(payload);
  }

  try {
    const response = await fetch(`${API_URL}${url}`, requestOptions);
    if (response.ok) {
      let data = await response.json();
      return Promise.resolve({data, status: response.status});
    }

    if (response.status === STATUS_UNAUTHORIZED) {
      let data = await response.json();
      if (data.message === INVALID_TOKEN) {
        await store.dispatch(logoutCurrentUser());
        return Promise.reject({
          status: response.status,
          error: 'You session has expired, please log in again',
        });
      }
    }

    return Promise.reject({status: response.status});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchApi;
