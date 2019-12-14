
import * as tools from '../tools';

describe('normalizeStockValue', () => {
  it('should round long value to 2 decimals', () => {
    expect(tools.normalizeStockValue(12.273912874987349)).toBe(12.27);
    expect(tools.normalizeStockValue(12.277912874987349)).toBe(12.28);
  });
})

describe('normalizeStocksObject', () => {
  it('should normalize the stock values', () => {
    expect(tools.normalizeStocksObject({
      'NASDAQ': 12.123123123,
      'CAC40': 78.20930239,
      'DOWJONES': 78.23981938,
    })).toEqual({
      'NASDAQ': 12.12,
      'CAC40': 78.21,
      'DOWJONES': 78.24,
    });
  });
});
