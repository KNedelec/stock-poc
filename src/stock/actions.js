
export const fetchLastStocksRequested = () => ({ type: 'stock/FETCH_REQUESTED' });
export const fetchLastStocksCompleted = (stocks) => ({ type: 'stock/FETCH_COMPLETED', stocks });

export const fetchLastStocks = () => {
  return async(dispatch, getState) => {
    dispatch(fetchLastStocksRequested());

    const fetchResult = await fetch('http://localhost:8000/?count=20');

    const jsonResult = await fetchResult.json();

    dispatch(fetchLastStocksCompleted(jsonResult));
  }
}
