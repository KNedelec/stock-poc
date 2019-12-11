import { getDefaultStockState } from './stock/state';

export const getDefaultAppState = () => ({
  stocks: getDefaultStockState(),
});
