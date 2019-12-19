import { fetchStocks } from './datasource';

export const fetchLastStocksRequested = () => ({ type: 'stock/FETCH_REQUESTED' });
export const fetchLastStocksCompleted = (stocks) => ({ type: 'stock/FETCH_COMPLETED', stocks });

export function fetchLastStocks() {
  return async(dispatch, getState) => {
    dispatch(fetchLastStocksRequested());

    const stocks = await fetchStocks(20);

    dispatch(fetchLastStocksCompleted(stocks));

    //TODO: err management

    return stocks;
  };
}

export function startSyncStocksService(dispatch) {
  let syncing = false;
  let errorCount = 0;
  let timerId = setInterval(async () => {
    if (syncing) {
      return;
    }

    syncing = true;

    try {
      await dispatch(fetchLastStocks());
      errorCount = 0;
    } catch(e) {
      errorCount ++;
    } finally {
      syncing = false;
    }

  // extend interval if the service is in error
  }, 1000 * (errorCount + 1));

  return () => { clearInterval(timerId) };
}

export function editStockValue(id, stockName, value) {
  return {
    type: 'stock/EDIT_VALUE',
    id,
    stockName,
    value,
  };
}
