import { getDefaultStockState } from './stock/state';
import { getDefaultUiState } from './ui/state';

export const getDefaultAppState = () => ({
  stocks: getDefaultStockState(),
  ui: getDefaultUiState(),
});
