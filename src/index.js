import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './app';
import { createAppStore } from './store';
import { fetchLastStocks, startSyncStocksService } from './stock/actions';

const store = createAppStore();
store.dispatch({type: 'INIT'});
store.dispatch(fetchLastStocks());

const stopService = startSyncStocksService(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
