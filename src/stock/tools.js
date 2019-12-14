

export function normalizeStocksObject(stocks) {
  return Object.keys(stocks).reduce((acc, key) => {
    acc[key] = normalizeStockValue(stocks[key])
    return acc;
  }, {});
}

/**
 * Transform a stock value in a readable format
 */
export function normalizeStockValue(value) {
  return Math.round(value * 100) / 100;
}
