import { createSelector } from 'reselect';

import * as stockSelectors from '../stock/selectors';

export const selectUiState = state => state.ui;

export const selectUiCellBeingEdited = state => selectUiState(state).cellBeingEdited;

export const selectUiIsEditingCell = state => selectUiCellBeingEdited(state) !== undefined;

export const selectViewportWidth = state => selectUiState(state).viewportWidth;

export const selectViewportHeight = state => selectUiState(state).viewportHeight;

export const selectUiIsScrollingPaused = state =>
  selectUiState(state).scrollingPaused;

export const selectUiDisplayRangeSize = state => {
  return selectUiState(state).displayRangeSize;
}

export const selectUiDisplayRangeStartId = state => {
  return selectUiState(state).displayRangeStartId;
}

export const selectStockValuesToDisplay = createSelector(
  stockSelectors.selectUpdatedStockList,
  stockSelectors.selectStocksLast10,
  stockSelectors.selectStocksLast20,
  selectUiIsScrollingPaused,
  selectUiDisplayRangeSize,
  selectUiDisplayRangeStartId,
  (stocks, last10, last20, scrollingPaused, size, startId) => {
    // if the scrolling is not paused, take last values
    if (!scrollingPaused) {
      switch(size) {
        case 10: return last10;
        case 20: return last20;
        default:
          process.env.NODE_ENV === 'development' && 
            console.warn('not memoized, get last 20 instead');
          return last20;
      }
    }

    // else take `size` items from `startId`
    const ix = stocks.findIndex(item => item.id === startId);

    return stocks.slice(ix, ix + size);
  }
);
