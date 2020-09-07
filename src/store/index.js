import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {reducer} from './reducers';

const logger = createLogger({
  timestamps: true,
  collapsed: true,
  duration: true,
  diff: true,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer, applyMiddleware(thunk, logger));

let persistor = persistStore(store);

export {store, persistor};
