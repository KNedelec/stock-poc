import { getDefaultStockState } from '../state';
import { stockReducer } from '../reducer';
import { selectStocksLast20 } from '../selectors';
import { generateStocks } from './helpers';

test('selectLast20', () => {
  const stocks = generateStocks(50);
  const state = stockReducer(getDefaultStockState(), {
    type: 'stock/FETCH_COMPLETED',
    stocks,
  });

  const selected20 = selectStocksLast20({ stock: state });
  const selected20_2 = selectStocksLast20({ stock: state });
  expect(selected20).toHaveLength(20);
  expect(selected20[0].index).toBe(30);
  expect(selected20[19].index).toBe(49);
});
