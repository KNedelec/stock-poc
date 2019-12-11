
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { appReducer } from './reducer';

const stores = {};

export function createAppStore(id = 'default') {
  if (stores[id] !== undefined) {
    throw new Error(`Store with id ${id} already exists`);
  }

  const middlewares = [thunk];
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  const store = createStore(appReducer, applyMiddleware(...middlewares));

  stores[id] = store;

  return store;
}

export function getStore(id = 'default') {
  return stores[id];
}
