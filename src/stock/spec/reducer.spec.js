import { getDefaultStockState } from '../state';
import { stockReducer } from '../reducer';
import { selectStockList } from '../selectors';
import { generateStocks } from './test-helpers';

describe('RECEIVE_LAST', () => {
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

  it('should add in state', () => {
    const selectedStocks = selectStockList({stocks: secondState});
    expect(selectedStocks).toHaveLength(3);
    expect(selectedStocks.map(s => s.index)).toEqual([0, 1, 2]);
  });

  it('should normalize the data, well', () => {
    const selectedStocks = selectStockList({stocks: secondState});
    expect(selectedStocks[0].timestamp).toBeDefined();
    expect(selectedStocks[0].id).toBe(selectedStocks[0].timestamp);

    const stockVal = selectedStocks[0].stocks['NASDAQ'].toString();
    expect(stockVal.split('').length).toBeLessThan(8);
  });
});
