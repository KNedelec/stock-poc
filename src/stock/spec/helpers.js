
export function generateStocks(n) {
  const stocks = [];
  const initial = n;

  while(n) {
    stocks.push({
      timestamp: Math.pow(10, 13) - n,
      index: initial - n,
      stocks: {
        'NASDAQ': Math.random() * 100,
        'CAC40': Math.random() * 100,
      }
    });
    --n;
  }

  return stocks;
}
