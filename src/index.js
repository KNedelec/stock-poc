import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './app';
import { createAppStore } from './store';
import { fetchLastStocks } from './stock/actions';

// TODO create init fn

const store = createAppStore();
store.dispatch({type: 'INIT'});
store.dispatch(fetchLastStocks());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
