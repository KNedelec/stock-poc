import { getDefaultStockState } from '../state';
import { stockReducer } from '../reducer';
import { selectStockList } from '../selectors';
import { generateStocks } from './helpers';

test('RECEIVE_LAST', () => {
  const stocks2 = generateStocks(2);
  const stocks3 = generateStocks(3);
  const firstState = stockReducer(getDefaultStockState(), {
    type: 'stock/FETCH_COMPLETED',
    stocks: stocks2,
  });
  const secondState = stockReducer(firstState, {
    type: 'stock/FETCH_COMPLETED',
    stocks: stocks3,
  });

  const selectedStocks = selectStockList({stocks: secondState});
  expect(selectedStocks).toHaveLength(3);
  expect(selectedStocks.map(s => s.index)).toEqual([0, 1, 2]);
});
